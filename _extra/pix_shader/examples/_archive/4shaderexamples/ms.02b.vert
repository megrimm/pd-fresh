// took this example from
// http://www.lighthouse3d.com/opengl/glsl/index.php?minimal

// ++++++++++++++++++++++++
//	Flatten shader.
// ++++++++++++++++++++++++

//	apply a sine function to the z coordinate.
//	gl_Vertex is a predefined variable 
//	that usually goes with gl_ModelViewProjectionMatrix * gl_Vertex

void main(void){	vec4 v = vec4(gl_Vertex);			v.z = sin(5.0*v.x )*0.25;		gl_Position = gl_ModelViewProjectionMatrix * v;} 