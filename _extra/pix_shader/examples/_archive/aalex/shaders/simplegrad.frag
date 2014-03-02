uniform float coefficient;
uniform sampler2DRect tex0;

varying vec2 texcoord0;
varying vec2 texdim0;

void main (void) 
{
	vec2 normCoord = vec2(2.0) * (texcoord0) - vec2(1.0);
	
	vec4 tmp_color = texture2DRect(tex0, texcoord0);
	gl_FragColor = vec4(tmp_color.r,tmp_color.g,tmp_color.b, normCoord.x * coefficient);
}
