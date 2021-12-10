import { Autobind, ComponentProps, Computed, Hook, Link, Ref, VueComponent, VueService } from 'vue3-oop'
import { Directive, VNodeChild, watch } from 'vue'

const focusDirective: Directive = {
  mounted(el: HTMLInputElement) {
    el.focus()
  },
}

interface Foo_Props {
  size: 'small' | 'large'
  modelValue?: string
  'onUpdate:modelValue'?: (val: string) => void
  // 组件的slots
  slots: {
    item(name: string): VNodeChild
  }
}

class Foo extends VueComponent<Foo_Props> {
  // vue需要的运行时属性检查
  static defaultProps: ComponentProps<Foo_Props> = ['size', 'modelValue', 'onUpdate:modelValue']

  // 组件需要的局部指令
  static directives: Record<string, Directive> = {
    focus: focusDirective,
  }
  constructor() {
    super()
    // watch在构造函数中初始化
    watch(
      () => this.count,
      () => {
        console.log(this.count)
      },
    )
  }

  // 组件自身状态
  @Ref() count = 1
  // 计算属性
  @Computed()
  get doubleCount() {
    return this.count * 2
  }
  add() {
    this.count++
  }
  // 自动绑定this
  @Autobind()
  remove() {
    this.count--
  }

  // 生命周期
  @Hook('Mounted')
  mount() {
    console.log('mounted')
  }

  // 对元素或组件的引用
  @Link() element?: HTMLDivElement

  render() {
    return (
      <div ref="element">
        <span>{this.props.size}</span>
        <button onClick={() => this.add()}>+</button>
        <span>{this.count}</span>
        <button onClick={this.remove}>-</button>
        <div>{this.context.slots.item?.('aaa')}</div>
        <input type="text" v-focus />
      </div>
    )
  }
}

class CountService extends VueService {
  @Ref() count = 1
  add() {
    this.count++
  }
  remove() {
    this.count--
  }
}
