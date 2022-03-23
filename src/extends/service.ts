import { MutHandler } from '../decorators/mut'
import { ComputedHandler } from '../decorators/computed'
import { HookHandler } from '../decorators/hook'
import type { InjectionKey } from 'vue'
import { markRaw, provide } from 'vue'
import type { Hanlder } from '../type'
import { LinkHandler } from '../decorators/link'

export const ProviderKey = 'ProviderKey' as const

export class VueService {
  /** 注入的key */
  static ProviderKey?: string | symbol | number | InjectionKey<any>
  static handler: Hanlder[] = [
    MutHandler,
    ComputedHandler,
    LinkHandler,
    HookHandler,
  ]
  constructor() {
    markRaw(this)
    const ThisConstructor = this.constructor as typeof VueService
    if (ThisConstructor.ProviderKey) provide(ThisConstructor.ProviderKey, this)
    VueService.handler.forEach((handler) => handler.handler(this))
  }
}
