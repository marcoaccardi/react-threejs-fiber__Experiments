import * as THREE from "three";
import { useRef, Suspense } from "react";
import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";
import "./App.scss";

const WaveShaderMaterial = shaderMaterial(
  //Uniform
  {
    uTime: 0,
    uColor: new THREE.Color(0.0, 0.0, 0.0, 0.0),
    uTexture: new THREE.Texture(),
  },
  //Vertex Shader
  glsl`
  precision mediump float;

  varying vec2 vUv;
  varying float vWave;

  uniform float uTime;
  #pragma glslify: snoise3 = require(glsl-noise/simplex/3d);

  void main(){
    vUv = uv;

    vec3 pos = position;
    float noiseFreq = 0.5;
    float noiseAmp = 0.25;
    vec3 noisePos = vec3(pos.x + uTime * noiseFreq, pos.y, pos.z);
    pos.z += snoise3(noisePos) * noiseAmp;
    vWave = pos.z;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment Shader
  glsl`
  precision mediump float;

  uniform vec3 uColor;
  uniform float uTime;
  uniform sampler2D uTexture;

  varying vec2 vUv;
  varying float vWave;

  void main(){
    float wave = vWave * 0.04;
    // vec3 texture = texture2D(uTexture, vUv + wave).rgb;


    // Split each texture color vector
    float r = texture2D(uTexture, vUv + wave*0.9).r;
    float g = texture2D(uTexture, vUv + wave*0.8).g;
    float b = texture2D(uTexture, vUv + wave*0.9).b;

    
    // Put them back together
    vec3 texture = vec3(r, g, b);
    gl_FragColor = vec4(texture, sin(vWave*0.2)+0.88);
  }
  `
);

// shaders as JSX component
extend({ WaveShaderMaterial });

const Wave = () => {
  const ref = useRef();
  useFrame(({ clock }) => (ref.current.uTime = clock.getElapsedTime()));

  const [image] = useLoader(THREE.TextureLoader, [
    "https://images.unsplash.com/photo-1435820394963-a15297f976fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit",
  ]);

  return (
    <mesh>
      <planeGeometry args={[0.4, 0.6, 16, 16]} />
      <waveShaderMaterial
        uColor={"hotpink"}
        ref={ref}
        uTexture={image}
        // wireframe
      />
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas camera={{ fov: 3, position: [0, 0, 5] }}>
      <Suspense fallback={null}>
        <Wave />
      </Suspense>
    </Canvas>
  );
};
function App() {
  return <Scene />;
}

export default App;
