import { easing } from "maath"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Sky, Bvh } from "@react-three/drei"
import { EffectComposer, Selection, Outline, N8AO, TiltShift2, ToneMapping } from "@react-three/postprocessing"
import { CountAnimate } from "../src"
import { createRoot } from "react-dom/client"
import './index.css'

export const App = () => <Canvas className="size-full" style={{ background: "#000" }} camera={{ position: [0, 1, 6] }}>
  <ambientLight intensity={1.5 * Math.PI} />
  <Sky />
  <Effects />
  <Bvh firstHitOnly>
    <Selection>
      <group position={[1,1,1]}></group>
      {/* <Scene rotation={[0, Math.PI / 2, 0]} position={[0, -1, -0.85]} /> */}
      <CountAnimate value={3000} />
    </Selection>
  </Bvh>
</Canvas>

function Effects() {
  const { size } = useThree()
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [state.pointer.x, 1 + state.pointer.y / 2, 8 + Math.atan(state.pointer.x * 2)], 0.3, delta)
    state.camera.lookAt(state.camera.position.x * 0.9, 0, -4)
  })
  return (
    <EffectComposer stencilBuffer enableNormalPass={false} autoClear={false} multisampling={4}>
      <N8AO halfRes aoSamples={5} aoRadius={0.4} distanceFalloff={0.75} intensity={1} />
      <Outline visibleEdgeColor={0} hiddenEdgeColor={0} blur width={size.width * 1.25} edgeStrength={10} />
      <TiltShift2 samples={5} blur={0.1} />
      <ToneMapping />
    </EffectComposer>
  )
}

createRoot(document.getElementById('root')!).render(<App />);
