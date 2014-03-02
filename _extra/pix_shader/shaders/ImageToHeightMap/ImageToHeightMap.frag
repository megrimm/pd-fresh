varying vec2 texcoord0;

uniform sampler2DRect tex0;
uniform vec2 imageSize;
uniform float coef;

const vec4 lumcoeff = vec4(0.299,0.587,0.114,0.);

void main (void)
{
	
	vec4 pixel = texture2DRect(tex0, texcoord0);
	float luma = dot(lumcoeff, pixel);
	
	gl_FragColor =  vec4((texcoord0.x  / imageSize.x), luma, (texcoord0.y / imageSize.y) , 1.0);
}