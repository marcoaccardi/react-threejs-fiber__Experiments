import { useRef, useState } from "react";
import "./App.scss";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  softShadows,
  MeshWobbleMaterial,
  OrbitControls,
} from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";

const SpinningMesh = ({ position, args, color, speed }) => {
  const mesh = useRef(null);

  const [expand, setExpand] = useState(false);
  const props = useSpring({ scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1] });
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return (
    <animated.mesh
      onClick={() => setExpand(!expand)}
      scale={props.scale}
      castShadow
      position={position}
      ref={mesh}
    >
      <boxGeometry attach='geometry' args={args} />
      <MeshWobbleMaterial
        attach='material'
        color={color}
        speed={speed}
        factor={0.6}
      />
    </animated.mesh>
  );
};

softShadows({ frustum: 5.5, size: 0.005, near: 5.5, samples: 80, rings: 50 });
const App = () => {
  return (
    // <div className='canvas-container'>
    <Canvas
      shadows
      colormanagement='true'
      camera={{ position: [-5, 2, 10], fov: 60 }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight
        castShadow
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
      <group>
        <mesh
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -5, 0]}
        >
          <planeGeometry attach='geometry' args={[100, 100]} />
          <shadowMaterial attach='material' opacity={0.3} />
        </mesh>
        <SpinningMesh
          position={[0, 1, 0]}
          args={[3, 2, 1]}
          color='lightblue'
          speed={2}
        />
        <SpinningMesh position={[-2, 1, -5]} color='pink' speed={6} />
        <SpinningMesh position={[5, 1, -2]} color='pink' speed={6} />
      </group>
      <OrbitControls />
    </Canvas>
    // </div>
  );
};

export default App;
