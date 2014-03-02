/* std.frag -  simple fragment shader */


//
// entry point
//
void main( void )
{
	// pass through interpolated vertex color.
	gl_FragColor = gl_Color;
}
