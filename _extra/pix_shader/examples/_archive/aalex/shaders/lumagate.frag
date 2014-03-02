/** 
 * luma gate 
 * from http://www.cycling74.com/story/2007/5/23/181113/507
 */
 
/* luma threshold */
uniform vec2 lum;

uniform sampler2DRect tex0;
varying vec2 texcoord0;
varying vec2 texdim0;
const vec4 lumcoeff = vec4(0.299,0.587,0.114,0.);

void main()
{
	vec4 texel = texture2DRect(tex0, texcoord0);

	/* calculate our luminance */
	float luminance = dot(texel, lumcoeff);
	/* float step(float,float)
	returns a "1." if the second value is greater than the first (edge) value, and a "0." if it is less than or equal to the edge value.
	*/
	/* compare to the thresholds */
	float is_higher_than_min = step(lum[0],luminance);
	float is_lower_than_max = step(luminance,lum[1]);
	
	/* combine the comparisons */
	float amask = is_higher_than_min * is_lower_than_max;

	/* output texture with alpha-mask */
	gl_FragColor = vec4(texel.rgb,amask);
}
