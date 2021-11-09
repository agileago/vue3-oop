import '@abraham/reflection'
import { createApp } from 'vue'
import { VueComponent } from '@/extends/component'
import { RouterView } from 'vue-router'
import { setupRouter } from './router'
import { Component } from '@/di'
import { UserService } from './module/auth/user.service'
import './theme/app.css'
import 'ant-design-vue/dist/antd.css'
import { Button, ConfigProvider, Table } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { setupHttp } from './api/http'

@Component({ autoResolveDeps: true, globalStore: true })
class App extends VueComponent {
  constructor(private userService: UserService) {
    super()
  }
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <h2 style={{ textAlign: 'center' }}>全局服务</h2>
        <RouterView></RouterView>
      </ConfigProvider>
    )
  }
}

const app = createApp(App)
setupRouter(app)
setupHttp(app)
app.mount('#app')
