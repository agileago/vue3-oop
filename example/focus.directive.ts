import type { Directive } from 'vue'

export const focusDirective: Directive = {
  mounted(el: HTMLInputElement, binding) {
    console.log(binding)
    el.focus()
  },
}
