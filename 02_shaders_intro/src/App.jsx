import * as THREE from "three";
import { useRef, Suspense } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";
import "./App.scss";

const WaveShaderMaterial = shaderMaterial(
  //Uniform
  { uTime: 0, uColor: new THREE.Color(0.0, 0.0, 0.0, 0.0) },
  //Vertex Shader
  glsl`
  precision mediump float;

  varying vec2 vUv;
  uniform float uTime;
  #pragma glslify: snoise3 = require(glsl-noise/simplex/3d);
  void main(){
    vUv = uv;

    vec3 pos = position;
    float noiseFreq = 2.5;
    float noiseAmp = 0.65;
    vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
    pos.z += snoise3(noisePos) * noiseAmp;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
  `,
  // Fragment Shader
  glsl`
  precision mediump float;

  uniform vec3 uColor;

  uniform float uTime;

  varying vec2 vUv;

  void main(){
    gl_FragColor = vec4(sin(vUv.x + uTime) * uColor, 0.8);
  }
  `
);

// shaders as JSX component
extend({ WaveShaderMaterial });

const Wave = () => {
  const ref = useRef();
  useFrame(({ clock }) => (ref.current.uTime = clock.getElapsedTime()));
  return (
    <mesh>
      <planeGeometry args={[0.4, 0.6, 16, 16]} />
      <waveShaderMaterial uColor={"hotpink"} ref={ref} wireframe />
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas camera={{ fov: 10, position: [0, 0, 5] }}>
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
