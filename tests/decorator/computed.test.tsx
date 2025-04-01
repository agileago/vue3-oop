import '@abraham/reflection'
import { expect, test } from 'vitest'
import { Computed, Mut, VueComponent } from 'vue3-oop'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

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
  const wrapper = mount(CountComponent)
  const vm = wrapper.vm

  const p = wrapper.get('p')
  expect(p.text()).toContain('2')
  vm.count++
  await nextTick()
  expect(p.text()).toContain('4')
})
