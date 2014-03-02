/**
 * Author : Alexandre Quessy
 * Inspiration: Jitter ripples shader and Vade
 */
 
/** freq, amp, time, size */
/** pos (x,y) */

uniform vec4 a_fats;
uniform vec2 a_pos;
uniform vec4 b_fats;
uniform vec2 b_pos;
uniform vec4 c_fats;
uniform vec2 c_pos;
uniform vec4 d_fats;
uniform vec2 d_pos;

uniform sampler2DRect tex0;
varying vec2 texcoord0;
varying vec2 texdim0;

void main (void) 
{ 
	/* norm coords */
	vec2 point = texcoord0/texdim0;	
	vec2 normCoord = vec2(2.0) * point - vec2(1.0);
	
	/* get distance */
	vec2 dist = sqrt(normCoord.y*normCoord.y + normCoord.x*normCoord.x);
	float cosangle = P0 / radius;
    float sinangle = P1 / radius;
    
	normCoord.x += cos(normCoord.y * a_fats[0] + offset_x) * amplitude_x;
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
