/** varying variables are also interpolated */
varying vec3 vertex_color;

void main() 
{
	/* vertex_color = gl_Vertex.xyz; */
	vec4 tmp = ftransform();
	vertex_color = tmp.xyz;
	gl_Position = tmp;
}
