// bumpmap.frag - bump mapping fragment shader

// texture maps
uniform sampler2D normalMap;
uniform sampler2D colorMap;
uniform sampler2D glossMap;

// lighting method:
// 1 == diffuse only
// 2 == specular only
// others == diffuse + specular
uniform int lightingMethod;

// disable textures
uniform bool disableTextures;


// vertex shader output
varying vec3 position; // fragment position in eye space
varying vec3 normal;   // fragment normal in eye space.
varying mat3 tangentToEyeMatrix;


//
// Looks up a normal in the normal map.
// Transform from [0,1] to [-1,1] component range.
// Transforms the normal into eye space.
//
vec3 getTextureNormal( void )
{
	// sample the texture
	vec3 value = texture2D( normalMap, gl_TexCoord[0].st ).xyz;

	// transform range
	value = 2.0 * ( value - vec3( 0.5, 0.5, 0.5 ) );

	// change coordinate system
	return tangentToEyeMatrix * value;
}


//
// computes light of a single light source.
//
// N  - normalized normal.
// V  - fragment position in eye space.
// Cd - diffuse material color.
// Cs - specular material color.
//
vec4 lightSource( vec3 N, vec3 V, gl_LightSourceParameters light, vec4 Cd, vec4 Cs )
{
	float d = length( light.position.xyz - V );
	vec3  L = normalize( light.position.xyz - V );
	vec3  H = normalize( L + vec3( 0.0, 0.0, 1.0 ) ); // eye at (0,0,infinity)
//	vec3  H = normalize( L - V.xyz ); // eye at (0,0,0)

	float NdotL = max( 0.0, dot( N,L ) );
	float NdotH = max( 0.0, dot( N,H ) );

	float Idiff = NdotL;
	float Ispec = pow( NdotH, gl_FrontMaterial.shininess );

	// hack in switches
	if( lightingMethod == 1 ) { Ispec = 0.0; } // diffuse only
	if( lightingMethod == 2 ) { Idiff = 0.0; } // specular only

	return
		gl_FrontMaterial.ambient * light.ambient +
		Cd * light.diffuse  * Idiff +
		Cs * light.specular * Ispec;
}


//
// computes light of all light sources and the scene.
// N  - normalized fragment normal.
// Cd - diffuse material color.
// Cs - specular material color.
//
vec4 lighting( vec3 N, vec4 Cd, vec4 Cs )
{
	return
		gl_FrontMaterial.emission +
		gl_FrontMaterial.ambient * gl_LightModel.ambient +
		lightSource( N, position, gl_LightSource[0], Cd, Cs );
}


//
// entry point
//
void main( void )
{
	// per pixel lighting with interpolated vertex normal.
	if( disableTextures )
	{
		gl_FragColor = lighting( normalize( normal ),
								 gl_FrontMaterial.diffuse,
								 gl_FrontMaterial.specular );
	}
	// per pixel lighting with texture normal
	else
	{
		gl_FragColor = lighting( getTextureNormal(),
								 texture2D( colorMap, gl_TexCoord[0].st ),
								 texture2D( glossMap, gl_TexCoord[0].st ) );
	}
}




