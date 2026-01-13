import { raw_to_webp, webp_to_raw } from '../wasm/pkg/frasco_wasm';
import { RawPixelData, toUint8Array, toUint8ClampedArray } from './RawPixelData';

export function encodeWebp(rawBuffer: RawPixelData, width: number, height: number): Uint8Array {
  return raw_to_webp(toUint8Array(rawBuffer), width, height);
}

export function decodeWebp(webpBuffer: RawPixelData, width: number, height: number): Uint8ClampedArray {
  return toUint8ClampedArray(webp_to_raw(toUint8Array(webpBuffer), width, height));
}
