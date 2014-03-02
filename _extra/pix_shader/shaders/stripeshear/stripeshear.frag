// create diamond pattern
// shear (x/y) will change the angle of the diamonds
// offset (x/y) will move pattern left/right/up/down
// resize (x/y) will resize the height/width

uniform float shader_;
uniform sampler2D texture;
uniform vec2 shear, offset, resize;

void main(void)
{
	vec2 texCoord;
	texCoord.x = (gl_TexCoord[0].s + gl_TexCoord[0].t*shear.x + offset.x)*resize.x;
	texCoord.y = (gl_TexCoord[0].t + gl_TexCoord[0].s*shear.y + offset.y)*resize.y;
	gl_FragColor = texture2D(texture, texCoord);
}



