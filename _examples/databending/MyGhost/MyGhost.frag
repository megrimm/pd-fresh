//fragment program
//By Olivier Baudu under GPL V3.0

uniform sampler2D Tex1;

void main()
{
	vec4 color2 = texture2D (Tex1, gl_TexCoord[0].st);
	gl_FragColor = color2;
}
