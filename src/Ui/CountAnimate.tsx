import { useRef } from "react"
import { easing } from "maath"
import { useFrame } from "@react-three/fiber"
import { Text, Mask, useMask } from "@react-three/drei"
import { Mesh } from "three"

export const CountAnimate = ({ value, currency = "$", ...props }: { value: number; currency?: string }) => (
  <group {...props}>
    {[...`✨✨✨${value}`.slice(-4)].map((num, index) => (
      <Counter index={index} value={num === "✨" ? -1 : Number(num)} key={index} speed={0.1 * (4 - index)} />
    ))}
    <Text children={currency} anchorY="bottom" position={[4 * 1.1, -0.25, 0]} fontSize={1} />
    <Mask id={1}>
      <planeGeometry args={[10, 1.55]} />
    </Mask>
  </group>
)

function Counter({ index, value, speed = 0.1 }: { index: number; value: number; speed?: number }) {
  const ref = useRef<Mesh>(null)
  const stencil = useMask(1)
  useFrame((_state, delta) => easing.damp(ref.current!.position, "y", value * -2, speed, delta))
  return <group position-x={index * 1.1} ref={ref}>
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
      <Text key={number} position={[0, number * 2, 0]} fontSize={2}>
        {number}
        <meshBasicMaterial {...stencil} />
      </Text>
    ))}
  </group>
}
