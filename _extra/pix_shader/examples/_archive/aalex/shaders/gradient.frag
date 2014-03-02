uniform float ratio;

uniform sampler2DRect tex0;
varying vec2 texcoord0;
varying vec2 texdim0;

void main (void) 
{ 
	vec2 point = texcoord0/texdim0;	
	vec2 normCoord = vec2(2.0) * point - vec2(1.0);
	
	float x_alpha = abs(0.5 - normCoord.x);
	float y_alpha = abs(0.5 - normCoord.y);
	float f_alpha = x_alpha + y_alpha;
	
	vec2 texCoord0 = (normCoord / 2.0 + 0.5) * texdim0;
	vec4 final_color = texture2DRect(tex0, texCoord0);
	gl_FragColor = vec4(final_color.rgb, f_alpha);
} 
