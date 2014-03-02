/** varying variables are also interpolated */
varying vec3 vertex_pos; // xyz
//uniform vec3 start_pos;
//uniform vec4 end_pos;

void main()
{
	//gl_FragColor = vec4(1.0, 0.8, 0.2, vertex_pos.x);
	
	gl_FragColor = vec4(gl_Color.rgb, vertex_pos.x);
	
}
