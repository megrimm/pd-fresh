#define ONE 0.00390625
#define ONEHALF 0.001953125

uniform sampler2DRect tex0;

varying vec2 texcoord0;
varying vec2 texdim0;

float fade(float t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float noise(vec2 P)
{
  vec2 Pi = ONE*floor(P)+ONEHALF; // Integer part, scaled and offset for texture lookup
  vec2 Pf = fract(P);             // Fractional part for interpolation

  vec2 grad00 = texture2D(tex0, Pi).rg * 4.0 - 1.0;
  float n00 = dot(grad00, Pf);

  vec2 grad10 = texture2D(tex0, Pi + vec2(ONE, 0.0)).rg * 4.0 - 1.0;
  float n10 = dot(grad10, Pf - vec2(1.0, 0.0));

  vec2 grad01 = texture2D(tex0, Pi + vec2(0.0, ONE)).rg * 4.0 - 1.0;
  float n01 = dot(grad01, Pf - vec2(0.0, 1.0));

  vec2 grad11 = texture2D(tex0, Pi + vec2(ONE, ONE)).rg * 4.0 - 1.0;
  float n11 = dot(grad11, Pf - vec2(1.0, 1.0));

  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade(Pf.x));

  float n_xy = mix(n_x.x, n_x.y, fade(Pf.y));

  return n_xy;
}


void main (void)
{
  float n = noise(tex0 * 32.0 + 240.0);
  gl_FragColor = vec4(vec3(n, n, n), 1.0);
}
