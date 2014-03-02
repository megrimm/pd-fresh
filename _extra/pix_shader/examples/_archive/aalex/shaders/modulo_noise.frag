/** 
 * Author : Alexandre Quessy
 * pseudo-noise
 */
uniform sampler2DRect tex0;
uniform float time;

varying vec2 texcoord0;
varying vec2 texdim0;

void main (void) 
{
	vec2 point = texcoord0/texdim0;	
	vec2 normCoord = vec2(2.0) * point - vec2(1.0);
	/** Modulo on a big num */
	/* was super twirly : */
	/* float noisy = fract(normCoord.x * normCoord.y * time); */
	float noisy = fract(normCoord.x * normCoord.y * time); 
	vec2 texCoord0 = (normCoord / 2.0 + 0.5) * texdim0;
	gl_FragColor = texture2DRect(tex0, texCoord0) * noisy;
} 
