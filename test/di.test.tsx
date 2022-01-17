import '@abraham/reflection'
import { expect, test } from 'vitest'
import { Component, Mut, VueComponent } from 'vue3-oop'
import { mount } from '@vue/test-utils'

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

  // @ts-ignore
  const wrapper = mount(CountComponent)
  expect(wrapper.text()).toContain('1')
})
