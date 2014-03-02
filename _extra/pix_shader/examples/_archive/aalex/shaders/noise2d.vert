varying vec2 pos;
varying vec4 basecolor;

uniform vec2 offset;
uniform vec2 scale;

void main( void )
{
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
	pos = offset + scale * vec2(gl_TextureMatrix[0] * gl_MultiTexCoord0);
	basecolor = gl_Color;
}
