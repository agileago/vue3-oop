import type { Directive } from 'vue'

const focusDirective: Directive<HTMLElement, void> & { name: string } = {
  name: 'focus',
  mounted(el) {
    el.focus()
  },
}

export default focusDirective
