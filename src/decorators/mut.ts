import type { Ref } from 'vue'
import { customRef, ref, shallowRef } from 'vue'
import type { Hanlder } from '../type'
import { createDecorator, getProtoMetadata } from './util'

export const Mut: MutDecorator = createDecorator<MutOptions>('Mut')

type MutOptions = void | true | Parameters<typeof customRef>[0]
type RefFactory = Parameters<typeof customRef>[0]
export interface MutDecorator {
  (): PropertyDecorator
  /**
   * @param shallow 是否是浅层响应式
   */
  (shallow: true): PropertyDecorator
  /**
   * 自定义ref 的实现
   * @param refFactory
   */
  (refFactory: RefFactory): PropertyDecorator
  MetadataKey: string | symbol
}

function handler(targetThis: Record<string | symbol, any>) {
  const list = getProtoMetadata<MutOptions>(targetThis, Mut.MetadataKey)
  if (!list || !list.length) return
  for (const item of list) {
    const { options, key } = item
    let keyVal: Ref
    if (options === true) {
      keyVal = shallowRef()
    } else if (typeof options === 'function') {
      keyVal = customRef(options)
    } else {
      keyVal = ref()
    }
    Object.defineProperty(targetThis, key, {
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
