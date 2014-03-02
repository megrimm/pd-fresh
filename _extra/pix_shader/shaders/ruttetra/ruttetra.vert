varying vec2 texcoord0;
varying vec2 texdim0;
attribute vec2 attr;
uniform vec3 amount;

void main()
{

	vec4 v = vec4(gl_Vertex);
		
	v.z += (attr.x * amount.z);
	v.y += (attr.x * amount.y);
	v.x += (attr.x * amount.x);
	
	gl_Position = gl_ModelViewProjectionMatrix * v;

    // transform texcoords
    texcoord0 = vec2(gl_TextureMatrix[0] * gl_MultiTexCoord0);
      
}