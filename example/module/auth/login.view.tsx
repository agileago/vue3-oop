import { Component, VueComponent } from '@/index'
import { UserService } from './user.service'
import { Button, Col, Form, Input, Row } from 'ant-design-vue'
import { Ref } from '@/decorators/ref'
import { CatchLoading } from '../../common/decorators/catch.decorator'
import { Autobind } from '@/helper'
import { CountService } from '../../count.service'
import { SkipSelf } from 'injection-js'

@Component({
  providers: [CountService],
})
export default class LoginView extends VueComponent {
  constructor(
    private userService: UserService,
    @SkipSelf() private parentCountService: CountService,
    private countService: CountService,
  ) {
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
          <h3 style={{ textAlign: 'center' }}>全局的状态: {this.parentCountService.count}</h3>
          <h3 style={{ textAlign: 'center' }}>局部的状态</h3>
          <Row justify={'center'}>
            <Col>
              <Button type={'primary'} onClick={this.countService.add}>
                加
              </Button>
              <span style={{ fontSize: '24px', margin: '0 20px' }}>{this.countService.count}</span>
              <Button type={'primary'} danger onClick={this.countService.remove}>
                减
              </Button>
            </Col>
          </Row>
          <br />
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
