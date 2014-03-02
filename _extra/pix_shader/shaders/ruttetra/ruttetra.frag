//setup for 2 texture

varying vec2 texcoord0;
varying vec2 texdim0;

uniform sampler2DRect tex0;

uniform float bias;

void main()
{	
    // output texture
	gl_FragColor = texture2DRect(tex0, texcoord0);
}