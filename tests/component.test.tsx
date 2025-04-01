import '@abraham/reflection'
import { expect, test } from 'vitest'
import {
  type ComponentProps,
  type ComponentSlots,
  Mut,
  VueComponent,
} from 'vue3-oop'
import { mount } from '@vue/test-utils'
import { nextTick, type VNodeChild } from 'vue'

test('class component render', async () => {
  class CountComponent extends VueComponent {
    @Mut() count = 1
    render() {
      return <p>hello world {this.count}</p>
    }
  }

  const wrapper = mount(CountComponent)
  expect(wrapper.html()).toMatchSnapshot()
  wrapper.vm.count++
  await nextTick()
  expect(wrapper.html()).toMatchSnapshot()
})

test('class with props', async () => {
  interface CountProps {
    count: number
  }
  class CountComponent extends VueComponent<CountProps> {
    static defaultProps: ComponentProps<CountProps> = ['count']
    render() {
      return <div>{this.props.count}</div>
    }
  }

  const wrapper = mount(CountComponent, { props: { count: 1 } })
  expect(wrapper.text()).toContain('1')

  wrapper.vm.$props.count = 2
  await nextTick()
  expect(wrapper.text()).toContain('2')
})

test('带slots的组件', async () => {
  interface CountProps {
    slots: {
      item(name: string): VNodeChild
    }
  }
  class Count extends VueComponent<CountProps> {
    render() {
      return <div>{this.context.slots.item?.('aaa')}</div>
    }
  }

  const slots: ComponentSlots<Count> = {
    item(name: string): VNodeChild {
      return name
    },
  }

  // @ts-ignore
  const wrapper = mount(Count, { slots })
  expect(wrapper.text()).toContain('aaa')
})

test('init 组件初始化调用', async () => {
  class Count extends VueComponent {
    @Mut() count = 0

    init() {
      this.count = 1
    }

    render() {
      return <div>{this.count}</div>
    }
  }
  const wrapper = mount(Count)
  expect(wrapper.text()).toContain('1')
})
