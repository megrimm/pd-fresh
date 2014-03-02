
uniform sampler2D permTexture;

uniform float time;

varying vec2 v_texCoord2D;
varying vec4 v_color;

#define ONE 0.00390625
#define ONEHALF 0.001953125

float fade(float t)
{
	return t*t*t*(t*(t*6.0-15.0)+10.0);
}


float noise(vec2 P)
{
	vec2 Pi = ONE*floor(P)+ONEHALF; 
	vec2 Pf = fract(P);

	vec2 grad00 = texture2D(permTexture, Pi).rg * 4.0 - 1.0;
	float n00 = dot(grad00, Pf);

	vec2 grad10 = texture2D(permTexture, Pi + vec2(ONE, 0.0)).rg * 4.0 - 1.0;
	float n10 = dot(grad10, Pf - vec2(1.0, 0.0));

	vec2 grad01 = texture2D(permTexture, Pi + vec2(0.0, ONE)).rg * 4.0 - 1.0;
	float n01 = dot(grad01, Pf - vec2(0.0, 1.0));

	vec2 grad11 = texture2D(permTexture, Pi + vec2(ONE, ONE)).rg * 4.0 - 1.0;
	float n11 = dot(grad11, Pf - vec2(1.0, 1.0));

	vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade(Pf.x));

	float n_xy = mix(n_x.x, n_x.y, fade(Pf.y));

	return n_xy;
}


float snoise(vec2 P) {

#define F2 0.366025403784
#define G2 0.211324865405

  float s = (P.x + P.y) * F2; 
  vec2 Pi = floor(P + s);
  float t = (Pi.x + Pi.y) * G2;
  vec2 P0 = Pi - t; 
  Pi = Pi * ONE + ONEHALF; 

  vec2 Pf0 = P - P0;

  vec2 o1;
  if(Pf0.x > Pf0.y) o1 = vec2(1.0, 0.0);  
  else o1 = vec2(0.0, 1.0);               

  vec2 grad0 = texture2D(permTexture, Pi).rg * 4.0 - 1.0;
  float t0 = 0.5 - dot(Pf0, Pf0);
  float n0;
  if (t0 < 0.0) n0 = 0.0;
  else {
    t0 *= t0;
    n0 = t0 * t0 * dot(grad0, Pf0);
  }

  vec2 Pf1 = Pf0 - o1 + G2;
  vec2 grad1 = texture2D(permTexture, Pi + o1*ONE).rg * 4.0 - 1.0;
  float t1 = 0.5 - dot(Pf1, Pf1);
  float n1;
  if (t1 < 0.0) n1 = 0.0;
  else {
    t1 *= t1;
    n1 = t1 * t1 * dot(grad1, Pf1);
  }
  
  vec2 Pf2 = Pf0 - vec2(1.0-2.0*G2);
  vec2 grad2 = texture2D(permTexture, Pi + vec2(ONE, ONE)).rg * 4.0 - 1.0;
  float t2 = 0.5 - dot(Pf2, Pf2);
  float n2;
  if(t2 < 0.0) n2 = 0.0;
  else {
    t2 *= t2;
    n2 = t2 * t2 * dot(grad2, Pf2);
  }

  return 70.0 * (n0 + n1 + n2);
}

void main( void )
{
	float n = snoise(v_texCoord2D * 16.0 + time);
	gl_FragColor = v_color * vec4(0.5 + 0.5 * vec3(n, n, n), 1.0);
}

