import * as THREE from "three";
import { Canvas, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";
import "./App.scss";

const WaveShaderMaterial = shaderMaterial(
  //Uniform
  { uColor: new THREE.Color(0.0, 0.0, 0.0, 0.0) },
  //Vertex Shader
  glsl`
  void main(){
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment Shader
  glsl`
  uniform vec3 uColor;
  void main(){
    gl_FragColor = vec4(uColor, 0.8);
  }
  `
);

// shaders as JSX component
extend({ WaveShaderMaterial });

const Scene = () => {
  return (
    <Canvas>
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <planeGeometry args={[3, 5]} />
        <waveShaderMaterial uColor={"hotpink"} />
      </mesh>
    </Canvas>
  );
};
function App() {
  return <Scene />;
}

export default App;
