# vue3 oop

类组件+自动化的依赖注入(可选) = 极致的代码体验

### 前提条件

需要**reflect-metadata** 的支持

```shell
yarn add @abraham/reflection injection-js 
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
yarn add vue3-oop 
```

### vite配置

因为esbuild不支持装饰器的metadata属性，所以需要安装 [vite-plugin-ts](https://github.com/CarterLi/vite/tree/main/packages/plugin-vue-jsx#readme) 插件使用原始ts编译

### API

| 装饰器 | 描述 |
| --- | --- |
| Ref | 标记变量为响应式 |
| Computed | 标记变量为计算属性 |
| Hook | 标记生命周期触发的函数 |
| Link | 相当于refs[key] |

2个基础类

1. 组件继承 `VueComponent`
2. 服务继承  `VueService`


### 组件编写

```tsx
import {
  ComponentProps,
  Computed,
  Hook,
  Ref,
  VueComponent
} from '@titanmatrix/vue3-class-component'
import { ChildService } from './child.service'

/**
 * 组件属性
 */
interface ChildProps {
  /**
   * 尺寸
   */
  size: number
  /**
   * 姓名
   */
  name?: string
}

export class Child extends VueComponent<ChildProps> {
  /**
   * vue描述的属性定义
   */
  static defaultProps: ComponentProps<ChildProps> = {
    size: {
      type: Number,
      required: true,
    },
    name: String,
  }
  childService = new ChildService()
  @Ref() name = 'child'

  @Computed()
  get nameUpper() {
    return this.name.toUpperCase()
  }

  @Hook('Mounted')
  mounted() {
    console.log('mounted')
  }
  
  @Link()
  root?: HTMLDivElement

  constructor() {
    super()
    //  watch 需要写在 constructor中
    watch(() => this.name, this.nameChange)
  }

  nameChange = () => {
    console.log(this.name)
  }

  render() {
    return (
      <div ref={'root'}>
        属性：{this.props.size}
        <h2>自有变量</h2>i am a {this.name}
        大写 {this.nameUpper}
        reactive 变量 {this.obj.age}
        <h3>service</h3>
        <button onClick={() => this.childService.add()}>+</button>
        {this.childService.count}
        <button onClick={() => this.childService.reduce()}>-</button>
      </div>
    )
  }
}
```

### 服务

通常服务是指很纯粹的业务逻辑，等价于vue3新提出的 `useFunction`, 例子如下：

```typescript
import { Hook, Ref, VueService, WatchEffect } from '@titanmatrix/vue3-class-component'
import { InjectionKey } from 'vue'

/**
 * 服务需要继承 VueService
 */
export class ChildService extends VueService {
  // 如果有此属性将自动 provide
  static ProviderKey: InjectionKey<ChildService> = Symbol()
  /**
   * 正常变量定义，成为响应式变量
   */
  @Ref() count = 1

  countChange() {
    console.log(this.count)
  }
  @Hook('BeforeUnmount')
  destroy() {
    console.log('做一些清理工作')
  }

  add() {
    this.count++
  }
  reduce() {
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
