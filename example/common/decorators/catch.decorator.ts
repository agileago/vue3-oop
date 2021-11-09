import { message } from 'ant-design-vue'

export function CatchLoading(loadingKey?: string): MethodDecorator {
  return function (target: any, key: string | symbol, desc: PropertyDescriptor) {
    const value = desc.value
    if (typeof value !== 'function') {
      throw new TypeError(`${key as string} prop should be a function`)
    }
    desc.value = async function (this: any, ...args: any[]) {
      if (loadingKey && this[loadingKey]) return
      if (loadingKey) this[loadingKey] = true
      try {
        await value.apply(this, args)
      } catch (e: any) {
        console.error(e)
        message.error(e.message)
      } finally {
        if (loadingKey) this[loadingKey] = false
      }
    }
  }
}
