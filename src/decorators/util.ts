import { createSymbol } from '../helper'

export interface DecoratorFn<T, IsMethod = false> {
  (options: T): IsMethod extends false ? PropertyDecorator : MethodDecorator
  MetadataKey: string | symbol
}
export interface MetadataStore<T> {
  key: string | symbol
  options: T
  desc?: PropertyDescriptor | null
}

export function createDecorator<T = void>(name: string) {
  const metaName = `VUE3-OOP_${name.toUpperCase()}`
  const MetadataKey = createSymbol(metaName)
  const decoratorFn: DecoratorFn<T> = function (options: T) {
    return function (target: any, key: string | symbol) {
      let list: MetadataStore<T>[] = Reflect.getMetadata(MetadataKey, target) || []
      list = list.slice()
      const hasItem = list.find((k) => k.key === key)
      if (!hasItem) list.push({ key, options })
      else hasItem.options = options
      Reflect.defineMetadata(MetadataKey, list, target)
    }
  }
  decoratorFn.MetadataKey = MetadataKey
  Object.defineProperty(decoratorFn, 'MetadataKey', {
    get() {
      return MetadataKey
    },
  })
  return decoratorFn
}
export function getProtoMetadata<T = void>(target: any, key: symbol | string, withDesc = false): MetadataStore<T>[] {
  const proto = Object.getPrototypeOf(target)
  if (!proto) return []
  const res: MetadataStore<any>[] = Reflect.getMetadata(key, proto) || []
  if (withDesc) {
    res.forEach((k) => (k.desc = getDeepOwnDescriptor(proto, k.key)))
  }
  return res
}
export function getDeepOwnDescriptor(proto: any, key: string | symbol): PropertyDescriptor | null {
  if (!proto) return null
  const desc = Object.getOwnPropertyDescriptor(proto, key)
  if (desc) return desc
  return getDeepOwnDescriptor(Object.getPrototypeOf(proto), key)
}
