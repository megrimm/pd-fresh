varying vec2 s1Coord;
varying vec2 s2Coord;
varying vec2 s3Coord;
uniform sampler2DRect tex0;

uniform float coef;
const vec4 lumcoeff = vec4(0.299,0.587,0.114,0.);

void main(void)
{

			// Determine the offsets
			//float2 o1 = float2( vPixelSize.x, 0.0f         );
			//float2 o2 = float2( 0.0f,         vPixelSize.y );

			// Take three samples to determine two vectors that can be
			// use to generate the normal at this pixel
			float h0 = dot(lumcoeff, texture2DRect( tex0, s1Coord ));
			float h1 = dot(lumcoeff, texture2DRect( tex0, s2Coord ));
			float h2 = dot(lumcoeff, texture2DRect( tex0, s3Coord ));
						
			vec3 v01 = vec3( s2Coord.x, h1 - h0, s2Coord.y );
			vec3 v02 = vec3( s3Coord.x, h2 - h0, s3Coord.y );

			vec3 n = cross( v02, v01 );

			// Can be useful to scale the Z component to tweak the
			// amount bumps show up, less than 1.0 will make them
			// more apparent, greater than 1.0 will smooth them out
			n.y *= coef;

			gl_FragColor =  vec4(normalize( n ), 1.0);

}