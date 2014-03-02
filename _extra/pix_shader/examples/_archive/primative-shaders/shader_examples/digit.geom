/* digit.geom - displays a digital number for each drawn primitive */
/* !! Use only with the 'point' test model !! */

// Required input primitive type: any (ignored)
// Required output primitive type: triangle strip

// these lines enable the geometry shader support.
#version 120
#extension GL_EXT_geometry_shader4 : enable


// The value to be displayed.
uniform int number;

// display the 'time' uniform instead of 'number'
uniform bool displayTimer;

// built-in timer
uniform float time;

//-------------------------------------------------------------
// Emits a vertex.
// The vertex is transformed by the model view projection matrix.
//-------------------------------------------------------------

void EmitVertex2D( vec2 position )
{
	gl_Position = gl_ModelViewProjectionMatrix * vec4( position, 0.0, 1.0 );
	gl_FrontColor = gl_FrontMaterial.diffuse;
	gl_TexCoord[0] = vec4( position, 0.0, 1.0 );

	EmitVertex();
}


//-------------------------------------------------------------
//	draws a horizontal 7-segment LED element.
//-------------------------------------------------------------

// Note: front facing is CCW
void draw7SegElementH( vec2 scale, vec2 offset )
{
	EmitVertex2D( vec2( -0.90,  0.0  ) * scale + offset );
	EmitVertex2D( vec2( -0.75, -0.75 ) * scale + offset );
	EmitVertex2D( vec2( -0.75, +0.75 ) * scale + offset );
	EndPrimitive();

	EmitVertex2D( vec2( -0.75, +0.75 ) * scale + offset );
	EmitVertex2D( vec2( -0.75, -0.75 ) * scale + offset );
	EmitVertex2D( vec2( +0.75, +0.75 ) * scale + offset );
	EmitVertex2D( vec2( +0.75, -0.75 ) * scale + offset );
	EndPrimitive();

	EmitVertex2D( vec2( +0.90,  0.0  ) * scale + offset );
	EmitVertex2D( vec2( +0.75, +0.75 ) * scale + offset );
	EmitVertex2D( vec2( +0.75, -0.75 ) * scale + offset );
	EndPrimitive();
}


//-------------------------------------------------------------
//	draws a vertical 7-segment LED element.
//-------------------------------------------------------------

void draw7SegElementV( vec2 scale, vec2 offset )
{
	EmitVertex2D( vec2(  0.0,  +0.90 ) * scale + offset );
	EmitVertex2D( vec2( -0.75, +0.75 ) * scale + offset );
	EmitVertex2D( vec2( +0.75, +0.75 ) * scale + offset );
	EndPrimitive();

	EmitVertex2D( vec2( -0.75, +0.75 ) * scale + offset );
	EmitVertex2D( vec2( -0.75, -0.75 ) * scale + offset );
	EmitVertex2D( vec2( +0.75, +0.75 ) * scale + offset );
	EmitVertex2D( vec2( +0.75, -0.75 ) * scale + offset );
	EndPrimitive();

	EmitVertex2D( vec2(  0.0,  -0.90 ) * scale + offset );
	EmitVertex2D( vec2( +0.75, -0.75 ) * scale + offset );
	EmitVertex2D( vec2( -0.75, -0.75 ) * scale + offset );
	EndPrimitive();
}


//-------------------------------------------------------------
//	Draws the 7 Segment display
//-------------------------------------------------------------

void draw7SegTop( void )
{
	draw7SegElementH( vec2( 0.5, 0.1 ),
					  vec2( 0.0, 0.8 ) );
}

void draw7SegMiddle( void )
{
	draw7SegElementH( vec2( 0.5, 0.1 ),
					  vec2( 0.0, 0.0 ) );
}

void draw7SegBottom( void )
{
	draw7SegElementH( vec2( 0.5, 0.1 ),
					  vec2( 0.0, -0.8 ) );
}

void draw7SegLeftTop( void )
{
	draw7SegElementV( vec2( 0.1, 0.4 ),
					  vec2( -0.45, 0.4 ) );
}

void draw7SegLeftBottom( void )
{
	draw7SegElementV( vec2( 0.1, 0.4 ),
					  vec2( -0.45, -0.4 ) );
}

void draw7SegRightTop( void )
{
	draw7SegElementV( vec2( 0.1, 0.4 ),
					  vec2( 0.45, 0.4 ) );
}

void draw7SegRightBottom( void )
{
	draw7SegElementV( vec2( 0.1, 0.4 ),
					  vec2( 0.45, -0.4 ) );
}

//-------------------------------------------------------------
//	Drawing fnctions fo each digit
//-------------------------------------------------------------


void draw0( void )
{
	draw7SegTop();
	draw7SegBottom();
	draw7SegLeftTop();
	draw7SegLeftBottom();
	draw7SegRightTop();
	draw7SegRightBottom();
}

void draw1( void )
{
	draw7SegRightTop();
	draw7SegRightBottom();
}

void draw2( void )
{
	draw7SegTop();
	draw7SegMiddle();
	draw7SegBottom();
	draw7SegLeftBottom();
	draw7SegRightTop();
}

void draw3( void )
{
	draw7SegTop();
	draw7SegMiddle();
	draw7SegBottom();
	draw7SegRightTop();
	draw7SegRightBottom();
}

void draw4( void )
{
	draw7SegMiddle();
	draw7SegLeftTop();
	draw7SegRightTop();
	draw7SegRightBottom();
}

void draw5( void )
{
	draw7SegTop();
	draw7SegMiddle();
	draw7SegBottom();
	draw7SegLeftTop();
	draw7SegRightBottom();
}

void draw6( void )
{
	draw7SegTop();
	draw7SegMiddle();
	draw7SegBottom();
	draw7SegLeftTop();
	draw7SegLeftBottom();
	draw7SegRightBottom();
}

void draw7( void )
{
	draw7SegTop();
	draw7SegRightTop();
	draw7SegRightBottom();
}


void draw8( void )
{
	draw7SegTop();
	draw7SegMiddle();
	draw7SegBottom();
	draw7SegLeftTop();
	draw7SegLeftBottom();
	draw7SegRightTop();
	draw7SegRightBottom();
}


void draw9( void )
{
	draw7SegTop();
	draw7SegMiddle();
	draw7SegBottom();
	draw7SegLeftTop();
	draw7SegRightTop();
	draw7SegRightBottom();
}

//-------------------------------------------------------------
// entry point
//-------------------------------------------------------------

void main( void )
{
	float value;

	// get the value to display
	if( displayTimer ) { value = time; }
	else { value = float( number ); }

	// get the lowest digit
	int n = int( mod( value, 10.0 ) );

	// switch( n ), DEAD SLOW!!!
	     if( n == 0 ) { draw0(); }
	else if( n == 1 ) { draw1(); }
	else if( n == 2 ) { draw2(); }
	else if( n == 3 ) { draw3(); }
	else if( n == 4 ) { draw4(); }
	else if( n == 5 ) { draw5(); }
	else if( n == 6 ) { draw6(); }
	else if( n == 7 ) { draw7(); }
	else if( n == 8 ) { draw8(); }
	else if( n == 9 ) { draw9(); }
}


