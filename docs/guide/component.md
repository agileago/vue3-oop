## 定义

组件必须继承 **`VueComponent`**

```typescript
import { VueComponent } from 'vue3-oop'

class Foo extends VueComponent {
  render() {
    return (
      <div>我是组件UI</div>
    )
  }
}
```

## 属性

属性使用接口定义，在组件的 `props` 上面获取

```tsx
import { VueComponent, ComponentProps } from 'vue3-oop'

interface Foo_Props {
  size: 'small' | 'large'
}

class Foo extends VueComponent<Foo_Props> {
  static defaultProps: ComponentProps<Foo_Props> = ['size']
  render() {
    return <div>{this.props.size}</div>
  }
}

// 泛型组件
interface Bar_Props<T = any> {
  data: T
  onChange: (item: T) => void
}
class Bar<T> extends VueComponent<Bar_Props<T>> {
  static defaultProps: ComponentProps<Bar_Props> = ['data', 'onChange']
  render() {
    return <div 
      onClick={() => this.props.onChange?.(this.props.data)}
    >{this.props.data}</div>
  }
}

```

::: warning 注意！
定义属性之后一定要在类的静态属性 `defaultProps` 定义 vue 需要的属性定义
:::

## 上下文

组件的 `context` 属性上面存储这个组件的 `emit`, `slots`, `attrs`, `expose`, 
就是setup函数的第二个参数

```tsx
import { VueComponent } from './component'

class Foo extends VueComponent {
  static inheritAttrs = false

  render() {
    return <div {...this.context.attrs}>foo</div>
  }
}
```

## 响应式变量

响应式变量使用装饰器注解一下，主要有2个 `Ref` 和 `Computed`,此时忘记 `.value` 的事情，
就是正常普通的变量定义，加上装饰器就是告诉框架当此变量变化的时候我要刷新视图

```tsx
class Foo extends VueComponent {
  @Ref() count = 1

  @Computed()
  get doubleCount() {
    return this.count * 2
  }

  render() {
    return (
      <div onClick={() => this.count++}>
        {this.count}
      </div>
    )
  }
}
```

## 生命周期

生命周期使用 `Hook` 装饰器

```tsx
class Foo extends VueComponent {
  @Hook('Mounted')
  mounted() {
    console.log('foo mounted')
  }

  render() {
    return <span>foo</span> 
  }
}
```

## watch

watch在构造函数中使用, 构造函数其实就认为是 setup，你可以做任何在setup中使用的方法

```tsx
import { watch } from 'vue'

class Foo extends VueComponent {
  constructor() {
    super()
    watch(() => this.count, (n, o) => console.log('change', n, o))
  }

  @Ref() count = 1

  render() {
    return <span onClick={() => this.count++}>{this.count}</span>
  }
}
```

## 插槽

slots本质上其实是属性的一部分，为了模板的需要单独给拿出来，他其实就是类似于 `react` 中的 `renderProps`,
所以我们可以在属性定义的时候定义一下, 

```tsx
import { VNodeChild } from 'vue'
import { VueComponent } from 'vue3-oop'

interface Foo_Props {
  slots: {
    item(name: string): VNodeChild
  }
}

// 此时如果只有slots的话就可以不用定义 defaultProps
class Foo extends VueComponent<Foo_Props> {
  render() {
    return (
      <div>
        {this.context.slots.item?.('aaaa')}
      </div>
    )
  }
}
```