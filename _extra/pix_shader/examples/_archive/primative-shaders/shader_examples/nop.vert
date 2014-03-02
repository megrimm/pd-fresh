// nop.vert - does nothing, but passes through ALL vertex attribs.
//
// This might be useful, if you need model/eye-space vertices in the geometry shader.
//

// Application provided tangent space vectors.
// These vectors are normalized.
attribute vec3 attrTangent;
attribute vec3 attrBitangent;

// output
varying vec3 normal;  // generic vertex normal
varying mat3 tangentToEyeMatrix;

//
// entry point
//
void main( void )
{
	// DON'T transform
	gl_Position = gl_Vertex;
	normal = gl_Normal;
	tangentToEyeMatrix[0] = attrTangent;
	tangentToEyeMatrix[1] = attrBitangent;
	tangentToEyeMatrix[2] = gl_Normal;

	gl_FrontColor = gl_Color;
	gl_TexCoord[0] = gl_MultiTexCoord0;
}

