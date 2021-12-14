import '@abraham/reflection'
import type { ClassType, ComponentProps } from 'vue3-oop'
import { Autobind, Component, Computed, Hook, Link, Ref, VueComponent, VueService } from '@/index'
import { forwardRef, Inject, Injectable, SkipSelf } from 'injection-js'
import { createApp, VNodeChild, watch } from 'vue'
import { Foo } from './example'

// 服务，即可复用的逻辑 类似 useXXX
@Injectable()
class CountService extends VueService {
  @Ref() count = 0

  @Autobind()
  add() {
    this.count++
  }

  @Autobind()
  remove() {
    this.count--
  }
}

// 组件属性声明
interface HomeChild_Props {
  size: 'small' | 'large'
  value?: string
  'onUpdate:value'?: (name: string) => void
  check?: boolean
  'onUpdate:check'?: (check: boolean) => void
  // 组件个性化定义属性
  slots: {
    item(name: string): VNodeChild
  }
}

// 带属性组件
@Component({ providers: [CountService] })
class HomeChild extends VueComponent<HomeChild_Props> {
  static defaultProps: ComponentProps<HomeChild_Props> = ['size', 'value', 'onUpdate:value', 'check', 'onUpdate:check']

  constructor(
    private countService: CountService,
    @SkipSelf() private parentCountService: CountService,
    @Inject(forwardRef(() => Home)) private parent: ClassType<Home>,
  ) {
    super()
  }

  @Link() div?: ClassType<HTMLDivElement>

  render() {
    return (
      <div style={{ marginTop: '40px' }} ref="div">
        <h1>子组件</h1>
        <h4>子组件属性是：{this.props.size}</h4>
        <h4>父组件外部服务状态: {this.parentCountService.count}</h4>
        <h4>父组件内部服务状态: {this.parent.count}</h4>
        <h3>子组件内部服务</h3>
        <button onClick={this.countService.add}>+</button>
        {this.countService.count}
        <button onClick={this.countService.remove}>-</button>
        <div>
          <h3>这里是组件定制化内容</h3>
          {this.context.slots.item?.('我是定制化内容')}
        </div>
      </div>
    )
  }
}
class AService extends VueService {
  constructor() {
    super()
    console.log('aservice init')
  }
}

// 组件
@Autobind() // 绑定this 也可以放到这里
@Component({ providers: [CountService, AService] }) // 声明自己的服务
class Home extends VueComponent {
  // 构造函数注入服务，无需new
  constructor(private countService: CountService) {
    super()
    watch(
      () => countService.count,
      () => console.log('数据变化哦'),
    )
  }

  // 组件自身的状态
  @Ref() count = 1

  // 计算属性
  @Computed()
  get plusResult() {
    return this.count + this.countService.count
  }

  // 声明周期
  @Hook('Mounted')
  mounted() {
    console.log('mounted', this.child?.props.size)
  }

  // 子组件引用 链接🔗
  @Link() child?: ClassType<HomeChild>

  add() {
    this.count++
  }

  remove() {
    this.count--
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2>外部服务111</h2>
        <button onClick={this.countService.add}>+</button>
        {this.countService.count}
        <button onClick={this.countService.remove}>-</button>

        <h2>组件自身状态</h2>
        <button onClick={this.add}>+</button>
        {this.count}
        <button onClick={this.remove}>-</button>

        <HomeChild
          ref="child"
          size={'small'}
          v-slots={{
            item(name: string) {
              return <span>{name}</span>
            },
          }}
        ></HomeChild>
        <Foo size={'large'}></Foo>
      </div>
    )
  }
}

const app = createApp(Home)
app.mount('#app')
