import { useRef } from "react";
import "./App.scss";
import { Canvas, useFrame } from "@react-three/fiber";

const Box = () => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return (
    <mesh ref={mesh}>
      <boxGeometry attach='geometry' args={[1, 1, 1]} />
      <meshStandardMaterial attach='material' color='pink' />
    </mesh>
  );
};
const App = () => {
  return (
    // <div className='canvas-container'>
    <Canvas>
      <ambientLight intensity={0.7} />
      <Box />
    </Canvas>
    // </div>
  );
};

export default App;
