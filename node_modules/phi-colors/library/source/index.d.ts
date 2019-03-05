export declare module phiColors {
    const phi = 1.618033988749895;
    interface Rgb {
        r: number;
        g: number;
        b: number;
    }
    interface Rgba extends Rgb {
        a: number;
    }
    interface Hsl {
        h: number;
        s: number;
        l: number;
    }
    interface Hsla extends Hsl {
        a: number;
    }
    const HslHMin: number;
    const HslHMax: number;
    const HslSMin = 0;
    const HslSMax: number;
    const HslLMin = 0;
    const HslLMax = 1;
    const rLumaRate = 0.299;
    const gLumaRate = 0.587;
    const bLumaRate = 0.114;
    interface Point3d {
        x: number;
        y: number;
        z: number;
    }
    const rgbForStyle: (expression: Rgb) => string;
    const rgbaForStyle: (expression: Rgba) => string;
    const rgbFromStyle: (style: string) => Rgb;
    const rgbaFromStyle: (style: string) => Rgba;
    const xyzToLength: (xyz: Point3d) => number;
    const rgbToXyz: (expression: Rgb) => Point3d;
    const rgbToHue: (expression: Rgb) => number;
    const rgbToLuma: (expression: Rgb) => number;
    const rgbToLightness: (expression: Rgb) => number;
    const calcSaturation: (expression: Rgb) => number;
    const rgbToSaturation: (expression: Rgb) => number;
    const rgbToHsl: (expression: Rgb) => Hsl;
    const rgbaToHsla: (expression: Rgba) => Hsla;
    const hslToRgbElement: (expression: Hsl, Angle: number) => number;
    const hslToRgb: (expression: Hsl) => Rgb;
    const hslaToRgba: (expression: Hsla) => Rgba;
    const regulateHue: (expression: Hsl) => Hsl;
    const clipLightness: (expression: Hsl) => Hsl;
    const clipSaturation: (expression: Hsl) => Hsl;
    const regulateHsl: (expression: Hsl) => Hsl;
    const regulateHsla: (expression: Hsla) => Hsla;
    const clipRgb: (expression: Rgb) => Rgb;
    const clipRgba: (expression: Rgba) => Rgba;
    const generate: (base: Hsla, h: number, s: number, l: number, a: number, isAlignLuma?: boolean) => Hsla;
}
