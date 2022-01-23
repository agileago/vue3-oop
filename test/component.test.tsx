import '@abraham/reflection'
import { expect, test } from 'vitest'
import type { ComponentProps } from 'vue3-oop'
import { VueComponent } from 'vue3-oop'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

test('class component render', () => {
  class CountComponent extends VueComponent {
    render() {
      return <p>hello world</p>
    }
  }
  // @ts-ignore
  const wrapper = mount(CountComponent)
  expect(wrapper.text()).toContain('hello')
})

interface CountProps {
  count: number
}

test('class with props', async () => {
  class CountComponent extends VueComponent<CountProps> {
    static defaultProps: ComponentProps<CountProps> = ['count']
    render() {
      return <div>{this.props.count}</div>
    }
  }
  // @ts-ignore
  const wrapper = mount(CountComponent, { props: { count: 1 } })
  expect(wrapper.text()).toContain('1')
  // @ts-ignore
  wrapper.vm.$props.count = 2
  await nextTick()
  expect(wrapper.text()).toContain('2')
})
