//fragment program
//By Olivier Baudu under GPL V3.0

uniform sampler2D Tex0, Tex1, Tex2, Tex3, Tex4;

void main()
{
	vec4 color0 = texture2D(Tex0, -gl_TexCoord[0].st);
	vec4 color1 = texture2D(Tex1, -gl_TexCoord[0].st);
	vec4 color2 = texture2D(Tex2, -gl_TexCoord[0].st);
	vec4 color3 = texture2D(Tex3, -gl_TexCoord[0].st);
	vec4 color4 = texture2D(Tex4, -gl_TexCoord[0].st);

	float PosX = gl_TexCoord[0].t*5.0;

	if (floor(PosX) == 0.0) color0 = color0;	
	if (floor(PosX) == 1.0) color0 = color1;		
	if (floor(PosX) == 2.0) color0 = color2;
	if (floor(PosX) == 3.0) color0 = color3;		
	if (floor(PosX) == 4.0) color0 = color4;

	gl_FragColor = color0;
}
