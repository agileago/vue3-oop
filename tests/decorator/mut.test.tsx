import '@abraham/reflection'
import { expect, test } from 'vitest'
import { Mut, VueComponent } from 'vue3-oop'
import { mount } from '@vue/test-utils'
import type { CustomRefFactory } from 'vue'

const debounceRef: CustomRefFactory<any> = (track, trigger) => {
  let value: any
  let timeout: number
  return {
    get() {
      track()
      return value
    },
    set(v) {
      if (value === undefined) {
        value = v
        return
      }
      clearTimeout(timeout)
      timeout = window.setTimeout(() => {
        value = v
        trigger()
      }, 1000)
    },
  }
}
const delay = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout))

class CountComponent extends VueComponent {
  @Mut() count = 1
  // shallow ref
  @Mut(true) obj = { count: 1 }
  // custom ref
  @Mut(debounceRef) count1 = 1

  render() {
    return (
      <div>
        <p onClick={() => this.count++}>{this.count}</p>
        <div id="shallow" onClick={() => this.obj.count++}>
          {this.obj.count}
        </div>
        <div id="custom" onClick={() => this.count1++}>
          {this.count1}
        </div>
      </div>
    )
  }
}

test('Mut decorator should work', async () => {
  const wrapper = mount(CountComponent)

  const p = wrapper.get('p')
  expect(p.text()).toContain('1')
  await p.trigger('click')
  expect(p.text()).toContain('2')
})

test('mut: shallow ref', async () => {
  const wrapper = mount(CountComponent)
  const vm = wrapper.vm as unknown as CountComponent

  const shallow = wrapper.get('#shallow')
  expect(shallow.text()).toContain('1')
  await shallow.trigger('click')
  expect(shallow.text()).toContain('1')

  vm.obj = { count: 2 }
  await vm.$nextTick()
  console.log(shallow.text())
  expect(shallow.text()).toContain('2')
})

test('mut: custom ref', async () => {
  const wrapper = mount(CountComponent)
  // custom ref
  const custom = wrapper.get('#custom')
  expect(custom.text()).toContain('1')
  await custom.trigger('click')
  expect(custom.text()).toContain('1')
  await delay(1000)
  expect(custom.text()).toContain('2')
})
