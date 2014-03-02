uniform mat4 ModelViewMatrix;
uniform mat4 NormalMatrix;
uniform mat4 ProjectionMatrix;

attribute vec4 Vertex;
attribute vec3 Normal;
attribute vec2 TexCoord;
attribute vec3 Tangent;

varying vec2 FragTexCoord;

struct LightSourceParameters {
	vec4 position;
	vec4 ambient;
	vec4 diffuse;
	vec4 specular;
	float constantAttenuation;
	float linearAttenuation;
	float quadraticAttenuation;
};
uniform LightSourceParameters LightSource;

varying vec3 ecPos, lightDir;
varying vec3 normal; // XXX: debug
uniform float focalDistance, focalRange;
varying float Blur;

void main(void)
{
	ecPos = vec3(ModelViewMatrix * Vertex);
	Blur = clamp(abs(-ecPos.z - focalDistance) / focalRange, 0.0, 1.0);
	
	normal = normalize(vec3(NormalMatrix * vec4(Normal, 0.0)));
	vec3 tangent = normalize(vec3(NormalMatrix * vec4(Tangent, 0.0)));

	// Gram-Schmidt Orthonormalization
	tangent -= normal * dot(tangent, normal);
	tangent = normalize(tangent);

	vec3 binormal = cross(normal, tangent);
	mat3 tbnMatrix = mat3(tangent, binormal, normal);

	lightDir = LightSource.position.xyz - ecPos; // XXX: investigate Vertex Z axis
	lightDir = tbnMatrix * lightDir;
	ecPos = tbnMatrix * ecPos;
	normal = tbnMatrix * normal; // XXX: debug

	gl_Position = ProjectionMatrix * ModelViewMatrix * Vertex;
	FragTexCoord = vec2(1.0, -1.0) * TexCoord;
}

