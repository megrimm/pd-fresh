/**
 * Author : Alexandre Quessy
 * Inspiration: Claudius Maximus and Vade
 */
uniform float frequency_x;
uniform float frequency_y;
uniform float amplitude_x;
uniform float amplitude_y;
uniform float offset_x;
uniform float offset_y;

uniform sampler2DRect tex0;
varying vec2 texcoord0;
varying vec2 texdim0;

void main (void) 
{ 
	vec2 point = texcoord0/texdim0;	
	vec2 normCoord = vec2(2.0) * point - vec2(1.0);
	
	normCoord.x += cos(normCoord.y * frequency_x + offset_x) * amplitude_x;
	normCoord.y += sin(normCoord.x * frequency_y + offset_y) * amplitude_y;
	
	normCoord.x += cos(normCoord.y * frequency_x * 2.0 + offset_x) * amplitude_x * 0.5;
	normCoord.y += sin(normCoord.x * frequency_y * 2.0 + offset_y) * amplitude_y * 0.5;
	
	normCoord.x += cos(normCoord.y * frequency_x * 4.0 + offset_x) * amplitude_x * 0.25;
	normCoord.y += sin(normCoord.x * frequency_y * 4.0 + offset_y) * amplitude_y * 0.25;
	
	normCoord.x += cos(normCoord.y * frequency_x * 8.0 + offset_x) * amplitude_x * 0.125;
	normCoord.y += sin(normCoord.x * frequency_y * 8.0 + offset_y) * amplitude_y * 0.125;
	
	vec2 texCoord0 = (normCoord / 2.0 + 0.5) * texdim0;
	gl_FragColor = texture2DRect(tex0, texCoord0);
} 
