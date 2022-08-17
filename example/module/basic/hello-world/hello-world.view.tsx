import { injectService, Mut, VueComponent } from 'vue3-oop'
import { Button, Card, Input } from 'ant-design-vue'
import { withModifiers } from 'vue'
import { RouterService } from '../../../router/router.service'

export class Base extends VueComponent {
  @Mut() count = 1
  render() {
    return <div>base{this.count}</div>
  }
}

export class Child1 extends Base {
  render() {
    return (
      <div onClick={withModifiers(() => this.count++, ['once'])}>
        {super.render()}
      </div>
    )
  }
}

export class Child2 extends Child1 {
  render() {
    return (
      <>
        <h2>this is child2</h2>
        {super.render()}
      </>
    )
  }
}

export default class HelloWorldView extends VueComponent {
  @Mut() count = 1

  async init() {
    await new Promise((r) => setTimeout(r, 5000))
  }

  router = injectService(RouterService)!

  render() {
    console.log(this.router)
    return (
      <Card title={'加减功能'}>
        <Button type={'primary'} onClick={() => this.count++}>
          +
        </Button>
        <Input
          v-model:value={this.count}
          style={{ width: '100px', textAlign: 'center' }}
        ></Input>
        <Button type={'primary'} onClick={() => this.count--}>
          -
        </Button>
        <Child2></Child2>
        <Child1></Child1>
        <Base></Base>
      </Card>
    )
  }
}
