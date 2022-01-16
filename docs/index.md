---
home: true
heroText: VUE3面向对象编程
tagline: 极致优秀的编码体验
actionText: 开始使用
actionLink: /guide/
features:
- title: 类组件
  details: 功能与类型融为一体，无需多次声明类型，独立的属性类型声明，各种HOC组合轻而易举
- title: 自动的依赖注入
  details: 基于动态解析的 injection-js 依赖注入，让使用服务丝般顺滑
- title: vue3无ref编程
  details: 无需关注ref及其value，正常声明变量，编程体验更自然
---

```tsx
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
    watch(() => this.count, () => console.log(this.count))
  }

  // 组件自身状态
  @Mut() count = 1
  
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
        <label>11111</label>
        <input type="text" v-focus />
      </div>
    )
  }
}
```