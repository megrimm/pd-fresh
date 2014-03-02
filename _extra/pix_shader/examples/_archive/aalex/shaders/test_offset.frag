uniform sampler2DRect tex0;
uniform vec2 offset;

varying vec2 texcoord0;
varying vec2 texdim0;

void main()
{	
	gl_FragColor = texture2DRect(tex0, texcoord0 + offset); // * gl_Color;
}
