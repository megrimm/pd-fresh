uniform float frequency;
uniform float amplitude;
uniform float offset;

uniform sampler2DRect tex0;
varying vec2 texcoord0;
varying vec2 texdim0;

void main (void) 
{ 
	vec2 point = texcoord0/texdim0;	
	vec2 normCoord = vec2(2.0) * point - vec2(1.0);
	
	normCoord.x += cos(normCoord.y * frequency + offset) * amplitude;
	
	vec2 texCoord0 = (normCoord / 2.0 + 0.5) * texdim0;
	gl_FragColor = texture2DRect(tex0, texCoord0);
} 
