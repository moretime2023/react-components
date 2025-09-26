import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import './index.css'
import { CountAnimate } from '../src'

export function App() {
  return <div className='size-full' style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
    <h2>Example View</h2>

    <div style={{flex: 1, overflow: 'hidden', borderRadius: '24px', boxShadow: '0 0 20px #000'}}>
      <Canvas camera={{ position: [0, 0, 5] }} className='size-full'>
        <CountAnimate value={3000.32} currency='$' position={[-2, 0.3, -3.25]} />
      </Canvas>
    </div>
  </div>
}

createRoot(document.getElementById('root')!).render(<App />);
