uniform mat4 ModelViewMatrix;
uniform mat4 ProjectionMatrix;

attribute vec4 Vertex;
attribute vec3 Needed; // Between Vertex and TexCoord
attribute vec2 TexCoord;

varying vec2 Tap[4], TapNeg[3];
uniform int Width;

void main(void)
{
	vec3 useless = normalize(Needed); // No texture fecth w/o a useless normalization of an attribute

	vec2 horzTapOffs[7];
	vec2 FragTexCoord = vec2(1.0, -1.0) * TexCoord;

	float dx = 1.0/float(Width);
	horzTapOffs[0] = vec2(0.0, 0.0);
	horzTapOffs[1] = vec2(1.3366 * dx, 0.0);
	horzTapOffs[2] = vec2(3.4295 * dx, 0.0);
	horzTapOffs[3] = vec2(5.4264 * dx, 0.0);
	horzTapOffs[4] = vec2(7.4359 * dx, 0.0);
	horzTapOffs[5] = vec2(9.4436 * dx, 0.0);
	horzTapOffs[6] = vec2(11.4401 * dx, 0.0);

	Tap[0] = FragTexCoord;
	Tap[1] = FragTexCoord + horzTapOffs[1];
	Tap[2] = FragTexCoord + horzTapOffs[2];
	Tap[3] = FragTexCoord + horzTapOffs[3];

	TapNeg[0] = FragTexCoord - horzTapOffs[1];
	TapNeg[1] = FragTexCoord - horzTapOffs[2];
	TapNeg[2] = FragTexCoord - horzTapOffs[3];

	gl_Position = ProjectionMatrix * ModelViewMatrix * Vertex;
}
