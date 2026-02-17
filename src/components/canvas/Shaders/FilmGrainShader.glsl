// Film Grain Shader
// Subtle, continuous grain with brief intensification during transitions

uniform float uTime;
uniform float uIntensity;
uniform vec2 uResolution;

varying vec2 vUv;

// Pseudo-random function
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    
    // Generate grain
    float grain = random(st + uTime * 0.01);
    
    // Output as grayscale noise with variable intensity
    gl_FragColor = vec4(vec3(grain), uIntensity);
}
