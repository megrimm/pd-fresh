// took this example from
// http://www.lighthouse3d.com/opengl/glsl/index.php?minimal

// ++++++++++++++++++++++++
//	A basic vertex shader.
// ++++++++++++++++++++++++

//	uses predefined uniform variables:
//	uniform mat4 gl_ModelViewMatrix;//	uniform mat4 gl_ProjectionMatrix;
//	attribute vec4 gl_Vertex;
//	In order to output the transformed vertex, the shader *must* write 
//	to the also predefined variable "gl_Position", declared as a vec4

/*
void main(){		gl_Position = gl_ProjectionMatrix * gl_ModelViewMatrix * gl_Vertex;
}
*/

// but there is also a predefined vector called gl_ModelViewProjectionMatrix
// it is the product of gl_ProjectionMatrix * gl_ModelViewMatrix

/*
void main(){	
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;}
*/

// but there is a even more efficient way to do the exact same thing as the above,
// it is a fixed function called ftransform().

void main()
{
	gl_Position = ftransform();}