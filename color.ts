let pass_through;
let phi = 1.618033988749894848204586834365;

interface ColorRgb
{
    r : number;
    g : number;
    b : number;
}
interface ColorHsl
{
    h : number;
    s : number;
    l : number;
}
interface Point3d
{
    x : number;
    y : number;
    z : number;
}

const rgbForStyle = function(expression: ColorRgb) {
    const toHex = (i : number) : string => {
        let result = ((255 *i) ^ 0).toString(16).toUpperCase();
        if (1 === result.length) {
            result = "0" +result;
        }
        return result;
    };
    return "#"
            +toHex(expression.r)
            +toHex(expression.g)
            +toHex(expression.b)
    ;
};
const xyzToLength = (xyz : Point3d) : number => Math.sqrt(Math.pow(xyz.x, 2) +Math.pow(xyz.y, 2) +Math.pow(xyz.z, 2));
const rgbToXyz = (expression : ColorRgb) : Point3d => pass_through = {x:expression.r, y:expression.g, z:expression.b};

const rgbToHue = (expression : ColorRgb) => {
    const hueXy = {
        x: Math.sqrt(Math.pow(expression.g, 2) -Math.pow(expression.g /2, 2))
            -Math.sqrt(Math.pow(expression.b, 2) -Math.pow(expression.b /2, 2)),
        y: (expression.g /2) +(expression.b /2) -expression.r
    };
    return (Math.PI/2 -Math.atan2(hueXy.y, hueXy.x)) /Math.PI;
};
const rgbToLightness = (expression : ColorRgb) : number => xyzToLength(rgbToXyz(expression)) / xyzToLength({x:1.0, y:1.0, z:1.0});
const rgbToSaturation = (expression : ColorRgb) : number => {
    const lightness = rgbToLightness(expression);
    const green = {r:0.0, g:Math.pow(lightness, 2), b:0.0};
    const greenLightness = rgbToLightness(green);
    return xyzToLength({x:expression.r -lightness, y:expression.g -lightness, z:expression.b -lightness}) / xyzToLength({x:green.r -greenLightness, y:green.g -greenLightness, z:green.b -greenLightness});
};
const rgbToHsl = (expression : ColorRgb) : ColorHsl => pass_through =
    //	※座標空間敵に RGB 色空間の立方体の座標として捉えるので、本来であれば円筒形あるいは双円錐形の座標となる HLS (および HSV とも)厳密には異なるが、ここでは便宜上 HLS と呼称する。
    {
        h: rgbToHue(expression),
        s: rgbToSaturation(expression),
        l: rgbToLightness(expression)
    };
const hslToRgb = (_expression : ColorHsl) : ColorRgb => {
    //	※座標空間敵に RGB 色空間の立方体の座標として捉えるので、本来であれば円筒形あるいは双円錐形の座標となる HLS (および HSV とも)厳密には異なるが、ここでは便宜上 HLS と呼称する。
    const red = 0.0;
    const green = 0.0;
    const blue = 0.0;
    return {
        r: red,
        g: green,
        b: blue
    }
};
