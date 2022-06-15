import {
  Autobind,
  Component,
  ComponentProps,
  Computed,
  Hook,
  Mut,
  VueComponent,
  VueService,
} from 'vue3-oop'
import type { VNodeChild } from 'vue'
import { Injectable } from 'injection-js'

// 服务，可复用的服务
@Autobind()
@Injectable()
class CountService extends VueService {
  @Mut() count = 1

  @Computed() // 计算属性
  get double() {
    return this.count * 2
  }

  add() {
    this.count++
  }

  remove() {
    this.count--
  }

  // 生命周期钩子
  @Hook('Mounted')
  mount() {
    console.log('mounted')
  }
}

// 组件属性类型定义
interface CountProps {
  size: 'large' | 'small'
  age?: number
  // 插槽类似react render props
  slots: {
    item(name: string): VNodeChild
  }
}
// 组件  组件和服务差异仅仅只是组件有render
@Component()
class Count extends VueComponent<CountProps> {
  // vue需要的 runtime props
  static defaultProps: ComponentProps<CountProps> = ['size', 'age']

  // 注入服务
  constructor(private cs: CountService) {
    super()
  }

  render() {
    const { cs, props, context } = this
    return (
      <div>
        <button onClick={cs.add}>+</button>
        <p>{cs.count}</p>
        <button onClick={cs.remove}>-</button>
        <p>{props.size}</p>
        {context.slots.item?.('111')}
      </div>
    )
  }
}
