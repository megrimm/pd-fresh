// took this example from
// http://www.lighthouse3d.com/opengl/glsl/index.php?minimal

// ++++++++++++++++++++++++
//	Flatten shader.
// ++++++++++++++++++++++++

//	set the z coordinate to zero prior to applying the modelview transformation
//	gl_Vertex is a predefined variable 
//	that usually goes with gl_ModelViewProjectionMatrix * gl_Vertex

void main(void){	vec4 v = gl_Vertex;
	v.z = 0.;
					gl_Position = gl_ModelViewProjectionMatrix * v;} 