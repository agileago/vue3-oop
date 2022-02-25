import type { WatchOptionsBase } from 'vue'
import { computed, shallowRef, watchEffect } from 'vue'
import type { Hanlder } from '../type'
import { createDecorator, getProtoMetadata } from './util'

export const Computed: ComputedDecorator = createDecorator('Computed')

type EagerType = true | WatchOptionsBase['flush']

export interface ComputedDecorator {
  /**
   * @param eager 是否是急切的获取值
   */
  (eager?: EagerType): MethodDecorator
  /**
   * @param shallow 是否是浅层响应式
   */
  MetadataKey: string | symbol
}

function handler(targetThis: Record<any, any>) {
  const list = getProtoMetadata<EagerType>(
    targetThis,
    Computed.MetadataKey,
    true
  )
  if (!list || !list.length) return
  for (const item of list) {
    const desc = item.desc
    const option = item.options
    if (!desc) continue
    let keyVal: any
    if (option) {
      // eager computed
      keyVal = shallowRef()
      watchEffect(
        () => {
          try {
            keyVal.value = desc.get?.call(targetThis)
          } finally {
          }
        },
        {
          flush: option === true ? 'sync' : option,
        }
      )
    } else {
      keyVal = computed({
        get: () => desc.get?.call(targetThis),
        set: (v: any) => desc.set?.call(targetThis, v),
      })
    }
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
