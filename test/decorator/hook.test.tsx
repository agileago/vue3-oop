import '@abraham/reflection'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import { Hook, VueComponent } from 'vue3-oop'
import { nextTick } from 'vue'

test('hook should work', async () => {
  const log: any = vi.spyOn(console, 'log')

  class Count extends VueComponent {
    @Hook('Mounted')
    mounted() {
      log(1)
    }

    render() {
      return <div>1111</div>
    }
  }

  const wrapper = mount(Count)
  await nextTick()
  expect(log).toHaveBeenCalled()
})
