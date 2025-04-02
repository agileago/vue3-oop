import { markRaw } from 'vue'
import { ComputedHandler } from '../decorators/computed'
import { HookHandler } from '../decorators/hook'
import { LinkHandler } from '../decorators/link'
import { MutHandler } from '../decorators/mut'
import type { Hanlder } from '../type'

export class VueService {
  static handler: Hanlder[] = [MutHandler, ComputedHandler, LinkHandler, HookHandler]
  constructor() {
    markRaw(this)
    VueService.handler.forEach(handler => handler.handler(this))
  }
}
