import { ref, watch } from 'vue'
import { defineComponent, useClassAndStyle, type ClassAndStyleProps } from 'vue3-oop'

// region 函数组件
export interface SimpleFuncComponentProps extends ClassAndStyleProps {
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

export const SimpleStateComponent = defineComponent(function SimpleStateComponent(props: SimpleStateComponentProps) {
  const classAndStyle = useClassAndStyle()
  const count = ref(props.initialValue || 0)
  return () => (
    <div {...classAndStyle}>
      <input type={'number'} v-model={count.value} />
    </div>
  )
})

export const SimpleStateWithDefaultValueComponent = defineComponent(
  function SimpleStateWithDefaultValueComponent(props: SimpleStateComponentProps, { attrs }) {
    const classAndStyle = useClassAndStyle()
    watch(
      () => props.initialValue,
      (n, o) => console.log(555555, n, o),
    )
    const count = ref(props.initialValue || 0)
    return () => {
      console.log(2222, props.initialValue, attrs)
      console.log(3333, { ...props })
      return (
        <div {...classAndStyle} {...props}>
          <h3>带默认属性参数的组件</h3>
          <input type={'number'} v-model={count.value} />
        </div>
      )
    }
  },
  {
    // props: {
    //   initialValue: {
    //     type: Number,
    //     default: 20,
    //   },
    // },
  },
)

// endregion

// 简单状态组件定义
const SimpleComponent = defineComponent(() => {
  const init = ref<undefined | number>(10)

  return () => (
    <div>
      <h2>简单组件定义</h2>
      <h3>函数组件</h3>
      <SimpleFuncComponent count={20}></SimpleFuncComponent>
      <SimpleStateComponent initialValue={10}></SimpleStateComponent>
      <button onClick={() => (init.value = init.value ? undefined : 10)}>切换默认值</button>
      <SimpleStateWithDefaultValueComponent
        class={'aaaa'}
        initialValue={init.value}
        // @ts-ignore
        data-a={1111}
      ></SimpleStateWithDefaultValueComponent>
    </div>
  )
})

export default SimpleComponent
