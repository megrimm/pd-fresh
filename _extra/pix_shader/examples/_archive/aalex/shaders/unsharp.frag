const int maxKernelSize = 25;

uniform vec2 offset[maxKernelSize];
uniform int kernelSize;
uniform vec4 kernelValue[maxKernelSize];
uniform vec4 scaleFactor;
uniform sampler2D baseImage;

void main()
{
	int i;
	vec4 sum = vec4(0.0);
	
	for (i = 0; i < kernelSize; i++)
	{
		vec4 tmp = texture2D(baseImage, gl_TexCoord[0].st + offset[i]);
		sum += tmp * kernelValue[i];
	}
	vec4 baseColor = texture2D(baseImage, vec2(gl_TexCoord[0]));
	gl_FragColor = scaleFactor * sum + baseColor;
}


