uniform float coeff;

uniform sampler2DRect tex0;

varying vec2 texcoord0;
varying vec2 texdim0;

void main(void) 
{ 
	vec2 my_texcoord0 = gl_TexCoord[0].st;
    vec2 my_texdim0 = vec2(abs(gl_TextureMatrix[0][0][0]), abs(gl_TextureMatrix[0][1][1]));
	vec2 point = my_texcoord0/my_texdim0;
	//vec2 normCoord = vec2(2.0) * point - vec2(1.0);
	
	//...
	
	//vec2 texCoord0 = (normCoord / 2.0 + 0.5) * texdim0;
	//gl_FragColor = texture2DRect(tex0, texCoord0);
	gl_FragColor = vec4(point.xy * coeff, 1.0, 1.0);
} 
