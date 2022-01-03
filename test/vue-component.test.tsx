import '@abraham/reflection'
import { expect, test } from 'vitest'
import { Mut, VueComponent } from 'vue3-oop'
import { mount } from '@vue/test-utils'

class CountComponent extends VueComponent {
  @Mut() count = 1

  render() {
    return <div onClick={() => this.count++}>{this.count}</div>
  }
}

test('class component init', async () => {
  // @ts-ignore
  const wrapper = mount(CountComponent)
  expect(wrapper.text()).toContain('1')
  await wrapper.get('div').trigger('click')
  expect(wrapper.text()).toContain('2')
})
