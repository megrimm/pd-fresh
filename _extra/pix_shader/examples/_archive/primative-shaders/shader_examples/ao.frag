varying float ambient_occlusion_term;

void main (void)
{
	vec4 vAmbient = vec4(0.9, 0.9, 0.9, 1.0);
	vAmbient.rgb *= ambient_occlusion_term;
	gl_FragColor = vAmbient; 
}
