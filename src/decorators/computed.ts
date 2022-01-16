import { computed } from 'vue'
import { Hanlder } from '../type'
import { createDecorator, getProtoMetadata } from './util'

export const Computed: ComputedDecorator = createDecorator('Computed')

export interface ComputedDecorator {
  (): MethodDecorator
  /**
   * @param shallow 是否是浅层响应式
   */
  MetadataKey: string | symbol
}

function handler(targetThis: Record<any, any>) {
  const list = getProtoMetadata(targetThis, Computed.MetadataKey, true)
  if (!list || !list.length) return
  for (const item of list) {
    const desc = item.desc
    if (!desc) continue
    const keyVal = computed({
      get: () => desc.get?.call(targetThis),
      set: (v: any) => desc.set?.call(targetThis, v),
    })
    Object.defineProperty(targetThis, item.key, {
      enumerable: desc?.enumerable,
      configurable: true,
      get() {
        return keyVal.value
      },
      set(v: any) {
        keyVal.value = v
      },
    })
  }
}

export const ComputedHandler: Hanlder = {
  key: 'Computed',
  handler,
}
