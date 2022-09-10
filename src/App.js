import "./App.css";
import { Canvas } from "@react-three/fiber";
function App() {
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
}

export default App;
