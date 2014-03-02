uniform float coefficient;

void main()
{	
	gl_FragColor = vec4(gl_FragCoord.xyz * coefficient, 1.0); /* xyz 1/w */
	/* gl_FragColor *= gl_Color; */
	
}
