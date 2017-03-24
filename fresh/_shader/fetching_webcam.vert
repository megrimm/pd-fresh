//uniform sampler2D testTex;

uniform float myMultiply;
uniform sampler2DRect MyTex;
uniform sampler2DRect MyTex1;

void main()
{

vec4 color = texture2DRect(MyTex1, gl_MultiTexCoord0.st);
//C = color;
vec4 myvertex = vec4(gl_Vertex);
myvertex.z = color.r * myMultiply;

gl_TexCoord[0]= gl_MultiTexCoord0;

gl_Position =  gl_ModelViewProjectionMatrix  * myvertex;


}

