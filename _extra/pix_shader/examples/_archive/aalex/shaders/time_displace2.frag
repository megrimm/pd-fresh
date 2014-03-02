/* define our rectangular texture samplers */
uniform sampler2D tex0;
uniform sampler2D tex1;
uniform sampler2D tex2;
uniform sampler2D tex3;

/* define our varying texture coordinates */
varying vec2 texcoord0;
varying vec2 texcoord1;
varying vec2 texcoord2;
varying vec2 texcoord3;


varying vec2 texdim0;

void main(void) 
{	
	vec2 point = texcoord0/texdim0;	
	vec2 normCoord = vec2(2.0) * point - vec2(1.0);
	
	//vec4 mix1 = overlay(input1, input0, amount * 2.0 );
	//vec4 mix2 = overlay(input0, input1, (1.0 - amount) * 2.0 );
	
	vec2 resultCoord0 = (normCoord / 2.0 + 0.5) * texdim0;
	/* gl_FragColor = texture2DRect(tex0, texCoord0); */
	
	
	vec4 input0 = texture2D(tex0, texcoord0);
	vec4 input1 = texture2D(tex1, texcoord1);
	vec4 input2 = texture2D(tex2, texcoord2);
	vec4 input3 = texture2D(tex3, texcoord3);
	/*
	vec4 input0 = texture2D(tex0, resultCoord0);
	vec4 input1 = texture2D(tex1, resultCoord0);
	vec4 input2 = texture2D(tex2, resultCoord0);
	vec4 input3 = texture2D(tex3, resultCoord0);
	*/
	float current = floor(mod(normCoord.y * 4.0, 4.0)); 
	vec4 the_output = vec4(0.0, 0.0, 0.0, 0.0);
	if (current == 0.0)
	{
		the_output = input0;
	} 
	else if (current == 1.0)
	{
		the_output = input1;
	} 
	else if (current == 2.0)
	{
		the_output = input2;
	}
	else /* if (current == 3.0) */
	{
		the_output = input3;
	}
	gl_FragColor = the_output;
} 
