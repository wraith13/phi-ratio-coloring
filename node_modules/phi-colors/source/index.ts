export module phiColors
{
    export const phi = 1.618033988749895;

    export interface Rgb
    {
        r : number; // min:0.0, max:1.0
        g : number; // min:0.0, max:1.0
        b : number; // min:0.0, max:1.0
    }
    export interface Rgba extends Rgb
    {
        a : number; // min:0.0, max:1.0
    }
    //	※座標空間的に RGB 色空間立方体の座標として捉えるので、本来であれば円筒形あるいは双円錐形の座標となる HLS (および HSV とも)厳密には異なるが、ここでは便宜上 HLS と呼称する。
    export interface Hsl
    {
        h : number; // min:-Math.PI, max:Math.PI
        s : number; // min:0.0, max:Math,Pow(calcSaturation({r:1.0, g:0.0, b:0.0}), 2) === 2.0/3.0
        l : number; // min:0.0, max:1.0
    }
    export interface Hsla extends Hsl
    {
        a : number; // min:0.0, max:1.0
    }
    export const HslHMin = -Math.PI;
    export const HslHMax = Math.PI;
    export const HslSMin = 0.0;
    export const HslSMax = 2.0 / 3.0;
    export const HslLMin = 0.0;
    export const HslLMax = 1.0;
    export const rLumaRate = 0.299;
    export const gLumaRate = 0.587;
    export const bLumaRate = 0.114;

    interface Point3d
    {
        x : number;
        y : number;
        z : number;
    }
    const toHex = (i : number) : string => {
        let result = Math.round(255 *i).toString(16).toUpperCase();
        if (1 === result.length) {
            result = "0" +result;
        }
        return result;
    };
    export const rgbForStyle = (expression: Rgb) =>
        "#"
            +toHex(expression.r)
            +toHex(expression.g)
            +toHex(expression.b);
    export const rgbaForStyle = (expression: Rgba) =>
        rgbForStyle(expression) +toHex(expression.a);
    export const rgbFromStyle = (style : string) : Rgb =>
    {
        let r = 0.0;
        let g = 0.0;
        let b = 0.0;
        while("#" === style.substr(0,1))
        {
            style = style.substr(1);
        }
        if (3 === style.length)
        {
            r = (parseInt(style.substr(0,1), 16) *0x11) /255.0;
            g = (parseInt(style.substr(1,1), 16) *0x11) /255.0;
            b = (parseInt(style.substr(2,1), 16) *0x11) /255.0;
        }
        if (6 === style.length)
        {
            r = parseInt(style.substr(0,2), 16) /255.0;
            g = parseInt(style.substr(2,2), 16) /255.0;
            b = parseInt(style.substr(4,2), 16) /255.0;
        }
        return {r, g, b};
    };
    export const rgbaFromStyle = (style : string) : Rgba =>
    {
        let r = 0.0;
        let g = 0.0;
        let b = 0.0;
        let a = 1.0;
        while("#" === style.substr(0,1))
        {
            style = style.substr(1);
        }
        if (3 === style.length || 4 === style.length)
        {
            r = (parseInt(style.substr(0,1), 16) *0x11) /255.0;
            g = (parseInt(style.substr(1,1), 16) *0x11) /255.0;
            b = (parseInt(style.substr(2,1), 16) *0x11) /255.0;
            if (4 === style.length)
            {
                a = (parseInt(style.substr(3,1), 16) *0x11) /255.0;
            }
        }
        if (6 === style.length || 8 === style.length)
        {
            r = parseInt(style.substr(0,2), 16) /255.0;
            g = parseInt(style.substr(2,2), 16) /255.0;
            b = parseInt(style.substr(4,2), 16) /255.0;
            if (8 === style.length)
            {
                a = parseInt(style.substr(6,2), 16) /255.0;
            }
        }
        return {r, g, b, a};
    };
    export const xyzToLength = (xyz : Point3d) : number => Math.sqrt(Math.pow(xyz.x, 2) +Math.pow(xyz.y, 2) +Math.pow(xyz.z, 2));
    export const rgbToXyz = (expression : Rgb) : Point3d => ({x:expression.r, y:expression.g, z:expression.b});
    export const rgbToHue = (expression : Rgb) =>
    {
        const hueXy = {
            x: expression.r -((expression.g /2) +(expression.b /2)),
            y: Math.sqrt(Math.pow(expression.g, 2) -Math.pow(expression.g /2, 2))
                -Math.sqrt(Math.pow(expression.b, 2) -Math.pow(expression.b /2, 2))
        };
        return Math.atan2(hueXy.y, hueXy.x);
    };
    export const rgbToLuma = (expression : Rgb) : number => (expression.r *rLumaRate) +(expression.g *gLumaRate) +(expression.b *bLumaRate);
    export const rgbToLightness = (expression : Rgb) : number => (expression.r +expression.g +expression.b) /3.0;
    export const calcSaturation = (expression : Rgb) : number =>
    {
        const lightness = rgbToLightness(expression);
        return xyzToLength({x:expression.r -lightness, y:expression.g -lightness, z:expression.b -lightness});
    };
    export const rgbToSaturation = (expression : Rgb) : number => calcSaturation(expression) *calcSaturation({r:1.0, g:0.0, b:0.0});
    export const rgbToHsl = (expression : Rgb) : Hsl =>
    ({
        h: rgbToHue(expression),
        s: rgbToSaturation(expression),
        l: rgbToLightness(expression)
    });
    export const rgbaToHsla = (expression : Rgba) : Hsla =>
    ({
        h: rgbToHue(expression),
        s: rgbToSaturation(expression),
        l: rgbToLightness(expression),
        a: expression.a,
    });
    export const hslToRgbElement = (expression : Hsl, Angle : number) : number => expression.l +expression.s *Math.cos(expression.h -(Math.PI *2) /3.0 *Angle);
    export const hslToRgb = (expression : Hsl) : Rgb =>
    ({
        r:hslToRgbElement(expression, 0.0),
        g:hslToRgbElement(expression, 1.0),
        b:hslToRgbElement(expression, 2.0)
    });
    export const hslaToRgba = (expression : Hsla) : Rgba =>
    ({
        r:hslToRgbElement(expression, 0.0),
        g:hslToRgbElement(expression, 1.0),
        b:hslToRgbElement(expression, 2.0),
        a:expression.a,
    });
    export const regulateHue = (expression : Hsl) : Hsl =>
    ({
        h: expression.h - (((expression.h +(0 <= expression.h ? Math.PI: -Math.PI)) /(Math.PI *2)) ^ 0) *(Math.PI *2),
        s: expression.s,
        l: expression.l,
    });
    export const clipLightness = (expression : Hsl) : Hsl =>
    ({
        h: expression.h,
        s: expression.s,
        l: Math.max(0.0, Math.min(1.0, expression.l)),
    });
    export const clipSaturation = (expression : Hsl) : Hsl =>
    {
        const rgb = hslToRgb(expression);
        const overRate = Math.max
        (
            (rgb.r < 0.0) ? (expression.l -rgb.r) / expression.l:
            (1.0 < rgb.r) ? (rgb.r -expression.l) / (1.0 -expression.l):
            1.0,

            (rgb.g < 0.0) ? (expression.l -rgb.g) / expression.l:
            (1.0 < rgb.g) ? (rgb.g -expression.l) / (1.0 -expression.l):
            1.0,

            (rgb.b < 0.0) ? (expression.l -rgb.b) / expression.l:
            (1.0 < rgb.b) ? (rgb.b -expression.l) / (1.0 -expression.l):
            1.0,
        );
        const result =
        {
            h: expression.h,
            s: expression.s / overRate,
            l: expression.l,
        };
        return result;
    };
    export const regulateHsl = (expression : Hsl) : Hsl => clipSaturation(clipLightness(regulateHue(expression)));
    export const regulateHsla = (expression : Hsla) : Hsla =>
    {
        const result = clipSaturation(clipLightness(regulateHue(expression)));
        return {
            h: result.h,
            s: result.s,
            l: result.l,
            a: expression.a,
        };
    };
    export const clipRgb = (expression : Rgb) : Rgb =>
    ({
        r: Math.max(0.0, Math.min(1.0, expression.r)),
        g: Math.max(0.0, Math.min(1.0, expression.g)),
        b: Math.max(0.0, Math.min(1.0, expression.b)),
    });
    export const clipRgba = (expression : Rgba) : Rgba =>
    ({
        r: Math.max(0.0, Math.min(1.0, expression.r)),
        g: Math.max(0.0, Math.min(1.0, expression.g)),
        b: Math.max(0.0, Math.min(1.0, expression.b)),
        a: Math.max(0.0, Math.min(1.0, expression.a)),
    });
    export const generate = (base: Hsla, h : number | undefined, s : number | undefined, l :number | undefined, a :number | undefined, isAlignLuma : boolean = true): Hsla =>
    {
        const hsla =
        {
            h: base.h,
            s: base.s,
            l: base.l,
            a: base.a,
        };
        if (undefined !== h && 0.0 !== h)
        {
            hsla.h += Math.PI *2 / phi *h;
        }
        if (undefined !== s && 0.0 !== s)
        {
            hsla.s = s < 0.0 ?
                hsla.s / Math.pow(phi, -s):
                HslSMax -((HslSMax - hsla.s) / Math.pow(phi, s));
        }
        if (undefined !== l && 0.0 !== l)
        {
            hsla.l = l < 0.0 ?
                hsla.l / Math.pow(phi, -l):
                1.0 -((1.0 - hsla.l) / Math.pow(phi, l));
        }
        if (undefined !== a && 0.0 !== a)
        {
            hsla.a = a < 0.0 ?
                hsla.a / Math.pow(phi, -a):
                1.0 -((1.0 - hsla.a) / Math.pow(phi, a));
        }
        if (isAlignLuma)
        {
            const baseLuuma = rgbToLuma(hslToRgb({h:base.h, s:base.s, l:hsla.l}));
            const luuma = rgbToLuma(hslToRgb(hsla));
            hsla.l += baseLuuma -luuma;
        }
        return regulateHsla(hsla);
    };
}
