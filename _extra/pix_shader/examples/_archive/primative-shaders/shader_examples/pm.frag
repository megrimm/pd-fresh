// pm.frag - parallax mapping shader

// texture maps
uniform sampler2D colorMap;  // diffuse color
uniform sampler2D glossMap;  // specular color
uniform sampler2D reliefMap; // normal and heigh map

// heigh map scale factor
//  This values is scaled by 0.1 before it is applied!
uniform float heightMapScale;

// effect to use
//  1 == texture mapping
//  2 == normap mapping
//  3 == parallax mapping
//  4 == visualize the height map
//  others == use built-in default
uniform int effectType;


// lighting method:
//  1 == diffuse only
//  2 == specular only
//  others == both
uniform int lightingMethod;

// use lighting values calculated in the vertex shader.
uniform bool vertexLighting;


// shader output
varying vec3 lightDirectionTS;     // normalized fragment-to-light vector in tangent space
varying vec3 eyeDirectionTS;       // normalized fragment-to-eye vector in tangent space
varying vec2 parallaxDirectionTS;  // denormalized parallax direction in tangent space.
varying float diffuseLightingVS;   // vertex shader's diffuse lighting intensity
varying float specularLightingVS;  // vertex shader's specular lighting intensity


//--------------------------------------------------------------------------------------------
// Looks up a normal in the normal map.
// Transform from [0,1] to [-1,1] component range.
// Normal maps have the format ( Nx, Ny, Nz, Unused )
// Relief maps have the format ( Nx, Ny, Nz, Height )
//--------------------------------------------------------------------------------------------

// Normal hacking
//  Because different normal maps have different normal orientations,
//  these coefficients are applied to fix their direction.
//  If you see a surface that is lit on the wrong side, flip the sign here.
const float normalSignX = +1.0;
const float normalSignY = +1.0;

vec4 textureRelief( vec2 texCoord )
{
	// sample the texture
	vec4 value = texture2D( reliefMap, texCoord );

	// transform range
	value = ( value - vec4( 0.5, 0.5, 0.5, 0.0 ) ) * vec4( 2.0, 2.0, 2.0, 1.0 );

	// flip the sign!
	value.x = value.x * normalSignX;
	value.y = value.y * normalSignY;

	return value;
}

// return only the normal component of the relief texture
vec3 textureNormal( vec2 texCoord )
{
	return normalize( textureRelief( texCoord ).xyz );
}

// return only the height sample of the relief texture
float textureHeight( vec2 texCoord )
{
	return texture2D( reliefMap, texCoord ).w;
}


//--------------------------------------------------------------------------------------------
// Computes light for gl_LightSource[0].
//
// texCoord - where to sample normals, diffuse and specular values
// L  - normalized light vector in tangent space.
// V  - normalized view vector in tangent space.
//--------------------------------------------------------------------------------------------

vec4 lighting( vec2 texCoord, vec3 L, vec3 V )
{
	// look up the normal
	vec3 N = textureNormal( texCoord );
	N.y = - N.y; // Hack the Y component...

	vec3 R = - reflect( L, N );

	float NdotL = max( 0.0, dot( N,L ) );
	float VdotR = max( 0.0, dot( V,R ) );

	float Idiff = NdotL;
	float Ispec = pow( VdotR, gl_FrontMaterial.shininess );

	// use vertex lighting onyl...
	if( vertexLighting )
	{
		Idiff = diffuseLightingVS;
		Ispec = specularLightingVS;
	}

	// hack in switches
	if( lightingMethod == 1 ) { Ispec = 0.0; } // diffuse only
	if( lightingMethod == 2 ) { Idiff = 0.0; } // specular only

	return
		gl_FrontMaterial.emission +
		gl_FrontMaterial.ambient * gl_LightModel.ambient +
		gl_FrontMaterial.ambient * gl_LightSource[0].ambient +
		texture2D( colorMap, texCoord ) * gl_LightSource[0].diffuse  * Idiff +
		texture2D( glossMap, texCoord ) * gl_LightSource[0].specular * Ispec;
}


//--------------------------------------------------------------------------------------------
//
// bump mapping
//
//--------------------------------------------------------------------------------------------

vec4 normalMapping( vec2 texCoord )
{
	vec3 L = normalize( lightDirectionTS );
	vec3 V = normalize( eyeDirectionTS );

	return lighting( texCoord, L, V );
}



//--------------------------------------------------------------------------------------------
//
// parallax mapping
//
//--------------------------------------------------------------------------------------------

vec4 parallaxMapping( vec2 texCoord )
{
	// unpack input data
	float h = textureHeight( texCoord );
	vec3 L = normalize( lightDirectionTS );
	vec3 V = normalize( eyeDirectionTS );

	// offset the tex coords
	//    V.z = N dot V, where N is the vertex normal
	h = ( h * heightMapScale*0.1 ) * V.z;
	texCoord = texCoord + V.xy * h;

	// apply normal mapping at the displaced position in tangent space.
	return lighting( texCoord, L, V );
}


//--------------------------------------------------------------------------------------------
//
//	heightmap visualization
//
//--------------------------------------------------------------------------------------------

vec4 visualizeHeightMap( vec2 texCoord )
{
	float h = textureHeight( texCoord );
	return vec4( h,h,h, 1.0 );
}



//--------------------------------------------------------------------------------------------
//
// entry point
//
//--------------------------------------------------------------------------------------------

void main( void )
{
	vec2 texCoord = gl_TexCoord[0].st;

	// texture mapping
	if( effectType == 1 )
	{
		gl_FragColor = texture2D( colorMap, texCoord );
	}

	// bump mapping
	else if( effectType == 2 )
	{
		gl_FragColor = normalMapping( texCoord );
	}

	// parallax mapping
	else if( effectType == 3 )
	{
		gl_FragColor = parallaxMapping( texCoord );
	}

	// visualize height map
	else if( effectType == 4 )
	{
		gl_FragColor = visualizeHeightMap( texCoord );
	}

	// default
	else
	{
		gl_FragColor = parallaxMapping( texCoord );
	}
}




