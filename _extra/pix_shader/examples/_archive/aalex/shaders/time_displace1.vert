
varying vec2 texcoord0;
varying vec2 texcoord1;
varying vec2 texcoord2;
varying vec2 texcoord3;

/**
 * that one is needed
 */
varying vec2 texdim0;

void main()
{
    gl_Position = ftransform();

    /* transform texcoords
	 * note we use the same texcoords here... :( 
	 */
    texcoord0 = vec2(gl_TextureMatrix[0] * gl_MultiTexCoord0);
   	texcoord1 = vec2(gl_TextureMatrix[1] * gl_MultiTexCoord0);
   	texcoord2 = vec2(gl_TextureMatrix[2] * gl_MultiTexCoord0);
   	texcoord3 = vec2(gl_TextureMatrix[3] * gl_MultiTexCoord0);
   	/* important for getting normalized coordinates in fragment shader */
   	texdim0 = vec2(abs(gl_TextureMatrix[0][0][0]), abs(gl_TextureMatrix[0][1][1]));
}