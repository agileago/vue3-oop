import { getCurrentInstance } from 'vue'
import type { Hanlder } from '../type'
import { createDecorator, getProtoMetadata } from './util'

export const Link: LinkDecorator = createDecorator('Link')
export interface LinkDecorator {
  (refName?: string): PropertyDecorator
  MetadataKey: symbol | string
}

function handler(targetThis: Record<any, any>) {
  const list = getProtoMetadata<string | undefined>(
    targetThis,
    Link.MetadataKey,
  )
  if (!list || !list.length) return
  for (const item of list) {
    const { key, options } = item
    const instance = getCurrentInstance()
    Object.defineProperty(targetThis, key, {
      enumerable: true,
      configurable: true,
      get() {
        return instance?.refs?.[(options || key) as string]
      },
    })
  }
}

export const LinkHandler: Hanlder = {
  key: 'Link',
  handler,
}
