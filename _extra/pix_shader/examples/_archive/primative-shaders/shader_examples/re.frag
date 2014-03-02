// from the Orange Book 2nd edition

varying vec3 Reflect;
varying vec3 Refract;
uniform float Ratio;

uniform sampler2D MyTex;

void main (void)
{
vec3 refractColor = vec3(texture2D( MyTex, Refract));
vec3 reflectColor = vec3(texture2D( MyTex, Reflect));

vec3 color = mix(refractColor, reflectColor, Ratio);

gl_FragColor = vec4(color, 1.0);
}

