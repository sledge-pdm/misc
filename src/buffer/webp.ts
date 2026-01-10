import * as webpWasm from 'webp-wasm';
import { RawPixelData } from './RawPixelData';

export async function encodeWebp(rawBuffer: RawPixelData, width: number, height: number): Promise<Uint8Array> {
  const buffer = new Uint8ClampedArray(rawBuffer.buffer, rawBuffer.byteOffset, rawBuffer.byteLength) as Uint8ClampedArray<ArrayBuffer>;
  const webp = await webpWasm.encode(new ImageData(buffer, width, height));
  return new Uint8Array(webp.buffer, webp.byteOffset, webp.byteLength);
}

export async function decodeWebp(webpBuffer: RawPixelData): Promise<Uint8ClampedArray> {
  const raw = await webpWasm.decode(webpBuffer);
  return raw.data;
}
