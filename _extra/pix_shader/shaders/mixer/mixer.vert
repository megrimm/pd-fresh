varying vec2 texcoord0;
varying vec2 texcoord1;

uniform vec2 size1;
uniform vec2 size2;


void main()
{
	
    texcoord0 = size1*gl_MultiTexCoord0.st/10.;
	// 10 is the size of the dumy texture, so we compute the real coordinate based on the position in this texture
    texcoord1 = size2*gl_MultiTexCoord0.st/10.;
    gl_Position = ftransform();

}
