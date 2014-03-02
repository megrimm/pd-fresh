uniform float amount;

/**
 * useless var
 * gl_TexCoord[0].st will give you that in the programmable fragment pipeline
 */
varying vec2 texcoord0;

/**
 * that one is needed
 */
varying vec2 texdim0;

void main()
{
    texcoord0 = vec2(gl_TextureMatrix[0] * gl_MultiTexCoord0);
    texdim0 = vec2(abs(gl_TextureMatrix[0][0][0]), abs(gl_TextureMatrix[0][1][1]));
	gl_Position = ftransform();
}