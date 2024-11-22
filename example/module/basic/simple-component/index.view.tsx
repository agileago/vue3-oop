import { defineComponent, useClassAndStyle } from 'vue3-oop'
import { AllowedComponentProps } from '@/type'
import { ref } from 'vue'

// region 函数组件
export interface SimpleFuncComponentProps extends AllowedComponentProps {
  count?: number
}
export function SimpleFuncComponent(props: SimpleFuncComponentProps) {
  return <div>函数组件：{props.count}</div>
}
// endregion

// region 状态带属性组件
export interface SimpleStateComponentProps {
  initialValue?: number
}

export const SimpleStateComponent = defineComponent(
  function SimpleStateComponent(props: SimpleStateComponentProps) {
    const classAndStyle = useClassAndStyle()
    const count = ref(props.initialValue || 0)
    return () => (
      <div {...classAndStyle}>
        <input type={'number'} v-model={count.value} />
      </div>
    )
  },
)

export const SimpleStateWithDefaultValueComponent = defineComponent(
  function SimpleStateWithDefaultValueComponent(
    props: SimpleStateComponentProps,
  ) {
    const classAndStyle = useClassAndStyle()
    const count = ref(props.initialValue || 0)
    return () => (
      <div {...classAndStyle}>
        <h3>带默认属性参数的组件</h3>
        <input type={'number'} v-model={count.value} />
      </div>
    )
  },
  {
    props: {
      initialValue: {
        type: Number,
        default: 20,
      },
    },
  },
)

// endregion

// 简单状态组件定义
const SimpleComponent = defineComponent(() => {
  return () => (
    <div>
      <h2>简单组件定义</h2>
      <h3>函数组件</h3>
      <SimpleFuncComponent count={20}></SimpleFuncComponent>
      <SimpleStateComponent initialValue={10}></SimpleStateComponent>
      <SimpleStateWithDefaultValueComponent></SimpleStateWithDefaultValueComponent>
    </div>
  )
})

export default SimpleComponent
