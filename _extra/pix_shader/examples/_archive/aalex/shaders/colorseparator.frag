uniform vec2 redoffset;
uniform vec2 greenoffset;
uniform vec2 blueoffset;

uniform sampler2DRect tex0;

varying vec2 texcoord0;
varying vec2 texdim0;

void main (void) 
{ 		
	vec2 redzoomtvec = mod((texcoord0/texdim0) + redoffset, 1.0);
	vec2 greezoomvec = mod((texcoord0/texdim0) + greenoffset, 1.0);
	vec2 bluezoomvec = mod((texcoord0/texdim0) + blueoffset, 1.0);
	
	vec4 redinput0 = texture2DRect(tex0, redzoomtvec * texdim0);
	vec4 greeninput0 = texture2DRect(tex0, greezoomvec * texdim0);
	vec4 blueinput0 = texture2DRect(tex0, bluezoomvec * texdim0);
	
	gl_FragColor = vec4(redinput0.r , greeninput0.g, blueinput0.b, 1.0);
}
