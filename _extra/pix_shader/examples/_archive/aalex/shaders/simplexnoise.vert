uniform float time;

varying vec2 v_texCoord2D;
varying vec4 v_color;

void main( void )
{
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;

	v_texCoord2D = gl_MultiTexCoord0.xy;

	v_color = gl_Color;
}

