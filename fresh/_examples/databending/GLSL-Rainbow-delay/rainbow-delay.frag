//fragment program
//By Olivier Baudu under GPL V3.0

uniform sampler2D Tex0, Tex2, Tex3, Tex4, Tex5;

void main()
{
	vec4 color0 = texture2D(Tex0, -gl_TexCoord[0].st);
	vec4 color2 = texture2D(Tex2, -gl_TexCoord[0].st);
	vec4 color3 = texture2D(Tex3, -gl_TexCoord[0].st);
	vec4 color4 = texture2D(Tex4, -gl_TexCoord[0].st);
	vec4 color5 = texture2D(Tex5, -gl_TexCoord[0].st);

	color0.r = 0.0;
	color2.g = 0.0;
	color3.b = 0.0;
	color4.rb = vec2 (0.0, 0.0);
	color5.gb = vec2 (0.0, 0.0);

	gl_FragColor = (color0+color2+color3+color4+color5)/3.0;
}
