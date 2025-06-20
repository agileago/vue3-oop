import { defineComponent as vueDefineComponent, type ComponentOptions } from 'vue'
import { useProps } from './composables'
import type { ComponentType, FunctionalComponent } from './types'

export { useClassAndStyle, camelizePropKey } from './composables'
export * from './types'

export function defineComponent<
  T extends Record<any, any>,
  S extends Record<any, any> = { [key: string]: any },
  M extends Record<any, any> = { [key: string]: any },
>(comp: FunctionalComponent<T, any, S>, extraOptions?: ComponentOptions): ComponentType<T, S, M> {
  const fn: FunctionalComponent = (_props, ctx) => {
    const props = useProps()
    return comp(props as any, ctx as any)
  }
  Object.keys(comp).forEach(key => {
    // @ts-expect-error
    fn[key] = comp[key]
  })
  return vueDefineComponent(fn, {
    inheritAttrs: false,
    name: comp.name || comp.displayName,
    ...extraOptions,
  }) as any
}
