import '@abraham/reflection'
import { createCurrentInjector, Mut, VueComponent } from 'vue3-oop'
import { createApp } from 'vue'
import 'ant-design-vue/dist/antd.css'
import { Layout, Menu } from 'ant-design-vue'
import { RouterLink, RouterView } from 'vue-router'
import { RouterStartService } from './router'
import { routes } from './router/routes'

class App extends VueComponent {
  injector = createCurrentInjector([RouterStartService])
  @Mut() collapsed = false
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Layout.Sider v-model:collapsed={this.collapsed} collapsible>
          <h2
            style={{ color: '#fff', textAlign: 'center', lineHeight: '40px' }}
          >
            VUE EXAMPLE
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
    )
  }
}

const app = createApp(App)
app.mount('#app')
