import { describe, expect, it } from 'vitest';
import { toUint8Array, toUint8ClampedArray } from '../../index';

describe('RawPixelData helpers', () => {
  it('toUint8Array keeps view boundaries for clamped subarrays', () => {
    const base = new Uint8ClampedArray([9, 9, 1, 2, 3, 4, 9, 9]);
    const slice = base.subarray(2, 6);
    const result = toUint8Array(slice);

    expect(result).toBeInstanceOf(Uint8Array);
    expect(Array.from(result)).toEqual([1, 2, 3, 4]);
    expect(result.byteOffset).toBe(slice.byteOffset);
    expect(result.byteLength).toBe(slice.byteLength);
  });

  it('toUint8ClampedArray returns same view when possible', () => {
    const base = new Uint8ClampedArray([1, 2, 3, 4]);
    const result = toUint8ClampedArray(base);

    expect(result).toBe(base);
  });

  it('toUint8ClampedArray preserves subarray bounds', () => {
    const base = new Uint8Array([9, 9, 1, 2, 3, 4, 9, 9]);
    const slice = base.subarray(2, 6);
    const result = toUint8ClampedArray(slice);

    expect(result).toBeInstanceOf(Uint8ClampedArray);
    expect(Array.from(result)).toEqual([1, 2, 3, 4]);
    expect(result.byteOffset).toBe(slice.byteOffset);
    expect(result.byteLength).toBe(slice.byteLength);
  });
});
