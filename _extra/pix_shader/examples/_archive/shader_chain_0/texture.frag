uniform float shader_;
uniform sampler2D texture;

void main(void)
{
	vec2 texCoord = (gl_TexCoord[0].st); // [0.0 ,1.0] x [0.0, 1.0]
	vec2 normCoord = 2.0 * texCoord - 1.0; // [-1.0 ,1.0] x [-1.0, 1.0]

	float r = length(normCoord); // to polar coords
	float phi = atan(normCoord.y, normCoord.x); // to polar coords
	
	if (shader_ == 1.) r = pow(r, 1.0/1.8) * 0.8; // squeeze 
	if (shader_ == 2.) phi = phi + (1.0 - smoothstep(-0.5, 0.5, r)) * 4.0; // twirl 
	if (shader_ == 3.) if (r > 0.5) r = 0.5; // light tunnel 
	if (shader_ == 4.) r = r * smoothstep(-0.1, 0.5, r); // bulge
	if (shader_ == 5.) r = 2.0 * r - r * smoothstep(0.0, 0.7, r); // dent 
	if (shader_ == 6.) r = r * r / sqrt(2.0); // fish eye 

	normCoord.x = r * cos(phi);
	normCoord.y = r * sin(phi);

	if (shader_ == 7.) // stretch
	{
		vec2 s = sign(normCoord);
		normCoord = abs(normCoord);
		normCoord = 0.5 * normCoord + 0.5 * smoothstep(0.25, 0.5, normCoord) * normCoord;
		normCoord = s * normCoord;
	}
	if (shader_ == 8.) normCoord.x =  normCoord.x * sign(normCoord.x); // mirror

	texCoord = normCoord / 2.0 + 0.5; // [0.0 ,1.0] x [0.0, 1.0]
	gl_FragColor = texture2D(texture, texCoord);
}



