import '@abraham/reflection'
import { Component, Hook, Mut, VueComponent } from 'vue3-oop'
import { createApp } from 'vue'
import 'ant-design-vue/dist/antd.css'
import { ConfigProvider, Layout, Menu } from 'ant-design-vue'
import { RouterLink, RouterView } from 'vue-router'
import { RouterStartService } from './router'
import { routes } from './router/routes'
import zhCN from 'ant-design-vue/lib/locale/zh_CN'
import { setup } from './setup'

@Component({ providers: [RouterStartService] })
class App extends VueComponent {
  @Mut() collapsed = false

  @Hook('ErrorCaptured')
  error(...args: any[]) {
    console.log(args)
  }

  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Layout style={{ minHeight: '100vh' }}>
          <Layout.Sider v-model:collapsed={this.collapsed} collapsible>
            <h2
              onClick={() => {
                throw new Error('hahaha')
              }}
              style={{ color: '#fff', textAlign: 'center', lineHeight: '40px' }}
            >
              VUE 示例
            </h2>
            <Menu theme={'dark'} mode={'inline'}>
              {routes.map((r) => {
                return (
                  <Menu.SubMenu title={r.meta?.title} key={r.path}>
                    {r.children?.map((i) => {
                      return (
                        <Menu.Item key={i.path}>
                          <RouterLink to={i.path} style={{ display: 'block' }}>
                            {i.meta?.title}
                          </RouterLink>
                        </Menu.Item>
                      )
                    })}
                  </Menu.SubMenu>
                )
              })}
            </Menu>
          </Layout.Sider>
          <Layout.Content>
            <RouterView></RouterView>
          </Layout.Content>
        </Layout>
      </ConfigProvider>
    )
  }
}

const app = createApp(App)
setup(app)
app.mount('#app')
