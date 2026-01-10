import { describe, expect, it, vi } from 'vitest';

vi.mock('webp-wasm', () => {
  return {
    encode: vi.fn(async (imageData: { data: Uint8ClampedArray }) => {
      return new Uint8Array(imageData.data);
    }),
    decode: vi.fn(async (_buffer: Uint8Array) => {
      return { data: new Uint8ClampedArray([7, 8, 9, 10]) };
    }),
  };
});

import { decode, encode } from 'webp-wasm';
import { decodeWebp, encodeWebp } from '../../index';

describe('webp encode/decode', () => {
  it('encodes from the provided view', async () => {
    vi.stubGlobal(
      'ImageData',
      class {
        data: Uint8ClampedArray;
        width: number;
        height: number;
        constructor(data: Uint8ClampedArray, width: number, height: number) {
          this.data = data;
          this.width = width;
          this.height = height;
        }
      }
    );

    const base = new Uint8ClampedArray([9, 9, 1, 2, 3, 4, 9, 9]);
    const slice = base.subarray(2, 6);
    const encoded = await encodeWebp(slice, 1, 1);

    expect(encoded).toBeInstanceOf(Uint8Array);
    expect(Array.from(encoded)).toEqual([1, 2, 3, 4]);
    expect(encode).toHaveBeenCalledTimes(1);
  });

  it('decodes to raw buffer', async () => {
    const input = new Uint8Array([1, 2, 3]);
    const decoded = await decodeWebp(input);

    expect(decoded).toBeInstanceOf(Uint8ClampedArray);
    expect(Array.from(decoded)).toEqual([7, 8, 9, 10]);
    expect(decode).toHaveBeenCalledWith(input);
  });
});
