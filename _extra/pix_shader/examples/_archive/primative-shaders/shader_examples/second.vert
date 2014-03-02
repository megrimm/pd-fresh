uniform mat4 ModelViewMatrix;
uniform mat4 ProjectionMatrix;

attribute vec4 Vertex;
attribute vec3 Needed; // Between Vertex and TexCoord
attribute vec2 TexCoord;

varying vec2 FragTexCoord;

void main(void)
{
	vec3 useless = normalize(Needed); // No texture fecth w/o a useless normalization of an attribute
	gl_Position = ProjectionMatrix * ModelViewMatrix * Vertex;
	FragTexCoord = vec2(1.0, -1.0) * TexCoord;
}
