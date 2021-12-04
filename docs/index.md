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
  details: 基于动态解析的 injection-js 依赖注入，让使用服务丝般自然
- title: vue3无ref编程
  details: 无需关注ref及其value，正常声明变量，编程体验更自然
---

#### 以下代码展示常用API

```typescript jsx
import { VueComponent, Ref, Autobind, VueService } from "vue3-oop"
import { Injectable } from "injection-js"
import { createApp, VNodeChild } from "vue"

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
// 组件
@Component({
  providers: [CountService]
})
class Home extends VueComponent {
  // 构造函数注入服务，无需new
  constructor(private countService: CountService) {
    super()
  }

  render() {
    return <div>
      <span onClick={this.countService.add}>+</span>
      {this.countService.count}
      <span onClick={this.countService.remove}>-</span>
    </div>
  }
}

// 子组件属性
interface HomeChild_Props<DataItem = any> {
  list: DataItem[]
  title: string | ((list: DataItem[]) => VNodeChild)
  ['v-slots']?: {
    default(): VNodeChild
    item(item: DataItem): VNodeChild
  }
}

// 子组件
class HomeChild<T> extends VueComponent<HomeChild_Props<T>> {
  static defaultProps: ComponentProps<HomeChild_Props> = {
    list: {
      type: Array,
      required: true
    },
    title: {
      type: [String, Function],
      required: true
    },
  }

  render() {
    return (
      <div>
        {
          
        }
      </div>
    );
  }
  
}

const app = createApp(Home)
app.mount('#app')
```