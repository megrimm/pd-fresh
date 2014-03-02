uniform sampler3D myNoiseTex;
varying vec3 pos;

float undulate(float x)
{
    if(x < -0.4)
    {
        return 0.15 + 2.857 * (x + 0.75)*(x + 0.75);
    }
    else if(x < 0.4)
    {
        return 0.95 - 2.8125 * (x*x);
    }
    else
    {
        return 0.26 + 2.666 * (x - 0.7)*(x - 0.7);
    }
}
 
float marble(vec3 p)
{
    float PI = 3.1415;
    float s = 0.25;
    float a = 2.0;
    
    // this computes 3 octaves of turbulence
    vec4 t1 = 1.0*texture3D(myNoiseTex, s*p);
    vec4 t2 = 0.5*texture3D(myNoiseTex, 2.0*s*p);
    vec4 t3 = 0.25*texture3D(myNoiseTex, 4.0*s*p);
 
    float m = undulate(sin(p.y*2.0*PI + a*(t1.x + t2.x + t3.x)));
   
    return m;
}

void main()
{  
    float val = marble(pos);
    gl_FragColor = vec4(val, val, val, 1.0);
}
