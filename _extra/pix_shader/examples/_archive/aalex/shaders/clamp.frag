uniform vec2 clamp;
uniform vec2 width;
uniform vec2 origin;

uniform sampler2DRect tex0;

varying vec2 texcoord0;
varying vec2 texdim0;

void main (void) 
{ 		
	vec2 point = texcoord0 / texdim0; //normalize coordinates 0. 1.
	
	vec2 modclamp = mod(clamp, 1.);
	
	if (point.x >= modclamp.x && point.x <= modclamp.x + width.x) 
	{
		point.x = modclamp.x;
	}
	
	if (point.y>= modclamp.y && point.y <= modclamp.y + width.y) 
	{
		point.y = modclamp.y;
	}
	
	point = abs(mod(point + origin, 1.0));
	
	vec2 texCoord = point * texdim0;
	gl_FragColor = texture2DRect(tex0, texCoord);
} 
