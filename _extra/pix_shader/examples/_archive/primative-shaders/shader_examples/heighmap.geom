/* heighmap.geom - simple heighmap sampling */

// !!! this shader does not work !!!

/*
Requirements:
  - works only with GL_TRIANGLES input
  - gl_PositionIn must be the UNTRANSFORMED vertex position.
*/


// enable geo shader
#version 120
#extension GL_EXT_geometry_shader4 : enable



// uniforms
uniform sampler2D heighMap;
uniform int maxSubdivisions;


varying in vec3 normal[];



// vertex data
struct vertex_s
{
	vec3	position;
	vec3	normal;
	vec2	texCoord;
};


// vertex interpolation:
// c = a * s + b * ( 1 - s )
vertex_s lerpVertices( vertex_s a, vertex_s b, float s )
{
	vertex_s c;
	c.position = a.position * s + b.position * ( 1.0 - s );
	c.normal   = a.normal   * s + b.normal   * ( 1.0 - s );
	c.texCoord = a.texCoord * s + b.texCoord * ( 1.0 - s );
	return c;
}

// get a height value.
float sampleHeighMap( vec2 st )
{
	return texture2D( heighMap, st ).r;
}



//
// samples the heighmap and outputs a vertex.
//
void outputVertex( vertex_s v )
{
	float h = sampleHeighMap( v.texCoord );
	vec3 p = v.position + v.normal * h * 0.5;

	gl_Position = gl_ModelViewProjectionMatrix * vec4( p, 1.0 );
	gl_TexCoord[0] = vec4( v.texCoord, 0.0, 0.0 );

	EmitVertex();
}


//
// if level > 1 then the triangle is split into
//  two triangles ABD adn ADC, where D is on center
//  between B and C
//
void splitTriangle( vertex_s a, vertex_s b, vertex_s c, int level )
{
	// base case, output the triangle
	if( level <= 1 )
	{
		outputVertex( a );
		outputVertex( b );
		outputVertex( c );
		EndPrimitive();
	}

	// recustion case
	else
	{
		vertex_s d = lerpVertices( b,c, 0.5 );
	//	splitTriangle( a,b,d, level-1 );
	//	splitTriangle( a,d,c, level-1 );
	}
}


//
// entry point.
//
void main( void )
{
	int stackBase = 0;
	vertex_s v[ 3 ];

	// initialize vertices
	for( int i = 0 ; i < 3 ; i++ )
	{
		v[i].position = gl_PositionIn[ i ].xyz;
		v[i].normal   = normal[ i ];
		v[i].texCoord = gl_TexCoordIn[ i ][0].st;
	}


	// subdivide...
	vertex_s d = lerpVertices( v[1], v[2], 0.5 );
	
	outputVertex( v[0] );
	outputVertex( v[1] );
	outputVertex( d );
	EndPrimitive();
	
	outputVertex( v[0] );
	outputVertex( d );
	outputVertex( v[2] );
	EndPrimitive();
}

/*	for( int i = 0 ; i < gl_VerticesIn ; i++ )
	{
		vec3 n = normal[ i ];

		float h = sampleHeighMap( gl_TexCoordIn[i][0].st );
		vec3 offset = n * h;
		vec4 offset4 = vec4( offset, 1.0 );

		vec4 pos = gl_PositionIn[ i ] + offset4;
		gl_Position = gl_ModelViewProjectionMatrix * pos;

		gl_FrontColor = h * vec4( 1.0, 1.0, 1.0, 1.0 ) 
				+ (1.0 - h) * vec4( 1.0, 0.0, 0.0, 1.0 );

		gl_TexCoord[0] = gl_TexCoordIn[i][0];

		EmitVertex();
	}*/



