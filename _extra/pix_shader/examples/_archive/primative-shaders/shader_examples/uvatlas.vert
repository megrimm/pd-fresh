/* uvatlas.vert - transforms vertices into their texture coord space */


uniform float Zscale;

uniform float time;

//
// entry point
//
void main( void )
{
	float x = gl_MultiTexCoord0.x;
	float y = gl_MultiTexCoord0.y;
	float z = Zscale * gl_Vertex.z;

	vec4 p1 = vec4( x,y,z, 1.0 );
	vec4 p2 = gl_Vertex;

	// blend between UV coords and vertex coords
	float a = clamp( 0.6 * sin( time ) + 0.5, 0.0, 1.0 );
	vec4 v = a * p1 + ( 1.0 - a ) * p2;

	gl_Position = gl_ModelViewProjectionMatrix * v;
	gl_FrontColor = gl_Color;
	gl_TexCoord[0] = gl_MultiTexCoord0;
}
