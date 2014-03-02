varying vec4 Pdev;

uniform float waveFreq;
uniform float waveAmp;
uniform float time;

uniform sampler2DRect tex0;

void main()
{
    vec4 PP = Pdev - vec4 (0.5,0.5,0.0,1.0);
    float P0 = PP[0];
    float P1 = PP[1];
    float radius = sqrt(P0 * P0 + P1 * P1);
    float cosangle = P0 / radius;
    float sinangle = P1 / radius;

    float waveangle = (radius - time) * waveFreq;
    waveangle = mod(waveangle, 2.0 * 3.14159);
    float offset = 1.0 - cos(waveangle - 3.14159);
    offset *= waveAmp;

    float newradius = radius + offset;
    vec4 newP = vec4 (newradius * cosangle + 0.5,newradius * sinangle + 0.5,0,1);

    gl_FragColor = texture2DRect(tex0, vec2(newP));
}

