import '@abraham/reflection'
import { expect, test } from 'vitest'
import { Computed, Mut, VueComponent } from 'vue3-oop'
import { mount } from '@vue/test-utils'

class CountComponent extends VueComponent {
  @Mut() count = 1

  @Computed()
  get double() {
    return this.count * 2
  }

  render() {
    return (
      <div>
        <p>{this.double}</p>
      </div>
    )
  }
}

test('Computed decorator should work', async () => {
  // @ts-ignore
  const wrapper = mount(CountComponent)
  const vm = wrapper.vm as unknown as CountComponent

  const p = wrapper.get('p')
  expect(p.text()).toContain('2')
  vm.count++
  await vm.$nextTick()
  expect(p.text()).toContain('4')
})
