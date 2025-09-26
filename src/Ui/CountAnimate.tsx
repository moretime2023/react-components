import { useRef } from "react"
import { easing } from "maath"
import { useFrame } from "@react-three/fiber"
import { Text, Mask, useMask } from "@react-three/drei"
import { Vector3, Group } from "three"

export type CountAnimateProps = {
  value: string | number
  currency?: string
} & Record<string, any>

/**
 * CountAnimate 组件
 *
 * 会把传入的 value 展示为从右向左的 4 位计数器（不足会以 ✨ 占位），
 * 每一位使用独立的 Counter 组件渲染（垂直排列的 0-9 文本）。
 *
 * Props:
 * - value: 要显示的数值或字符串，会被截取成最多 4 个字符（右对齐）
 * - currency: 货币符号（默认 "$"）
 * - 其余 props 会被传递给最外层 <group>
 */
export const CountAnimate = ({ value, currency = "$", ...props }: CountAnimateProps) => (
  <group {...props}>
    {[...`✨✨✨✨✨✨${value}`.slice(-9)].map((num, index) => (
      // 当占位符 ✨ 出现时，Counter 的 value 用 -1 表示不显示任何数字的偏移（外层展示空白）
      <Counter index={index} value={num} key={index} speed={0.1 * (9 - index)} />
    ))}
    <Text children={currency} anchorY="bottom" position={[9 * 1.1, -0.25, 0]} fontSize={1} />
    <Mask id={1}>
      <planeGeometry args={[10, 1.55]} />
    </Mask>
  </group>
)


/**
 * Counter 组件
 *
 * 渲染一个竖直排列的 0-9 文本组，并通过位置动画展示所需的数字。
 *
 * Props:
 * - index: 当前位的索引（用于水平位移）
 * - value: 期望显示的数字，范围 0-9；如果为 -1 表示占位，不显示任何数字（将会移动到空位）
 * - speed: 动画阻尼速度（越大收敛越快），默认 0.1
 *
 * 实现细节：使用 useRef 获取 group 引用，通过 useFrame 在每帧调用 easing.damp 来平滑动画。
 */
function Counter({ index, value, speed = 0.1 }: { index: number; value: string, speed?: number }) {
  const numbers = ['-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
  const idx = numbers.indexOf(value as string);

  // group ref，用于控制 position.y
  const ref = useRef<Group | null>(null)
  // useMask 返回的属性需要展开到材质上以启用遮罩/模板缓冲
  const stencil = useMask(1)

  useFrame((_state, delta) => {
    // 防御性检查：ref.current 可能为 null（在卸载或初次渲染前）
    if (!ref.current) return
    // 当 value 为 -1 时，我们希望把位置移出可见区（这里使用 -2 的偏移倍数）
    const targetY = value !== '✨' ? idx * -2 : -2 * numbers.length;
    // easing.damp 支持直接在对象路径上进行阻尼，这里保持原用法
    // 注意：ref.current.position 是 Vector3，我们传入属性名 'y' 以更新 y 分量
    easing.damp(ref.current.position as unknown as Vector3, "y", targetY, speed, delta)
  })

  return (
    <group position-x={index * 1.1} ref={ref}>
      {numbers.map((number, idx) => (
        <Text key={number} position={[0, idx * 2, 0]} fontSize={2}>
          {number}
          <meshBasicMaterial {...stencil} />
        </Text>
      ))}
    </group>
  )
}
