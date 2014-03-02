/* pm.vert - parallax mapping vertex shader component */


// Application provided tangent space vectors.
// These vectors are normalized.
attribute vec3 attrTangent;
attribute vec3 attrBitangent;


// shader output
varying vec3 lightDirectionTS;     // normalized fragment-to-light vector in tangent space
varying vec3 eyeDirectionTS;       // normalized fragment-to-eye vector in tangent space
varying vec2 parallaxDirectionTS;  // denormalized parallax direction in tangent space.
varying float diffuseLightingVS;   // vertex shader's diffuse lighting intensity
varying float specularLightingVS;  // vertex shader's specular lighting intensity


//--------------------------------------------------------------------------------------------
//
//	Support for GLSL versions < 120
//
//--------------------------------------------------------------------------------------------

mat3 transpose3x3( mat3 m )
{
	vec3 a,b;

	a.xy = m[0].yz;  // column 0, lower
	a.z  = m[1].z;   // column 1, lower
	b.x  = m[1].x;   // column 1, upper
	b.yz = m[2].xy;  // column 2, upper

	m[0].yz = b.xy;
	m[1].z  = b.z;
	m[1].x  = a.x;
	m[2].xy = a.yz;

	return m;
}


//--------------------------------------------------------------------------------------------
// computes lighting for light source 0.
//--------------------------------------------------------------------------------------------

void lighting( void )
{
	vec3 V = ( gl_ModelViewMatrix * gl_Vertex ).xyz;
	vec3 L = normalize( gl_LightSource[0].position.xyz - V );
	vec3 N = normalize( gl_NormalMatrix * gl_Normal );

	V = normalize( -V );
	vec3 R = - reflect( L, N );

	float NdotL = max( 0.0, dot( N,L ) );
	float VdotR = max( 0.0, dot( V,R ) );

	diffuseLightingVS  = NdotL;
	specularLightingVS = pow( VdotR, gl_FrontMaterial.shininess );
}


//--------------------------------------------------------------------------------------------
// entry point
//--------------------------------------------------------------------------------------------

void main( void )
{
	// pass through attributes.
	gl_Position = ftransform();
	gl_TexCoord[0] = gl_MultiTexCoord0;
	gl_FrontColor = gl_Color;

	// pass through vertex lighting
	lighting();

	mat3 tangentBasis = mat3( attrTangent, attrBitangent, gl_Normal );

	// setup tangent-to-eye matrix.
	mat3 eyeToTangentMatrix = transpose3x3( gl_NormalMatrix * tangentBasis );

	// vertex position in eye space
	vec3 vertexPositionEYE = ( gl_ModelViewMatrix * gl_Vertex ).xyz;
	vec3 lightDirectionEYE = gl_LightSource[0].position.xyz - vertexPositionEYE.xyz;

	// transform into tangent space
	lightDirectionTS = normalize( eyeToTangentMatrix * lightDirectionEYE );
	eyeDirectionTS   = normalize( eyeToTangentMatrix * vertexPositionEYE ) * -1.0;
}
