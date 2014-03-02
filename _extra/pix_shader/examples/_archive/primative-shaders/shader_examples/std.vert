/* std.vert - basic transformation, no lighting */


// Application provided tangent space vectors.
// These vectors are normalized.
attribute vec3 attrTangent;
attribute vec3 attrBitangent;


// shader output
varying mat3 tangentToEyeMatrix;
varying vec3 position; // vertex position in eye space.
varying vec3 normal;   // vertex normal in eye space.


//
// entry point
//
void main( void )
{
	// pass through attributes.
	gl_Position = ftransform();
	gl_TexCoord[0] = gl_MultiTexCoord0;
	gl_FrontColor = gl_Color;

	// pass vertex attributes to the fragment shader.
	normal = gl_NormalMatrix * gl_Normal;
	position = ( gl_ModelViewMatrix * gl_Vertex ).xyz;

	// setup tangent-to-eye matrix.
	tangentToEyeMatrix[0] = gl_NormalMatrix * attrTangent;
	tangentToEyeMatrix[1] = gl_NormalMatrix * attrBitangent;
	tangentToEyeMatrix[2] = gl_NormalMatrix * gl_Normal;
}
