// wave.vert - moves vertices along the normals

// time contains the seconds sind the progam was linked.
uniform float time;


//
// entry point.
//
void main( void )
{
	float scale = 2.0;
	float x = gl_Vertex.x;
	float y = gl_Vertex.y;

	// calculate a scale factor.
	float s = sin( (time+3.0*y)*scale );
	float c = cos( (time+5.0*x)*scale );
	float z = 0.05 * s * c;

	// offset the position along the normal.
	vec3 v = gl_Vertex.xyz + gl_Normal * z;

	// transform the attributes.
	gl_Position = gl_ModelViewProjectionMatrix * vec4( v, 1.0 );
	gl_FrontColor = gl_Color;
	gl_TexCoord[0] = gl_MultiTexCoord0;
}

