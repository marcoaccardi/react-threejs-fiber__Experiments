import { useRef } from "react";
import "./App.scss";
import { Canvas, useFrame } from "@react-three/fiber";

const SpinningMesh = ({ position, args, color }) => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return (
    <mesh position={position} ref={mesh}>
      <boxGeometry attach='geometry' args={args} />
      <meshStandardMaterial attach='material' color={color} />
    </mesh>
  );
};

const App = () => {
  return (
    // <div className='canvas-container'>
    <Canvas colormanagement='true' camera={{ position: [-5, 2, 10], fov: 60 }}>
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[0, 10, 0]}
        intensity={1.5}
        shadowMapWidth={1024}
        shadowMapHeight={1024}
        shadowCameraFar={50}
        shadowCameraLeft={-10}
        shadowCameraRight={10}
        shadowCameraTop={10}
        shadowCameraBottom={-10}
      />
      <pointLight position={[-10, 0, -20]} intensity={1.5} />
      <pointLight position={[0, -10, 0]} intensity={0.5} />
      <SpinningMesh position={[0, 1, 0]} args={[3, 2, 1]} color='lightblue' />
      <SpinningMesh position={[-2, 1, -5]} color='pink' />
      <SpinningMesh position={[5, 1, -2]} color='pink' />
    </Canvas>
    // </div>
  );
};

export default App;
