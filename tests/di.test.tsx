import '@abraham/reflection'
import { expect, test } from 'vitest'
import { Component, getCurrentInjector, Mut, VueComponent, VueService } from 'vue3-oop'
import { mount } from '@vue/test-utils'
import { Injector } from 'injection-js'

test('di should work', () => {
  class CountService {
    @Mut() count = 1
    add = () => this.count++
  }
  @Component()
  class CountComponent extends VueComponent {
    constructor(private countService: CountService) {
      super()
    }

    render() {
      const { countService } = this
      return <div onClick={countService.add}>{countService.count}</div>
    }
  }

  const wrapper = mount(CountComponent)
  expect(wrapper.text()).toContain('1')
})

test('外部服务应该可以获取到注射器', () => {
  class OutSideService extends VueService {
    injector = getCurrentInjector()
  }

  @Component()
  class Foo extends VueComponent {
    constructor(public injector: Injector) {
      super()
    }
    outSideService = new OutSideService()
    render() {
      return <div>1111</div>
    }
  }

  const wrapper = mount(Foo)
  const vm = wrapper.vm
  expect(vm.injector).toStrictEqual(vm.outSideService.injector)
})
