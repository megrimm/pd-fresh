//Original Source
//http://learningwebgl.com/blog/?p=2858

uniform sampler2DRect tex0;
varying vec2 texcoord0;
uniform vec2 imageSize;
uniform vec4 dotSize;
uniform vec4 cmykangles;
uniform float sharpness;

uniform vec4 pColor;
uniform vec4 cColor;
uniform vec4 mColor;
uniform vec4 yColor;
uniform vec4 kColor;

//uniform mat4 CMYKmat;
const mat4 CMYKmat = mat4(vec4(-1.0,0.0,0.0,0.0), vec4(0.0,-1.0,0.0,0.0), vec4(0.0,0.0,-1.0,0.0), vec4(1.0,1.0,1.0,1.0));
const vec4 lumacoeff = vec4(0.2126,0.7152,0.0722, 0.0);

vec2 amhalftone(float colorch, float angle, float scale)
{
//    float scale = size; 
 
    vec2 normsize = texcoord0/imageSize;
 
    vec2 sttemp = (scale) * normsize;
    
    float radangle = radians(angle);
    mat2 rotMat = mat2(vec2(cos(radangle), -sin(radangle)), vec2(sin(radangle), cos(radangle)));
    vec2 rotVec = rotMat * sttemp;
     
    vec2 stlocal = mod(rotVec, 1.0);
  
    float dist = sqrt((stlocal.s - 0.5) * (stlocal.s - 0.5) + (stlocal.t - 0.5) * (stlocal.t - 0.5));
        
    float blackness = 1.0 - colorch;
    float radius = 0.5 * sqrt(blackness);
      
    //float dot = step(radius, dist);
    float dot = smoothstep(radius - sharpness, radius + sharpness, dist);
    
    return vec2(dist, dot);
	//return dot;
}

void main()
{
    vec4 RGBAcolor = texture2DRect(tex0, texcoord0);
    
	//vec4 lColor = vec4(dot(RGBAcolor, lumacoeff));
	//lColor.a = RGBAcolor.a;
	
    vec4 CMYKcolor = CMYKmat * RGBAcolor; //lColor;//RGBAcolor;
		
	float minColor = min(min(CMYKcolor.r, CMYKcolor.g), CMYKcolor.b) * 0.5;	

	//vec4 clear = vec4(0.0, 0.0, 0.0, 0.0);
	//vec4 clear = kColor * kColor.a;
	vec4 clear = vec4((pColor.rgb * pColor.a) / 4.0, pColor.a);
	//vec4 clear = pColor / 4.0;
	
    vec2 distdotC = amhalftone(CMYKcolor.r, (cmykangles.r), dotSize.r);
    //CMYKcolor.r = distdotC.y;
	vec4 c = mix(clear, vec4((1.0 - cColor.rgb) * cColor.a, cColor.a),  (1.0 - distdotC.y));

    vec2 distdotM = amhalftone(CMYKcolor.g, (cmykangles.g), dotSize.g);
    //CMYKcolor.g = distdotM.y;
	vec4 m = mix(clear, vec4((1.0 - mColor.rgb) * mColor.a, mColor.a),  (1.0 - distdotM.y));

    vec2 distdotY = amhalftone(CMYKcolor.b, (cmykangles.b), dotSize.b);
    //CMYKcolor.b = distdotY.y;
	vec4 y = mix(clear, vec4((1.0 - yColor.rgb) * yColor.a, yColor.a),  (1.0 - distdotY.y));
	
	vec2 distdotK = amhalftone(minColor, (cmykangles.a), dotSize.a);
    //CMYKcolor.a = distdotK.y;
	vec4 k = mix(clear,vec4((kColor.rgb) * kColor.a, kColor.a),  (1.0 - distdotK.y));

	vec4 result = vec4(1.0); 
	//vec4 result = vec4((1.0 - pColor.rgb) *pColor.a,  pColor.a);
	//vec4 p = vec4((pColor.rgb) * pColor.a, pColor.a);
	
	//vec4 result = vec4(1.0);
	//vec4 result = 1.0 - pColor;
	
	result -= c;
	result -= m;
	result -= y;
	result -= k;

	result = (1.0) - result;
	//result *= p;
	
	result *= RGBAcolor;
		
//	vec4 result = (1.0 - (c+m+y+k) ) * RGBAcolor.a;
//	result = mix(result, RGBAcolor, sharpness);
	//vec4 result = clamp(c+m+y+k, 0.0, 1.0);
	//result.a *= mix((1.0 - k.a) *(1.0 - distdotM.y) * (1.0 - distdotC.y) * (1.0 -distdotY.y), 1.0, kColor.a);
	
	//result = mix(result, kColor,  1.0 - distdotK);
    gl_FragColor = result;
	
	
//	vec4 result = vec4(0.0);
//	
//	result.r = (1.0-CMYKcolor.r)  * (1.0-distdotK.y);
//    result.g = (1.0-CMYKcolor.g)  * (1.0-distdotK.y);
//    result.b = (1.0-CMYKcolor.b)  * (1.0-distdotK.y);
//	result.a = 1.0;//(1.0 - distdotK);
//	
//    result.rgb *= RGBAcolor.rgb * RGBAcolor.a;
//	result.a *= RGBAcolor.a;
//    //RGBAcolor.a = (1.0 - CMYKmat[3][3]) * RGBAcolor.a;
//    //RGBAcolor.a = mix(1.0 - CMYKcolor.a, 1.0 - distdotK, CMYKcolor.a) * RGBAcolor.a;
//    
//    gl_FragColor = result;//mix(RGBAcolor,papercolor, 0.2);

}