uniform vec2 width;
uniform vec2 offset;

uniform sampler2DRect tex0;


varying vec2 texcoord0;
varying vec2 texdim0;

void main (void) 
{ 
		
	vec2 point = abs(mod((texcoord0/texdim0),1.));//normalize coordinates
	
	vec2 normCoord = vec2(2.0) * point - vec2(1.0);

	vec2 s = sign(normCoord);
	normCoord = abs(normCoord);

	normCoord = mod(normCoord+offset,width);
	normCoord = s * normCoord;
	
	
	
	vec2 texCoord = (normCoord / 2.0 + 0.5) * texdim0;
	gl_FragColor = texture2DRect(tex0, texCoord);
	
} 
