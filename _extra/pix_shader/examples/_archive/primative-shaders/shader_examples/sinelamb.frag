varying vec3 normal;
varying vec4 pos;
uniform float time;

#define PI 3.141592653

void main() {
	float scale = 10.0;
	vec4 tp = gl_TexCoord[0] * scale;
	float x = pow(sin(tp.t * PI) * 0.5 + 0.5, 4.0);
	float y=0.1;
	vec4 matdiffcol= gl_FrontMaterial.diffuse;
	vec4 othercolor = vec4( vec3(1.0)-((vec3(1.0)-matdiffcol.rgb)*y), 1.0);
	//vec4 color = mix(vec4(1.0, 1.0, 1.0, 1.0), matdiffcol, x);
	vec4 color = mix(othercolor, matdiffcol, x);
	vec4 matspec = gl_FrontMaterial.specular;
	float shininess = gl_FrontMaterial.shininess;
	vec4 lightspec = gl_LightSource[0].specular;
	vec4 lpos = gl_LightSource[0].position;
	vec4 s = -normalize(pos-lpos); 	//not sure why this needs to 
									// be negated, but it does.
	vec3 light = s.xyz;
	vec3 n = normalize(normal);
	vec3 r = -reflect(light, n);
	r = normalize(r);
	vec3 v = -pos.xyz; // We are in eye coordinates,
					   // so the viewing vector is
					   // [0.0 0.0 0.0] - pos
	v = normalize(v);
	
	vec4 diffuse  = color * max(0.0, dot(n, s.xyz)) * gl_LightSource[0].diffuse;
	vec4 specular;
	if (shininess != 0.0) {
		specular = lightspec * matspec * pow(max(0.0, dot(r, v)), shininess);

	} else {
		specular = vec4(0.0, 0.0, 0.0, 0.0);
	}
	
	gl_FragColor = diffuse + specular;
	//gl_FragColor=color;
//	gl_FragColor = noise4(pos) != 0.0 ? vec4(1.0, 0.0, 0.0, 1.0) : vec4(0.0, 0.0, 1.0, 1.0);

}
