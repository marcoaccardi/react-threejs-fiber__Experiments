import { useRef } from "react";
import "./App.scss";
import { Canvas, useFrame } from "@react-three/fiber";

const SpinningMesh = ({ position }) => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return (
    <mesh position={position} ref={mesh}>
      <boxGeometry attach='geometry' args={[1, 1, 1]} />
      <meshStandardMaterial attach='material' color='pink' />
    </mesh>
  );
};
const App = () => {
  return (
    // <div className='canvas-container'>
    <Canvas colormanagement='true' camera={{ position: [-5, 2, 10], fov: 60 }}>
      <ambientLight intensity={0.7} />
      <SpinningMesh position={[0, 1, 0]} />
      <SpinningMesh position={[-2, 1, -5]} />
      <SpinningMesh position={[5, 1, -2]} />
    </Canvas>
    // </div>
  );
};

export default App;
