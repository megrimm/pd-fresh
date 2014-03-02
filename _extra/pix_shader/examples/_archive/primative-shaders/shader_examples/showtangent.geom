/* showtangent.geom - shows tangent space vectors */

#version 120
#extension GL_EXT_geometry_shader4 : enable

// Input:   TRIANGLES
// Output:  LINES


// vertex shader output
varying in mat3 tangentToEyeMatrix[];


// colors
const vec4 red   = vec4( 1.0, 0.0, 0.0, 1.0 );
const vec4 green = vec4( 0.0, 1.0, 0.0, 1.0 );
const vec4 blue  = vec4( 0.0, 0.0, 1.0, 1.0 );


//
// Draws a colored line.
// Performs projection transformation.
//
void drawLine( vec4 color, vec3 from, vec3 to )
{
	gl_FrontColor = color;
	gl_Position = gl_ProjectionMatrix * vec4( from, 1.0 );
	EmitVertex();

	gl_FrontColor = color;
	gl_Position = gl_ProjectionMatrix * vec4( to, 1.0 );
	EmitVertex();

	EndPrimitive();
}



//
// draws a vertex
//
void drawVertex( int i )
{
	vec3 origin = ( gl_ModelViewMatrix * gl_PositionIn[i] ).xyz;

	mat3 basis = gl_NormalMatrix * tangentToEyeMatrix[i];

	float scale = 0.1;
	drawLine( red,   origin, origin + basis[0] * scale );
	drawLine( green, origin, origin + basis[1] * scale );
	drawLine( blue,  origin, origin + basis[2] * scale );
}


//
// entry point
//
void main( void )
{
	drawVertex( 0 );
//	drawVertex( 1 );
//	drawVertex( 2 );
}

