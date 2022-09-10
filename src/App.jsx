import { Canvas } from "@react-three/fiber";
import "./App.scss";
const App = () => {
  return (
    <div className='canvas-container'>
      <Canvas>
        <mesh scale={4}>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    </div>
  );
};

export default App;
