/*
 *
 * Andrew Benson - andrewb@cycling74.com
 * Copyright 2005 - Cycling '74
 *
 * GLSL vertex program for doing a standard vertex transform
 * with texture coordinates, also passing the texture dimensions to the fragment shader.
 *
 */

varying vec2 texcoord0;
varying vec2 texcoord1;


void main()
{
    // perform standard transform on vertex
    gl_Position = ftransform();

    // transform texcoords
    texcoord0 = vec2(gl_TextureMatrix[0] * gl_MultiTexCoord0);
	// ms: only gl_MutliTexCoord0 is supported in Pd/GEM
    texcoord1 = vec2(gl_TextureMatrix[1] * gl_MultiTexCoord0);
}