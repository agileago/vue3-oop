import '@abraham/reflection'
import { expect, test } from 'vitest'
import { Mut, VueComponent } from 'vue3-oop'
import { mount } from '@vue/test-utils'

test('Mut decorator', async () => {
  class CountComponent extends VueComponent {
    @Mut() count = 1
    render() {
      return <p onClick={() => this.count++}>{this.count}</p>
    }
  }
  // @ts-ignore
  const wrapper = mount(CountComponent)
  expect(wrapper.text()).toContain('1')
  await wrapper.get('p').trigger('click')
  expect(wrapper.text()).toContain('2')
})
