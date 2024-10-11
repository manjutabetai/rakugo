const fragmentShader = `
uniform float u_intensity;
uniform float u_time;
uniform float u_isMonochrome; // モノクロフラグを追加


varying vec2 vUv; 
varying float vDisplacement;

void main() {
    float distort = 2.0 * vDisplacement * u_intensity * sin(vUv.y * 10.0 + u_time);
    vec3 color = vec3(abs(vUv - 0.5) * 1.5  * (1.0 - distort)*2.0,0.8);

    // モノクロフラグが1.0のときにモノクロ化する
    if (u_isMonochrome > 0.5) {
        float grayscale = dot(color, vec3(0.299, 0.587, 0.114)); // グレースケール変換
        color = vec3(grayscale); // モノクロにする
    }
        
    gl_FragColor = vec4(color, 1.0);
    
}

`;

export default fragmentShader;