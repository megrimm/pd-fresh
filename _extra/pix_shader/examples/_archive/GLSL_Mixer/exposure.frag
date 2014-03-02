uniform float exposure;

// define our rectangular texture samplers 
uniform sampler2D tex0;

// define our varying texture coordinates 
varying vec2 texcoord0;

const float sqrtoftwo = 1.41421356237;

void main (void) 
{ 
		
	vec4 input0 = texture2D(tex0, texcoord0);

	// premultiply:
	input0 = vec4(vec3(input0.rgb * input0.a), input0.a);

	input0 = log2(vec4(pow(exposure + sqrtoftwo, 2.0))) * input0;

	gl_FragColor = input0;

} 
