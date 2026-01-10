declare module '@libwebp' {
  export type WebPModuleInstance = {
    HEAPU8: Uint8Array;
    HEAPU32: Uint32Array;
    _malloc(size: number): number;
    _free(ptr: number): void;
    _WebPEncodeLosslessRGBA?: (rgbaPtr: number, width: number, height: number, stride: number, outputPtrPtr: number) => number;
    _WebPEncodeRGBA(rgbaPtr: number, width: number, height: number, stride: number, quality: number, outputPtrPtr: number): number;
    _WebPDecodeRGBA(dataPtr: number, dataSize: number, widthPtr: number, heightPtr: number): number;
  };

  export type WebPModuleFactory = (options?: { locateFile?: (path: string) => string }) => Promise<WebPModuleInstance>;

  const WebPModule: WebPModuleFactory;
  export default WebPModule;
}
