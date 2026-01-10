import { readFile } from 'node:fs/promises';
import { beforeAll, describe, expect, it } from 'vitest';
import { decodeWebp, initWebp } from '../../index';

describe('webp e2e', () => {
  beforeAll(async () => {
    await initWebp();
  });

  it('decodes a real webp fixture', async () => {
    const fixtureUrl = new URL('./test.webp', import.meta.url);
    const buffer = await readFile(fixtureUrl);
    const decoded = decodeWebp(buffer);

    expect(decoded).toBeInstanceOf(Uint8ClampedArray);
    expect(decoded.byteLength).toBeGreaterThan(0);
    expect(decoded.byteLength % 4).toBe(0);
  });
});
