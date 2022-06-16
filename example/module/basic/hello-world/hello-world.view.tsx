import { Mut, VueComponent } from 'vue3-oop'
import { Button, Card, Input } from 'ant-design-vue'

export default class HelloWorldView extends VueComponent {
  @Mut() count = 1

  async init() {
    await new Promise((r) => setTimeout(r, 5000))
  }

  render() {
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
      </Card>
    )
  }
}
