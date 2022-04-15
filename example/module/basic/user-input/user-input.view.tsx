import { Card } from 'ant-design-vue'
import { VueComponent } from 'vue3-oop'

type A = {
  mode: 'selector'
  range: string[]
  slots: {
    abc(name: string): void
  }
}
type B = {
  mode: 'normal'
  list: number[]
  slots: {
    def(abc: number): void
  }
  value?: string
  'onUpdate:value'?: (v: string) => void
}

type C = B

class Union extends VueComponent<B> {
  render() {
    return <div>111</div>
  }
}

export default class UserInputView extends VueComponent {
  render() {
    return (
      <Card title={'增删改查'}>
        <Union mode="normal" list={[1]} style={{ display: 'block' }}></Union>
      </Card>
    )
  }
}
