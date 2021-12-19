### 依赖注入

依赖注入是一种在后端非常常见的设计模式，具体的依赖注入学习请看

- https://zhuanlan.zhihu.com/p/311184005
- https://zhuanlan.zhihu.com/p/113299696


本库的依赖注入使用了 `Angular` 早期的基于动态的依赖注入 `injection-js` https://github.com/mgechev/injection-js,
结合vue3进行了集成和优化，使用请看下面例子

```tsx
import { VueService, VueComponent } from 'vue3-oop'
import { Injectable } from 'injection-js'

// 定义服务 加上此装饰器表明我有需要其他服务，如果不需要，可以不加
@Injectable()
class CountService extends VueService {
  @Track() count = 1

  add() {
    this.count++
  }
}

// 加上此装饰器表明我有服务需要注入
@Component()
class Home extends VueComponent {
  constructor(private countService: CountService) {super()}

  render() {
    return (
      <div onClick={() => this.countService.add()}>
        {this.countService.count}
      </div>
    );
  }
}
```

在 `vue3-oop` 里面，依赖注入是分层的， 每一个应用 `@Component` 装饰器的组件都会生成注射器，
注射器在本级寻找不到服务会自动向上级寻找，不过需要加上 `@SkipSelf` 标识

```tsx
import { VueComponent } from './component'
import { SkipSelf } from 'injection-js'

class CountService extends VueService {
  @Track() count = 1

  add() {
    this.count++
  }
}

// 加上此装饰器表明我有服务需要注入
@Component({
  // 如果某些服务只是在父级需要，而父级组件不需要可以直接写在这里
  providers: [CountService]
})
class Home extends VueComponent {
  render() {
    return (
      <div>

      </div>
    );
  }
}

@Component()
class HomeChild extends VueComponent {
  constructor(
    private countService: CountService, // 自身注入
    @SkipSelf() private c2: CountService // 从父级注入
  ) {super()}

  render() {
    return (
      <div>

      </div>
    );
  }
}
```


