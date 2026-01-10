import { beforeAll, describe, expect, it } from 'vitest';

import { decodeWebp, encodeWebp, initWebp } from '../../index';

describe('webp encode/decode', () => {
  beforeAll(async () => {
    await initWebp();
  });

  it('encodes to webp bytes (RIFF/WebP header)', () => {
    const base = new Uint8ClampedArray([9, 9, 1, 2, 3, 4, 9, 9]);
    const slice = base.subarray(2, 6);
    const encoded = encodeWebp(slice, 1, 1);
    expect(encoded).toBeInstanceOf(Uint8Array);
    expect(encoded.byteLength).toBeGreaterThan(0);
    const header = String.fromCharCode(...encoded.slice(0, 4));
    const format = String.fromCharCode(...encoded.slice(8, 12));
    expect(header).toBe('RIFF');
    expect(format).toBe('WEBP');
  });

  it('decodes encoded bytes back to raw buffer', () => {
    const width = 2;
    const height = 1;
    const input = new Uint8ClampedArray([255, 0, 0, 255, 0, 255, 0, 255]);
    const encoded = encodeWebp(input, width, height);
    const decoded = decodeWebp(encoded);

    expect(decoded).toBeInstanceOf(Uint8ClampedArray);
    expect(decoded.byteLength).toBe(width * height * 4);
  });
});
