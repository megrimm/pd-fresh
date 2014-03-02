uniform sampler2D Tex0;
varying vec2 FragTexCoord;

void main (void)
{
	gl_FragData[0] = texture2D(Tex0, FragTexCoord);
}
