uniform sampler2D Tex0, Tex1;
varying vec2 FragTexCoord;

void main (void)
{
	vec4 Fullres = texture2D(Tex0, FragTexCoord);
	vec4 Blurred = texture2D(Tex1, FragTexCoord);

	// HLSL linear interpolation function
	gl_FragColor = Fullres + Fullres.a * (Blurred - Fullres);
}
