uniform sampler2DRect tex0;
varying vec2 texcoord0;
varying vec2 texdim0;

void main (void) 
{ 
	vec2 point = texcoord0/texdim0;	
	vec2 normCoord = vec2(2.0) * point - vec2(1.0); /* normalize [0,1] */
	
	vec4 tmp_color = texture2DRect(tex0, texcoord0);
	
	/*
	float tmp_alpha = length(vec2(normCoord.x, normCoord.y));
	gl_FragColor = vec4(gl_FragColor.rgb, tmp_alpha);
	*/
	gl_FragColor = vec4(tmp_color.rgb, normCoord.x);
} 



/* float tmp_alpha = length(vec2(normCoord.x + offset_x, normCoord.y + offset_y)) * dimen; */