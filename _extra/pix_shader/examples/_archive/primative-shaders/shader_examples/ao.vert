attribute vec4 ambient_occlusion; 
varying float ambient_occlusion_term;

void main(void)
{
	gl_Position = ftransform();
	ambient_occlusion_term = ambient_occlusion.w;
}


