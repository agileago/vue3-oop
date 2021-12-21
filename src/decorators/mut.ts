import { ref } from 'vue'
import { Hanlder } from '../type'
import { getProtoMetadata } from '../helper'

const MetadataKey = Symbol('Mut')

export function Mut(): PropertyDecorator {
  return function (target: any, key: string | symbol) {
    let list: (string | symbol)[] = Reflect.getMetadata(MetadataKey, target) || []
    list = list.slice()
    const hasItem = list.find((k) => k === key)
    if (!hasItem) list.push(key)
    Reflect.defineMetadata(MetadataKey, list, target)
  }
}

function handler(targetThis: Record<any, any>) {
  const list: (string | symbol)[] = getProtoMetadata(targetThis, MetadataKey)
  if (!list || !list.length) return
  for (const item of list) {
    const keyVal = ref()
    Object.defineProperty(targetThis, item, {
      enumerable: true,
      configurable: true,
      get() {
        return keyVal.value
      },
      set(v) {
        keyVal.value = v
      },
    })
  }
}

export const MutHandler: Hanlder = {
  key: 'Mut',
  handler,
}

/**
 * @deprecated 因与vue的ref冲突，故改名为 Mut
 */
export function Ref() {
  return Mut()
}
