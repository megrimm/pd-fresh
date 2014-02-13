#extension GL_ARB_texture_rectangle : enable

uniform sampler2DRect MyTex;

void main (void)
{
 vec4 color = texture2DRect(MyTex, gl_TexCoord[0].st);
 gl_FragColor = color; //(color+color2)/2.;
}


