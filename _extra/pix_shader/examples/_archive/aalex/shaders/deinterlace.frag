/* Here is a line averaging deinterlacing shader. Its pretty simple, but ive tested it and it works. yay.
*/

// define our rectangular texture samplers 
uniform sampler2DRect tex0;

// define our varying texture coordinates 
varying vec2 texcoord0;
varying vec2 texdim0;

const float scanline = 2.0;

void main (void) 
{
	float iseven = mod(texcoord0.y,2.0); // returns 0 or 1.
	
	float evenfield = mix(texcoord0.y, texcoord0.y + 1.0, iseven);
	float oddfield = mix(texcoord0.y, texcoord0.y + 1.0,  1.0 - iseven);
	vec2 scancoord1 = vec2(texcoord0.x, evenfield);
	vec2 scancoord2 = vec2(texcoord0.x, oddfield);
	vec4 input1 = texture2DRect(tex0, scancoord1);
	vec4 input2 = texture2DRect(tex0, scancoord2);
	
	gl_FragColor = mix(input1, input2, 0.5);
} 