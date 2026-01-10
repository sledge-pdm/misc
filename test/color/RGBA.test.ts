import { describe, expect, it } from 'vitest';
import { colorMatch, hexToRGBA, hexWithSharpToRGBA, isTransparent, RGBA, RGBAToHex } from '../../src/color/RGBA';

const RED: RGBA = [255, 0, 0, 255];
const GREEN: RGBA = [0, 255, 0, 255];
const BLUE: RGBA = [0, 0, 255, 255];
const TRANSPARENT: RGBA = [0, 0, 0, 0];
const TRANSPARENT2: RGBA = [255, 0, 0, 0];

describe('RGBA', () => {
  it('colorMatch', () => {
    expect(colorMatch(RED, RED)).toBeTruthy();
    expect(colorMatch(RED, BLUE)).toBeFalsy();
    expect(colorMatch(GREEN, TRANSPARENT)).toBeFalsy();
    expect(colorMatch(TRANSPARENT, TRANSPARENT)).toBeTruthy();

    expect(colorMatch(TRANSPARENT, TRANSPARENT2)).toBeFalsy();
  });

  it('hexWithSharpToRGBA', () => {
    expect(hexWithSharpToRGBA('#ff0000')).toEqual(RED);
    expect(hexWithSharpToRGBA('#ff0000ff')).toEqual(RED);
    expect(hexWithSharpToRGBA('#ff000080')).toEqual([255, 0, 0, 128]);
    expect(hexWithSharpToRGBA('#ff000000')).toEqual([255, 0, 0, 0]);
    expect(hexWithSharpToRGBA('#00ff00')).toEqual(GREEN);
  });

  it('hexToRGBA', () => {
    expect(hexToRGBA('00ff00')).toEqual(GREEN);
    expect(hexToRGBA('00ff0080')).toEqual([0, 255, 0, 128]);
  });

  it('RGBAToHex', () => {
    expect(RGBAToHex(RED, { withSharp: true, excludeAlpha: true })).toEqual('#ff0000');
    expect(RGBAToHex(RED, { withSharp: false, excludeAlpha: true })).toEqual('ff0000');
    expect(RGBAToHex(BLUE, { withSharp: true, excludeAlpha: false })).toEqual('#0000ffff');
    expect(RGBAToHex(GREEN, { withSharp: false, excludeAlpha: false })).toEqual('00ff00ff');
  });

  it('isTransparent', () => {
    expect(isTransparent(RED)).toBeFalsy();
    expect(isTransparent(TRANSPARENT)).toBeTruthy();
    expect(isTransparent(TRANSPARENT2)).toBeTruthy();
    expect(isTransparent([0, 0, 255, 128])).toBeFalsy();
    // @ts-expect-error
    expect(isTransparent([])).toBeTruthy();
    expect(isTransparent([NaN, NaN, NaN, NaN])).toBeFalsy();
    // @ts-expect-error
    expect(isTransparent([NaN, 255, NaN, undefined])).toBeTruthy();
  });
});
