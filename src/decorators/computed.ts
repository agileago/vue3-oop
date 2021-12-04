import { computed } from 'vue'
import { Hanlder } from '@/type'
import { getProtoMetadata } from '@/helper'

interface ComputedItem {
  key: string | symbol
  desc: PropertyDescriptor
}

const MetadataKey = Symbol('Computed')
export function Computed(): MethodDecorator {
  return function (target: any, key: string | symbol) {
    let list: (string | symbol)[] = Reflect.getMetadata(MetadataKey, target) || []
    list = list.slice()
    const hasItem = list.find((k) => k === key)
    if (!hasItem) list.push(key)
    Reflect.defineMetadata(MetadataKey, list, target)
  }
}

function handler(targetThis: Record<any, any>) {
  const list: ComputedItem[] = getProtoMetadata(targetThis, MetadataKey, true)
  if (!list || !list.length) return
  for (const item of list) {
    const desc = item.desc
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
