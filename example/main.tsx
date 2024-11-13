import '@abraham/reflection'
import 'ant-design-vue/dist/reset.css'
import {
  Component,
  type ComponentProps,
  Hook,
  injectService,
  Link,
  mergeRefs,
  Mut,
  provideService,
  VueComponent,
} from 'vue3-oop'
import { createApp, defineComponent, ref, shallowRef } from 'vue'
import { ConfigProvider, Layout, Menu } from 'ant-design-vue'
import { RouterLink, RouterView } from 'vue-router'
import { RouterStartService } from './router'
import { routes } from './router/routes'
import zhCN from 'ant-design-vue/lib/locale/zh_CN'
import { setup } from './setup'

class AService {
  height = ref(0)
}

const A1 = defineComponent(() => {
  provideService(new AService())
  return () => (
    <div>
      <A2></A2>
    </div>
  )
})

const A2 = defineComponent(() => {
  const a = injectService(AService)
  console.log(11111, a)
  return () => <div>111 {a.height.value}</div>
})

interface ChildProps {
  value?: string
  'onUpdate:value'?: (val: string) => any
}

class Child extends VueComponent<ChildProps> {
  static defaultProps: ComponentProps<ChildProps> = ['value', 'onUpdate:value']
  @Hook('Mounted')
  mounted() {
    console.log('child mounted')
  }
  render() {
    console.log('child render')
    return <div>child</div>
  }
}

@Component({
  providers: [RouterStartService],
})
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
            <A1></A1>
          </Layout.Content>
        </Layout>
      </ConfigProvider>
    )
  }
}

const app = createApp(App)
setup(app)
app.mount('#app')
