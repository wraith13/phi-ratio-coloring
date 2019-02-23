import { phiColors } from "../source";
import assert = require("assert");

const deltaRound = (value: number) =>
    (-0.00000000001 < value && value < 0.00000000001 ? 0.0: value).toFixed(10);
const objectDeltaRound = (o: object): object =>
{
    //  ⚠ 雑に処理してるから array が普通の object になったりするけどここでは気にしない
    const result = { };
    Object.keys(o).forEach
    (
        key =>
        {
            const value = o[key]
            if ("number" === typeof value)
            {
                result[key] = deltaRound(value);
            }
            else
            if ("object" === typeof value)
            {
                result[key] = objectDeltaRound(value);
            }
            else
            {
                result[key] = value;
            }
        }
    );
    return result;
}
const assertDeepNearEqual = (result: object, expect: object) => assert.deepEqual(objectDeltaRound(result), objectDeltaRound(expect));

describe
(
    'phiColors',
    () =>
    {
        describe
        (
            'rgbToHsl()',
            () =>
            {
                it(`rgbToHsl({r:0.0,g:0.0,b:0.0})`, () => assertDeepNearEqual(phiColors.rgbToHsl({r:0.0,g:0.0,b:0.0}), {h: 0, s: 0, l: 0}));
                it(`rgbToHsl({r:1.0,g:0.0,b:0.0})`, () => assertDeepNearEqual(phiColors.rgbToHsl({r:1.0,g:0.0,b:0.0}), {h: 0, s: 2.0/3.0, l: 1.0/3.0}));
                it(`rgbToHsl({r:0.0,g:1.0,b:0.0})`, () => assertDeepNearEqual(phiColors.rgbToHsl({r:0.0,g:1.0,b:0.0}), {h: Math.PI*2.0/3.0, s: 2.0/3.0, l: 1.0/3.0}));
                it(`rgbToHsl({r:0.0,g:0.0,b:1.0})`, () => assertDeepNearEqual(phiColors.rgbToHsl({r:0.0,g:0.0,b:1.0}), {h: -Math.PI*2.0/3.0, s: 2.0/3.0, l: 1.0/3.0}));
                it(`rgbToHsl({r:1.0,g:1.0,b:0.0})`, () => assertDeepNearEqual(phiColors.rgbToHsl({r:1.0,g:1.0,b:0.0}), {h: Math.PI/3.0, s: 2.0/3.0, l: 2.0/3.0}));
                it(`rgbToHsl({r:1.0,g:1.0,b:1.0})`, () => assertDeepNearEqual(phiColors.rgbToHsl({r:1.0,g:1.0,b:1.0}), {h: 0, s: 0.0, l: 1.0}));
                it(`rgbToHsl({r:0.5,g:0.5,b:0.5})`, () => assertDeepNearEqual(phiColors.rgbToHsl({r:0.5,g:0.5,b:0.5}), {h: 0, s: 0.0, l: 0.5}));
                it(`rgbToHsl({r:0.1,g:0.0,b:0.0})`, () => assertDeepNearEqual(phiColors.rgbToHsl({r:0.1,g:0.0,b:0.0}), {h: 0, s: 0.2/3.0, l: 0.1/3.0}));
                it(`rgbToHsl({r:0.1,g:0.1,b:0.0})`, () => assertDeepNearEqual(phiColors.rgbToHsl({r:0.1,g:0.1,b:0.0}), {h: Math.PI/3.0, s: 0.2/3.0, l: 0.2/3.0}));
                it(`rgbToHsl({r:0.9,g:0.0,b:0.0})`, () => assertDeepNearEqual(phiColors.rgbToHsl({r:0.9,g:0.0,b:0.0}), {h: 0, s: 0.6, l: 0.3}));
                it(`rgbToHsl({r:0.9,g:0.9,b:0.0})`, () => assertDeepNearEqual(phiColors.rgbToHsl({r:0.9,g:0.9,b:0.0}), {h: Math.PI/3.0, s: 0.6, l: 0.6}));
            }
        );
        describe
        (
            'hslToRgb()',
            () =>
                [
                    {r:0.0,g:0.0,b:0.0},
                    {r:1.0,g:0.0,b:0.0},
                    {r:0.0,g:1.0,b:0.0},
                    {r:0.0,g:0.0,b:1.0},
                    {r:1.0,g:1.0,b:0.0},
                    {r:1.0,g:1.0,b:1.0},
                    {r:0.5,g:0.5,b:0.5},
                    {r:0.1,g:0.0,b:0.0},
                    {r:0.1,g:0.1,b:0.0},
                    {r:0.9,g:0.0,b:0.0},
                    {r:0.9,g:0.9,b:0.0},
                ]
                .forEach
                (
                    i => it(`hslToRgb(rgbToHsl(${JSON.stringify(i)}))`, () => assertDeepNearEqual(phiColors.hslToRgb(phiColors.rgbToHsl(i)),i))
                )
        );
    }
);
