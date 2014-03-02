//Original Source
//http://learningwebgl.com/blog/?p=2858

uniform sampler2DRect tex0;
varying vec2 texcoord0;
uniform float invert;
uniform float separation;
uniform float greyscale;
uniform float thickness;
uniform int hatchcount;

uniform vec4 front;
uniform vec4 back;


const vec4 lumacoeff = vec4(0.2126,0.7152,0.0722, 0.0);

void main()
{
    vec4 color = texture2DRect(tex0, texcoord0);
    float lum = dot(color, lumacoeff);
    vec2 coord = gl_FragCoord.xy;
    
    vec4 colora = mix(front, back, invert);
    vec4 colorb = mix(back, front, invert);
    
    colora.a *= color.a;
    colorb.a *= color.a;
    
    vec4 cout = mix(color,colora, greyscale);

/*    
    gl_FragColor = colorb;
    
    for(int i = 0; i < hatchcount;)
    {
        float fi = float(i);
        
        if(lum > float( (hatchcount - i) / hatchcount))
        {
            if (mod(coord.x + coord.y, separation) >= thickness)
                gl_FragColor = cout;
        }
        
        if(lum >  ( float( (hatchcount - i) / hatchcount) * 0.75) )
        {
            if (mod(coord.x - coord.y, separation) >= thickness )
                gl_FragColor = cout;
        }
        if(lum >  ( float( (hatchcount - i) / hatchcount) * 0.5) )
        {
            if (mod(coord.x + coord.y - (separation * 0.5), separation) >= thickness)
                gl_FragColor = cout;
        }
        if(lum >  ( float( (hatchcount - i) / hatchcount) * 0.25) )
        {
            if (mod(coord.x - coord.y - (separation * 0.5), separation) >= thickness)
                gl_FragColor = cout;
        }
        i+=4;     
    }
 
*/   
    gl_FragColor = colorb;
    
    if (lum > 1.00)
    {
        if (mod(coord.x + coord.y, thickness) >= separation)
            gl_FragColor = cout;
    }
    
    if (lum > 0.75)
    {
        if (mod(coord.x - coord.y, thickness) >= separation )
            gl_FragColor = cout;
    }
    
    if (lum > 0.50)
    {
        if (mod(coord.x + coord.y - (thickness * 0.5), thickness) >= separation)
            gl_FragColor = cout;
    }
    
    if (lum > 0.3)
    {
        if (mod(coord.x - coord.y - (thickness * 0.5), thickness) >= separation)
            gl_FragColor = cout;
    }
}