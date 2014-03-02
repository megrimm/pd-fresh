// Ordered dithering aka Bayer matrix dithering

#version 120

uniform sampler2DRect tex0;
varying vec2 texcoord0;
uniform float greyscale;
uniform float scale;

uniform int dither[64];
const vec4 lumacoeff = vec4(0.2126,0.7152,0.0722, 0.0);

float find_closest(int x, int  y, float c0, int thing[64])
{
    float limit = 0.0;
    if(x < 8)
    {
        limit = (thing[(x * 8) + y]+1)/64.0;
    }
    
    if(c0 < limit)
        return 0.0;
    return 1.0;
}

void main(void)
{    
    vec4 rgb = texture2DRect(tex0, texcoord0);
    float grayscale = dot(rgb, lumacoeff);
    
    vec2 xy = gl_FragCoord.xy * scale;
    int x = int(mod(xy.x, 8));
    int y = int(mod(xy.y, 8));
    
    vec3 finalRGB;
    finalRGB.r = find_closest(x, y, rgb.r, dither);
    finalRGB.g = find_closest(x, y, rgb.g, dither);
    finalRGB.b = find_closest(x, y, rgb.b, dither);

    float final = find_closest(x, y, grayscale, dither);
    gl_FragColor = vec4( mix(finalRGB,vec3(final), greyscale), rgb.a);
}