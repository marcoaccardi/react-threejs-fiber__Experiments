import * as THREE from "three";
import { useRef, useState, useMemo } from "react";
import { Canvas, extend } from "@react-three/fiber";
import { shaderMaterial, OrbitControls } from "@react-three/drei";

import "./App.scss";
import vertex from "./shaders/vertexShader.glsl";
import fragment from "./shaders/fragmentShader.glsl";

// const fragmentShader = glsl`varying vec2 vUv;

// vec3 colorA = vec3(0.008,0.895,0.940);
// vec3 colorB = vec3(0.129,0.299,1.000);

// void main() {
//   vec2 normalizedPixel = gl_FragCoord.xy/500.0;
//   vec3 color = mix(colorA, colorB, normalizedPixel.x);

//   gl_FragColor = vec4(color,1.0);
// }`;

// const vertexShader = glsl`uniform float u_time;

// varying vec2 vUv;

// void main() {
//   vec4 modelPosition = modelMatrix * vec4(position, 1.0);
//   modelPosition.y += sin(modelPosition.x * 4.0 + u_time * 2.0) * 0.2;

//   // Uncomment the code and hit the refresh button below for a more complex effect 🪄
//   // modelPosition.y += sin(modelPosition.z * 6.0 + u_time * 2.0) * 0.1;

//   vec4 viewPosition = viewMatrix * modelPosition;
//   vec4 projectedPosition = projectionMatrix * viewPosition;

//   gl_Position = projectedPosition;
// }`;
const Flag = () => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  const uniforms = useMemo(
    () => ({
      u_test: {
        value: 1.0,
      },
    }),
    []
  );
  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={1.5}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        wireframe={true}
      />
    </mesh>
  );
};

const Render = () => {
  return (
    <Canvas camera={{ position: [1.0, 1.0, 1.0] }}>
      <Flag />
      <axesHelper />
      <OrbitControls />
    </Canvas>
  );
};

function App() {
  return <Render />;
}

export default App;
