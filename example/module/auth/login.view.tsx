import { VueComponent } from '@/extends/component'
import { Component } from '@/di'
import { UserService } from './user.service'
import { Button, Col, Form, Input, Row } from 'ant-design-vue'
import { Ref } from '@/decorators/ref'
import { CatchLoading } from '../../common/decorators/catch.decorator'
import { Autobind } from '@/helper'

@Component()
export default class LoginView extends VueComponent {
  constructor(private userService: UserService) {
    super()
  }
  @Ref() loading = false
  @Ref() model = {
    name: '',
    pwd: '',
  }
  rules = {
    name: [{ required: true, message: '请输入账号' }],
    pwd: [{ required: true, message: '请输入密码' }],
  }

  @Autobind()
  @CatchLoading('loading')
  async submit() {
    await this.userService.login(this.model)
  }

  render() {
    return (
      <Row type={'flex'} justify={'center'} align={'middle'} style={{ height: '80%' }}>
        <Col span={12}>
          <Form labelCol={{ span: 6 }} model={this.model} rules={this.rules} onFinish={this.submit}>
            <Form.Item label={'用户名'} name={'name'}>
              <Input v-model={[this.model.name, 'value']}></Input>
            </Form.Item>
            <Form.Item label={'密码'} name={'pwd'}>
              <Input type={'password'} v-model={[this.model.pwd, 'value']}></Input>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
              <Button type={'primary'} htmlType={'submit'} block loading={this.loading}>
                提交
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    )
  }
}
