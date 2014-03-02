/**
charmap-style color lookup
Andrew Benson - andrewb@cycling74.com
Copyright 2006 - Cycling '74
fragment shader for charmap-style Color LUT
*/

/* setup for 2 texture */
varying vec2 texcoord0;
varying vec2 texcoord1;

uniform sampler2DRect tex0;
uniform sampler2DRect tex1;

/* wipe state: 0 */
uniform int interp;
/* size of color map: 256. */
uniform float mapdim;
/* mix amount: 1. */
uniform float amt;

void main()
{   
	vec4 a = texture2DRect(tex0, texcoord0);
	/* multiply color value for LUT range */
	vec4 set = mix(floor(a*mapdim), a*mapdim, float(interp));
	/* look up red */
	float rout = float (texture2DRect(tex1, vec2(set.r,0.)).r);
	/* look up green */
	float gout = float (texture2DRect(tex1, vec2(set.g,0.)).g);
	/* look up blue */
	float bout = float (texture2DRect(tex1, vec2(set.b,0.)).b);
	vec4 mapped = vec4 (rout,gout,bout,a.a);
	
	gl_FragColor = mix(a,mapped,amt);
}
