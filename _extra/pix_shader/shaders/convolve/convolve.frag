
varying vec2 texcoord0;

uniform float W00;
uniform float W01;
uniform float W02;
uniform float W10;
uniform float W11;
uniform float W12;
uniform float W20;
uniform float W21;
uniform float W22;
uniform float sum;
uniform float width;
uniform float height;

uniform sampler2DRect tex0;

void main()
{
    vec2 op = texcoord0;
    vec2 ox = vec2(width,0);
    vec2 oy = vec2(0,height);

    vec2 pos = op - oy;
    vec4 C00 = texture2DRect(tex0, pos-ox);
    vec4 C01 = texture2DRect(tex0, pos);
    vec4 C02 = texture2DRect(tex0, pos+ox);

    pos = op;
    vec4 C10 = texture2DRect(tex0, pos-ox);
    vec4 C11 = texture2DRect(tex0, pos);
    vec4 C12 = texture2DRect(tex0, pos+ox);

    pos = op + oy;
    vec4 C20 = texture2DRect(tex0, pos-ox);
    vec4 C21 = texture2DRect(tex0, pos);
    vec4 C22 = texture2DRect(tex0, pos+ox);

    gl_FragColor = C00 * W00;
    gl_FragColor += C01 * W01;
    gl_FragColor += C02 * W02;
    gl_FragColor += C10 * W10;
    gl_FragColor += C11 * W11;
    gl_FragColor += C12 * W12;
    gl_FragColor += C20 * W20;
    gl_FragColor += C21 * W21;
    gl_FragColor += C22 * W22;
    gl_FragColor = gl_FragColor / sum;
}
