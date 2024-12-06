import { Button, Card, Form, Input, Modal } from 'ant-design-vue'
import { Autobind, Mut, VueComponent } from 'vue3-oop'

class FormModel {
  name = ''
  age?: number
}

@Autobind()
export default class UserInputView extends VueComponent {
  @Mut() showModal = false
  @Mut() model = new FormModel()

  add() {
    this.showModal = true
  }

  render() {
    return (
      <Card title={'增删改查'}>
        <div>
          <Button type={'primary'} onClick={this.add} data-a={'111'}>
            增加
          </Button>
        </div>
        <Modal v-model:visible={this.showModal} title={'新增'}>
          <Form>
            <Form.Item label={'姓名'}>
              <Input v-model:value={this.model.name}></Input>
            </Form.Item>
            <Form.Item label={'年龄'}>
              <Input v-model:value={this.model.age}></Input>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    )
  }
}
