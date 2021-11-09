import { RefHandler } from '@/decorators/ref'
import { ComputedHandler } from '@/decorators/computed'
import { HookHandler } from '@/decorators/hook'
import { getCurrentInstance, InjectionKey, provide } from 'vue'
import { Hanlder } from '@/type'
import { LinkHandler } from '@/decorators/link'

export const ProviderKey = 'ProviderKey'

export abstract class VueService {
  static handler: Hanlder[] = [RefHandler, ComputedHandler, LinkHandler, HookHandler]
  constructor() {
    // 自动provide service
    // @ts-ignore
    if (this.constructor[ProviderKey]) provide(this.constructor[ProviderKey], this)
    VueService.handler.forEach((handler) => handler.handler(this))
  }
}

export abstract class VueGlobalService extends VueService {
  static get<T = any>(token: string | symbol): T
  static get<T = any>(token: InjectionKey<T>): T
  static get<
    T extends {
      new (...args: any[]): InstanceType<T>
      ProviderKey: InjectionKey<T>
    },
  >(token: T): InstanceType<T>
  static get(token: any) {
    if ((typeof token === 'function' || typeof token === 'object') && 'ProviderKey' in token) {
      token = token.ProviderKey
    }
    // @ts-ignore
    const instance = this.__instance
    // @ts-ignore
    return instance?.provides[token]
  }
  static getSelf<T extends { new (...args: any[]): any }>(this: T): InstanceType<T> {
    // @ts-ignore
    return this.__self as unknown as InstanceType<T>
  }
  public constructor() {
    super()
    const Constructor = this.constructor
    // @ts-ignore
    Constructor.__self = this
    // @ts-ignore
    Constructor.__instance = getCurrentInstance()
  }
}
