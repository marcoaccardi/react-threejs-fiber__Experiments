import "./App.scss";
import { Canvas } from "@react-three/fiber";
const App = () => {
  return (
    <div className='canvas-container'>
      <Canvas>
        <mesh>
          <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
        </mesh>
      </Canvas>
    </div>
  );
};

export default App;
