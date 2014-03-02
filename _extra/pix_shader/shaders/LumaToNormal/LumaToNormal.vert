varying vec2 s1Coord;
varying vec2 s2Coord;
varying vec2 s3Coord;

void main(void)
{

    // perform standard transform on vertex
    gl_Position = ftransform();

    // transform texcoords
	s1Coord = vec2(gl_TextureMatrix[0] * gl_MultiTexCoord0);
	
	s2Coord = s1Coord + vec2(1.0, 0.0);
	s3Coord = s1Coord + vec2(0.0, 1.0);
}