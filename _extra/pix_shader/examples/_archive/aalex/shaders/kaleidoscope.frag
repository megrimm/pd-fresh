

varying vec2 texcoord0;
varying vec2 texdim0;
uniform vec2 size;
uniform vec2 scale;
uniform vec2 offset;
uniform vec2 origin;
uniform float div;  
uniform sampler2DRect tex0;
const float pi=3.1415926;

void main()
{
	vec2 point = abs(mod((texcoord0*scale)/texdim0+origin,1.));

	vec2 dt = point-0.5;
	float radius = sqrt(dot(dt,dt));
	float theta = atan(dt.y,dt.x)+pi;
	float phi = 2.*pi/div;

	float modtheta = mod(abs(theta),phi*2.);
	float foldtheta = phi-abs(modtheta-phi);

	vec2 no = vec2(-cos(foldtheta)*radius, -sin(foldtheta)*radius);	
	no = (no+0.5)*texdim0;

	vec2 off = abs(no+offset*texdim0);
	vec2 modoff = mod(off,texdim0*2.);
	vec2 fold = texdim0-abs(modoff-texdim0);

	gl_FragColor = texture2DRect(tex0,fold);
}