import '@abraham/reflection'
import { Component, Hook, Link, mergeRefs, Mut, VueComponent } from 'vue3-oop'
import { createApp, shallowRef } from 'vue'
import 'ant-design-vue/dist/antd.css'
import { ConfigProvider, Layout, Menu } from 'ant-design-vue'
import { RouterLink, RouterView } from 'vue-router'
import { RouterStartService } from './router'
import { routes } from './router/routes'
import zhCN from 'ant-design-vue/lib/locale/zh_CN'
import { setup } from './setup'

class Child extends VueComponent {
  @Hook('Mounted')
  mounted() {
    console.log('child mounted')
  }
  render() {
    console.log('child render')
    return <div>child</div>
  }
}

@Component({ providers: [RouterStartService] })
class App extends VueComponent {
  constructor(private a: RouterStartService) {
    super()
  }

  @Mut() collapsed = false

  cc = shallowRef()

  @Hook('ErrorCaptured')
  error(...args: any[]) {
    console.log(args)
  }

  @Link() aaa?: any

  @Hook('Mounted')
  mounted() {
    console.log(this.aaa, this.cc)
  }

  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Layout style={{ minHeight: '100vh' }}>
          <Layout.Sider v-model:collapsed={this.collapsed} collapsible>
            <h2
              ref={mergeRefs('aaa', this.cc)}
              onClick={() => {
                throw new Error('hahaha')
              }}
              style={{ color: '#fff', textAlign: 'center', lineHeight: '40px' }}
            >
              VUE 示例
            </h2>
            <Child
              abc={this.collapsed}
              ref={(value, refs) => {
                console.log(value, refs)
              }}
            ></Child>
            <Menu theme={'dark'} mode={'inline'}>
              {routes.map((r) => {
                return (
                  <Menu.SubMenu title={r.meta?.title} key={r.path}>
                    {'children' in r &&
                      r.children?.map((i) => {
                        return (
                          <Menu.Item key={i.path}>
                            <RouterLink
                              to={i.path}
                              style={{ display: 'block' }}
                            >
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
