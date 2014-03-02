varying vec3 normal;
varying vec4 pos;
varying vec4 rawpos;
varying float added;
uniform float time;

float noise(vec2 P);
float noise(vec3 P);
float noise(vec4 P);

void main() {
	normal = gl_NormalMatrix * gl_Normal;
	vec4 posit = ftransform();
	added = (1.0 - abs(noise(vec4(gl_Vertex.xyz, time))));
	posit.y += (added * 3.0) - 1.5;
	gl_Position = posit;
	pos = posit;
	rawpos = gl_Vertex;
	gl_TexCoord[0] = gl_TextureMatrix[0] * gl_MultiTexCoord0;
}