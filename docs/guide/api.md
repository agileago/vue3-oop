# 基础类

## VueComponent

可传入泛型 `VueComponent<Props>`

组件必须继承的类，并且必须实现`render`函数

## VueService

服务必须继承的类

# 装饰器

## Ref
- Type: 属性装饰器

声明变量为响应式

```tsx
class Foo extends VueComponent {
  @Ref() count = 1
}
```

## Computed
- Type: 存取器属性装饰器

计算属性，加了一层缓存

```tsx
class Foo extends VueComponent {
  @Ref() count = 1

  @Computed()
  get doubleCount() {
    return this.count * 2
  }
}
```

## Hook
- Type: 方法装饰器
- 'BeforeMount' | 'Mounted' | 'BeforeUpdate' | 'Updated' | 'BeforeUnmount' | 'Unmounted' | 'Activated' | 'Deactivated' | 'ErrorCaptured' | 'RenderTracked' | 'RenderTriggered' | 'ServerPrefetch'

生命周期

```tsx
class Foo extends VueComponent {
  @Hook('Mounted')
  mount() {
    console.log('mount')
  }
}
```

## Link
- Type: 属性装饰器

链接到组件或者元素

```tsx
class Foo extends VueComponent {
  @Link() div?: HTMLDivElement

  render() {
    return <div ref="div"></div>
  }
}
```

## Autobind
- Type: 类装饰器或者方法装饰器

自动绑定方法的this

```tsx
// 可以直接绑定一个类，类下面的所有方法都会自动绑定
@Autobind()
class Foo extends VueComponent {
  @Autobind() // 可单独绑定某个方法
  add() {

  }

  render() {
    return <div ref="div"></div>
  }
}
```

# 帮助函数

## useProps

获取当前组件的属性

## useCtx

获取当前组件的上下文

## getCurrentApp

获取当前的应用app

# 类型

## ComponentProps

定义组件的props时使用

```tsx
interface FooProps {
  size: 'small' | 'large'
}
class Foo extends VueComponent<FooProps> {
  static defaultProps: ComponentProps<FooProps> = ['size']

  render() {
    return <div>{this.props.size}</div>
  }
}
```



