import WebPModuleImport from '../../wasm/libwebp/libwebp';
import { RawPixelData, toUint8Array } from './RawPixelData';

type WebPModuleFactory = (options?: { locateFile?: (path: string) => string }) => Promise<WebPModuleInstance>;
type WebPModuleInstance = {
  HEAPU8: Uint8Array;
  HEAPU32: Uint32Array;
  _malloc(size: number): number;
  _free(ptr: number): void;
  _WebPEncodeLosslessRGBA?: (rgbaPtr: number, width: number, height: number, stride: number, outputPtrPtr: number) => number;
  _WebPEncodeRGBA(rgbaPtr: number, width: number, height: number, stride: number, quality: number, outputPtrPtr: number): number;
  _WebPDecodeRGBA(dataPtr: number, dataSize: number, widthPtr: number, heightPtr: number): number;
};

const WebPModule = ((WebPModuleImport as unknown as { default?: WebPModuleFactory }).default ?? WebPModuleImport) as WebPModuleFactory;
let modulePromise: Promise<WebPModuleInstance> | undefined;
let moduleInstance: WebPModuleInstance | undefined;

const defaultLocateFile = (path: string) => new URL(`../../wasm/libwebp/${path}`, import.meta.url).toString();

const createModulePromise = (options?: { locateFile?: (path: string) => string; wasmUrl?: string }) => {
  const locateFile =
    options?.locateFile ??
    (options?.wasmUrl
      ? (path: string) => (path.endsWith('.wasm') ? options.wasmUrl! : defaultLocateFile(path))
      : defaultLocateFile);
  return WebPModule({ locateFile });
};

const getModule = (options?: { locateFile?: (path: string) => string; wasmUrl?: string }) => {
  if (!modulePromise) {
    modulePromise = createModulePromise(options);
  }
  return modulePromise;
};

export async function initWebp(options?: { locateFile?: (path: string) => string; wasmUrl?: string }): Promise<void> {
  if (!moduleInstance) {
    moduleInstance = await getModule(options);
  }
}

const requireModule = (): WebPModuleInstance => {
  if (!moduleInstance) {
    throw new Error('WebP module is not initialized. Call initWebp() before using encodeWebp/decodeWebp.');
  }
  return moduleInstance;
};

interface EncodeOptions {
  /**
   * @default true
   */
  loseless?: boolean;
  quality?: number;
}

const defaultOptions = {
  loseless: true,
  quality: 95,
};

export function encodeWebp(rawBuffer: RawPixelData, width: number, height: number, options: EncodeOptions = defaultOptions): Uint8Array {
  const module = requireModule();
  const input = toUint8Array(rawBuffer);
  const inputPtr = module._malloc(input.length);
  const outputPtrPtr = module._malloc(4);
  let outputPtr = 0;
  try {
    module.HEAPU8.set(input, inputPtr);
    let size: number | undefined;
    if (options.loseless && module._WebPEncodeLosslessRGBA) {
      size = module._WebPEncodeLosslessRGBA(inputPtr, width, height, width * 4, outputPtrPtr);
    } else {
      const quality = options.quality ?? 95;
      size = module._WebPEncodeRGBA(inputPtr, width, height, width * 4, quality, outputPtrPtr);
    }
    outputPtr = module.HEAPU32[outputPtrPtr >> 2];
    if (!outputPtr || size <= 0) {
      return new Uint8Array(0);
    }
    const output = new Uint8Array(module.HEAPU8.subarray(outputPtr, outputPtr + size));
    return output;
  } finally {
    module._free(inputPtr);
    module._free(outputPtrPtr);
    if (outputPtr) module._free(outputPtr);
  }
}

export function decodeWebp(webpBuffer: RawPixelData): Uint8ClampedArray {
  const module = requireModule();
  const input = toUint8Array(webpBuffer);
  const inputPtr = module._malloc(input.length);
  const widthPtr = module._malloc(4);
  const heightPtr = module._malloc(4);
  try {
    module.HEAPU8.set(input, inputPtr);
    const outputPtr = module._WebPDecodeRGBA(inputPtr, input.length, widthPtr, heightPtr);
    if (!outputPtr) {
      return new Uint8ClampedArray(0);
    }
    const width = module.HEAPU32[widthPtr >> 2];
    const height = module.HEAPU32[heightPtr >> 2];
    const size = Math.max(0, width) * Math.max(0, height) * 4;
    const output = new Uint8ClampedArray(size);
    output.set(module.HEAPU8.subarray(outputPtr, outputPtr + size));
    module._free(outputPtr);
    return output;
  } finally {
    module._free(inputPtr);
    module._free(widthPtr);
    module._free(heightPtr);
  }
}
