import { Component } from '@/di'
import { VueComponent } from '@/index'
import { UserService } from './module/auth/user.service'
import { Button, Col, ConfigProvider, Row } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { RouterView } from 'vue-router'
import { RouterService } from './router/router.service'
import { http, HTTP_CLIENT } from './api/http'
import { CountService } from './count.service'

@Component({
  providers: [UserService, RouterService, { provide: HTTP_CLIENT, useValue: http }, CountService],
})
export class App extends VueComponent {
  constructor(
    private userService: UserService,
    private routerService: RouterService,
    private countService: CountService,
  ) {
    super()
  }
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <h2 style={{ textAlign: 'center' }}>全局服务</h2>
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
        <RouterView></RouterView>
      </ConfigProvider>
    )
  }
}
