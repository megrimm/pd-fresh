
uniform sampler2D gradperm;

varying vec2 pos;
varying vec4 basecolor;

#define ONE 0.00390625
#define ONEHALF 0.001953125


float fade(float t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float gnoise(vec2 P)
{
	P = mod(P, vec2(256));
	vec2 Pi = ONE*floor(P)+ONEHALF;
	vec2 Pf = fract(P);

	vec2 grad00 = texture2D(gradperm, Pi).rg * 4.0 - 1.0;
	float n00 = dot(grad00, Pf);

	vec2 grad10 = texture2D(gradperm, Pi + vec2(ONE, 0.0)).rg * 4.0 - 1.0;
	float n10 = dot(grad10, Pf - vec2(1.0, 0.0));

	vec2 grad01 = texture2D(gradperm, Pi + vec2(0.0, ONE)).rg * 4.0 - 1.0;
	float n01 = dot(grad01, Pf - vec2(0.0, 1.0));

	vec2 grad11 = texture2D(gradperm, Pi + vec2(ONE, ONE)).rg * 4.0 - 1.0;
	float n11 = dot(grad11, Pf - vec2(1.0, 1.0));

	vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade(Pf.x));

	float n_xy = mix(n_x.x, n_x.y, fade(Pf.y));

	return n_xy;
}

void main( void )
{
	float n = gnoise(pos + 240.0);
	n = clamp(n, -1.0, 1.0);
	gl_FragColor = basecolor * vec4(0.5 + 0.5 * vec3(n, n, n), 1.0);
}
