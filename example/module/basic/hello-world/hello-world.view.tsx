import { Mut, VueComponent } from 'vue3-oop'
import { Button, Card, Input } from 'ant-design-vue'
import { A } from './a.comp'

export class B extends A {
  placeholder = 'hello wolrd'
  done() {
    this.placeholder = Math.random().toString()
  }
}

export default class HelloWorldView extends VueComponent {
  @Mut() count = 1

  render() {
    return (
      <Card title={'加减功能'}>
        <B></B>
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
      </Card>
    )
  }
}
