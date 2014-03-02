/* morph.vert - interpolates between the model and the unit sphere */

// time contains the seconds since the sahder was linked.
uniform float time;


//
// entry point
//
void main( void )
{
	// make sure the interpolation parameter is not negative.
	float alpha = max( 0.0, sin( time ) );

	vec3 p = gl_Vertex.xyz; 			 // original position
	vec3 n = normalize( gl_Vertex.xyz ); // point on unit sphere

	// do linear interpolation
	vec3 v = n * alpha + p * ( 1.0 - alpha );

	// in case normalize fails...
	if( p == vec3( 0.0, 0.0, 0.0 ) )
	{
		v = p;
	}

	// continue the transformation.
	gl_Position = gl_ModelViewProjectionMatrix * vec4( v, 1.0 );
	gl_TexCoord[0] = gl_MultiTexCoord0;
	gl_FrontColor = gl_Color;
}
