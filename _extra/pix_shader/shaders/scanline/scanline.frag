// Jack/RYBN 2013
uniform sampler2DRect tex0;
uniform float interlace, width, mode;

void main() {
	float widthOK = width;
	float coef = 1.0;
	vec2 coord = (gl_TextureMatrix[0] * gl_TexCoord[0]).st;
	float interlaceOK = max(1.0,interlace);
	coord.t /= interlaceOK;
	float fract = fract(coord.t);
	coord.t = floor(coord.t);
	if (mode == 1.0 && fract > widthOK) coef = 0.0;
	coord.t *= interlaceOK;
	vec4 color = texture2DRect(tex0, coord);
	color.rgb *= coef;
    gl_FragColor = color;
}

