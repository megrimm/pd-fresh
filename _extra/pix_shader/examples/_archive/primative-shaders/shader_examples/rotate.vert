/* rotate.vert - some vector rotation functions */

// time contains the seconds since the program was linked.
uniform float time;


varying vec3 normal;
varying vec3 position;


//
// Rotation functions.
// Angles are in radians.
//

vec4 rotateAroundX( float angle, vec4 v )
{
	float sa = sin( angle );
	float ca = cos( angle );

	return vec4( v.x,
				 ca*v.y - sa*v.z,
				 sa*v.y + ca*v.z,
				 v.w );
}

//---------

vec4 rotateAroundY( float angle, vec4 v )
{
	float sa = sin( angle );
	float ca = cos( angle );

	return vec4( sa*v.z + ca*v.x,   v.y,
				 ca*v.z - sa*v.x,   v.w );
}

//---------

vec4 rotateAroundZ( float angle, vec4 v )
{
	float sa = sin( angle );
	float ca = cos( angle );

	return vec4( ca*v.x - sa*v.y,
				 sa*v.x + ca*v.y,
				 v.z, v.w );
}

//---------



//
// entry point
//
void main( void )
{
	gl_FrontColor = gl_Color;
	gl_TexCoord[0] = gl_MultiTexCoord0;

	// rotate vertex and normal
	vec4 vertex = rotateAroundY( time, 
				  rotateAroundZ( time,
				  rotateAroundX( time, gl_Vertex ) ) );
	vec3 N = vec3(rotateAroundY( time, 
				  rotateAroundZ( time,
				  rotateAroundX( time, vec4(gl_Normal,1.0) ) ) ) );

	// now apply the application provided transformations
	normal = gl_NormalMatrix * N;
	position = vec3( gl_ModelViewMatrix * vertex );

	// rotate the model
	gl_Position = gl_ModelViewProjectionMatrix * vertex;

//	gl_Position = gl_ModelViewProjectionMatrix
//				* rotateAroundY( time, vertex );

//	gl_Position = gl_ModelViewProjectionMatrix
//				* rotateAroundX( time, vertex );

//	gl_Position = ftransform();
}

