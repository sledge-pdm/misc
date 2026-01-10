import { describe, expect, it } from 'vitest';
import { gzipDeflate, gzipInflate } from '../../index';

describe('gzip encode/decode', () => {
  it('roundtrips a buffer slice', () => {
    const base = new Uint8Array([9, 9, 1, 2, 3, 4, 9, 9]);
    const slice = base.subarray(2, 6);
    const compressed = gzipDeflate(slice);
    const inflated = gzipInflate(compressed);

    expect(Array.from(inflated)).toEqual([1, 2, 3, 4]);
  });
});
