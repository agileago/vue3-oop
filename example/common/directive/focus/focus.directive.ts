import type { Directive } from 'vue'

const focusDirective: Directive<HTMLElement, void> & { name: string } = {
  name: 'focus',
  mounted(el, binding) {
    el.focus()
    console.log(binding.instance)
  },
}

export default focusDirective
