	/*
	 * This code is from the lighthouse3d.com GLSL tutorial on point lighting.
	 */
	varying vec4 diffuse,ambientGlobal, ambient;
	varying vec3 normal,lightDir,halfVector;
	varying float dist;
	
	
	void main()
	{
		vec3 n,halfV,viewV,ldir;
		float NdotL,NdotHV;
		vec4 color = ambientGlobal;
		float att;
		
		/* a fragment shader can't write a varying variable, hence we need
		a new variable to store the normalized interpolated normal */
		n = normalize(normal);
		
		/* compute the dot product between normal and normalized lightdir */
		NdotL = max(dot(n,normalize(lightDir)),0.0);
	
		if (NdotL > 0.0) {
		
			att = 1.0 / (gl_LightSource[0].constantAttenuation +
					gl_LightSource[0].linearAttenuation * dist +
					gl_LightSource[0].quadraticAttenuation * dist * dist);
			color += att * (diffuse * NdotL + ambient);
		
			
			halfV = normalize(halfVector);
			NdotHV = max(dot(n,halfV),0.0);
			color += att * 0.3 * gl_LightSource[0].specular * 
							pow(NdotHV,100.0);
		}
	
		gl_FragColor = color;
	}


