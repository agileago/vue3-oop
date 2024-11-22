import {
  type ComponentOptions,
  defineComponent as vueDefineComponent,
} from 'vue'
import type { ComponentType, FunctionalComponent } from './types'
import { useProps } from './composables'

export {
  type ClassAndStyle,
  useClassAndStyle,
  camelizePropKey,
} from './composables'
export * from './types'

export function defineComponent<T extends Record<any, any>>(
  comp: FunctionalComponent<T, any, any>,
  extraOptions?: ComponentOptions,
): ComponentType<T> {
  const fn: FunctionalComponent = (_props, ctx) => {
    const props = useProps()
    return comp(props as any, ctx)
  }
  Object.keys(comp).forEach((key) => {
    // @ts-expect-error
    fn[key] = comp[key]
  })
  return vueDefineComponent(fn, {
    inheritAttrs: false,
    name: comp.name || comp.displayName,
    ...extraOptions,
  }) as any
}
