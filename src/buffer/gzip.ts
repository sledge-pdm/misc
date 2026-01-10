import * as pako from 'pako';
import { RawPixelData } from './RawPixelData';

export function gzipDeflate(rawBuffer: RawPixelData): Uint8Array {
  const buffer = new Uint8Array(rawBuffer.buffer, rawBuffer.byteOffset, rawBuffer.byteLength);
  const deflated = pako.deflate(buffer);
  return deflated;
}

export function gzipInflate(compressed: RawPixelData): Uint8Array {
  const buffer = new Uint8Array(compressed.buffer, compressed.byteOffset, compressed.byteLength);
  const inflated = pako.inflate(buffer);
  return inflated;
}
