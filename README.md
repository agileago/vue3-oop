# vue3 oop [文档](https://agileago.github.io/vue3-oop/)

类组件+自动化的依赖注入(可选) = 极致的代码体验 [DEMO](https://stackblitz.com/edit/vite-y7m4fy?file=main.tsx)

### QQ交流群

<img src="https://user-images.githubusercontent.com/11799110/163750676-784add60-422d-47ad-bf0f-e9ba6adaacda.jpeg" width=375>

### 前提条件

需要**reflect-metadata** 的支持

```shell
pnpm add @abraham/reflection injection-js 
```

项目入口需要引入 `reflect-metadata`

```typescript
import '@abraham/reflection'
```

**`tsconfig.json`** 需要增加配置:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "useDefineForClassFields": false
  } 
}
```

### 安装

```shell
pnpm add vue3-oop 
```

### vite配置

因为esbuild不支持装饰器的metadata属性，所以需要安装 `@vue3-oop/plugin-vue-jsx` 插件使用原始ts编译

### 定义组件

```typescript jsx
import { Autobind, ComponentProps, Computed, Hook, Link, Mut, VueComponent } from 'vue3-oop'
import { Directive, VNodeChild, watch } from 'vue'

const focusDirective: Directive = {
  mounted(el: HTMLInputElement) {
    el.focus()
  },
}

interface Foo_Props {
  size: 'small' | 'large'
  // 组件的slots
  slots: {
    item(name: string): VNodeChild
  }
}

class Foo extends VueComponent<Foo_Props> {
  // vue需要的运行时属性检查
  static defaultProps: ComponentProps<Foo_Props> = ['size']
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
        <input type="text" v-focus/>
      </div>
    )
  }
}

```

### 定义服务

组件和服务的差距是缺少了render这一个表现UI的函数，其他都基本一样

```typescript
class CountService extends VueService {
  @Mut() count = 1
  add() {
    this.count++
  }
  remove() {
    this.count--
  }
}
```


### 依赖注入

Angular文档

- [Angular 中的依赖注入](https://angular.cn/guide/dependency-injection)
- [依赖提供者](https://angular.cn/guide/dependency-injection-providers)
- [服务与依赖注入简介](https://angular.cn/guide/architecture-services)
- [多级注入器](https://angular.cn/guide/hierarchical-dependency-injection)
- [依赖注入实战](https://angular.cn/guide/dependency-injection-in-action)

```typescript jsx
import { VueComponent, VueService } from 'vue3-oop'
import { Injectable } from 'injection-js'

// 组件DI
@Component({
  providers: [CountService]
})
class Bar extends VueComponent {
  constructor(private countService: CountService) {super()}

  render() {
    return <div>{this.countService.count}</div>
  }
}

@Injectable()
class BarService extends VueService {
  constructor(private countService: CountService) {super()}
}
```