import { Spin } from 'ant-design-vue'
import { Suspense } from 'vue'
import { RouterView } from 'vue-router'
import { Hook, VueComponent } from 'vue3-oop'

export default class BasicModule extends VueComponent {
  @Hook('Mounted')
  mounted() {
    console.log(this.$parent)
  }
  render() {
    return (
      <RouterView>
        {({ Component }: { Component: any }) => {
          return (
            <div>
              <h2>111</h2>
              <Suspense
                v-slots={{
                  default: () => [Component],
                  fallback: () => <Spin>loading....</Spin>,
                }}
              ></Suspense>
            </div>
          )
        }}
      </RouterView>
    )
  }
}
