varying vec2 texcoord0;
varying vec2 texdim0;

uniform sampler2DRect tex0;

uniform vec4 srcdim;
uniform vec4 dstdim;
uniform float interp;

void main()
{
	vec4 sm = clamp(srcdim,0.,1.)*vec4(texdim0.xyxy);
	vec4 dm = dstdim*vec4(texdim0.xyxy);

	//redefine texcoords based on dstdim
	vec2 scale = vec2(dm.zw-dm.xy);
	vec2 off = vec2(texcoord0-dm.xy);

	//normalize texcoords using dstdim
	vec2 norm = vec2(off/scale);
	
	//define range of srcdim
	vec2 range = vec2 (sm.z-sm.x,sm.w-sm.y);

	//set to new range using srcdim_xy as offset
	vec2 use = vec2 (norm*range+sm.xy);
	bool bnd = all(bvec4(texcoord0.x>dm.x,texcoord0.x<dm.z,texcoord0.y>dm.y,texcoord0.y<dm.w));
	
	gl_FragColor = texture2DRect(tex0,mix(floor(use),use,interp))*float(bnd);
}
