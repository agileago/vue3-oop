import type { SetupContext } from 'vue'
import type { JSX } from 'vue/jsx-runtime'

interface IfProps {
  /*判断条件*/
  condition: any
}
export function If(props: IfProps, ctx: SetupContext) {
  if (!props.condition) return null
  return ctx.slots.default?.() as unknown as JSX.Element
}
