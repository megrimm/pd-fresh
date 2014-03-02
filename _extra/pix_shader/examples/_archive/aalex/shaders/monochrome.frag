/**
 * B&W conversion
 * from http://www.cycling74.com/story/2007/5/23/181113/507
 */
uniform sampler2DRect tex0;
varying vec2 texcoord0;
varying vec2 texdim0;

const vec4 lumcoeff = vec4(0.299,0.587,0.114,0.);
	
void main(void)
{
	vec4 texel = texture2DRect(tex0, texcoord0);
	float luma = dot(texel, lumcoeff);
	gl_FragColor = vec4(luma,luma,luma,1.0);
}
