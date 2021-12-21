## 定义

服务等价于vue3中`composition-api`，cpa本质上是用闭包把函数和变量包在一起，形成一个隔离区域，然后
再导出来给外界使用，但这样对类型不太友好，所以js提出了新的`class`写法去替代这种方式

```typescript
import { onBeforeUnmount, ref } from 'vue'

function usePosition() {
  const x = ref(0)
  const y = ref(0)

  function change(e: MouseEvent) {
    x.value = e.clientX
    y.value = e.clientY
  }

  document.addEventListener('mousemove', change)
  onBeforeUnmount(() => document.removeEventListener('mousemove', change))

  return {
    x,
    y
  }
}
```

而使用服务同样能达到同样的效果

```typescript
import { VueService, Autobind, VueComponent } from 'vue3-oop'
import { onBeforeUnmount } from 'vue'

class PositionService extends VueService {
  constructor() {
    super()
    window.addEventListener('mousemove', this.change)
    onBeforeUnmount(() => window.removeEventListener('mousemove', this.change))
  }

  @Mut() x = 0
  @Mut() y = 0

  @Autobind()
  private change(e: MouseEvent) {
    this.x = e.clientX
    this.y = e.clientY
  }
}

class Foo extends VueComponent {
  postionService = new PositionService()

  render() {
    return <div>{ this.postionService.x }</div>
  }
}
```


而双方的区别只是初始化的不一样， 但类天生自带类型，所以对类型非常友好，并且把 `.value`的问题解决掉,
服务与组件的区别：

- 继承的类不一样
- 少了几个组件特有的属性比如 `props`, `context`, 以及 `render` 函数， 其他都一样，


但假如你想在服务中获取属性和上下文可以使用 `useProps` 和 `useCtx`, 以及获取当前应用的实例 `getCurrentApp`
