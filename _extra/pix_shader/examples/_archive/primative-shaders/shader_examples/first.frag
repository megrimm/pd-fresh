uniform sampler2D Tex0, Tex1;

struct LightSourceParameters {
	vec4 position;
	vec4 ambient;
	vec4 diffuse;
	vec4 specular;
	float constantAttenuation;
	float linearAttenuation;
	float quadraticAttenuation;
};
uniform LightSourceParameters LightSource;

varying vec2 FragTexCoord;
varying vec3 ecPos, lightDir;
varying vec3 normal; // XXX: debug
varying float Blur;

void main(void)
{
	vec4 FragColor;

	vec3 n, aux, r;
	float NdotL, RdotE;
	float dist, att;
	vec2 TexCoord;
	float height, scale = 0.025, bias = 0.0125;

	if (texture2D(Tex1, FragTexCoord).a == 1.0) {
		TexCoord = FragTexCoord;
	}
	else {
		height = scale * texture2D(Tex1, FragTexCoord).a - bias;
		TexCoord = FragTexCoord + height * normalize(ecPos).xy;
	}
//	TexCoord = FragTexCoord;

	vec4 normalMap = texture2D(Tex1, TexCoord);
	vec4 colorMap = texture2D(Tex0, TexCoord);

	n = 2.0 * normalMap.rgb - 1.0; // decoding normal map
//	n = normalize(normal);

	dist = length(lightDir);
	lightDir = normalize(lightDir);

	att = 1.0 / (LightSource.constantAttenuation +
                 LightSource.linearAttenuation * dist +
                 LightSource.quadraticAttenuation * dist * dist);

	FragColor = LightSource.ambient * att;

	NdotL = max(dot(n, lightDir), 0.0);

	if (NdotL > 0.0) {
		FragColor += att * (LightSource.diffuse * NdotL);
		r = -reflect(lightDir, n);
		RdotE = max(dot(r, normalize(-ecPos)), 0.0);
		FragColor += att * LightSource.specular * pow(RdotE, 100.0);
	}

	FragColor *= colorMap;
	gl_FragData[0] = vec4(vec3(FragColor), Blur);
}
