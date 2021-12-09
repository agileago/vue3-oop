import { RefHandler } from '../decorators/ref'
import { ComputedHandler } from '../decorators/computed'
import { HookHandler } from '../decorators/hook'
import { provide } from 'vue'
import { Hanlder, VueComponentStaticContructor } from '../type'
import { LinkHandler } from '../decorators/link'

export const ProviderKey = 'ProviderKey' as const

export abstract class VueService {
  static handler: Hanlder[] = [RefHandler, ComputedHandler, LinkHandler, HookHandler]
  public constructor() {
    const ThisConstructor = this.constructor as VueComponentStaticContructor
    if (ThisConstructor.ProviderKey) provide(ThisConstructor.ProviderKey, this)
    VueService.handler.forEach((handler) => handler.handler(this))
  }
}
