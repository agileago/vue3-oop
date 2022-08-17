import { MutHandler } from '../decorators/mut'
import { ComputedHandler } from '../decorators/computed'
import { HookHandler } from '../decorators/hook'
import { markRaw } from 'vue'
import type { Hanlder } from '../type'
import { LinkHandler } from '../decorators/link'

export class VueService {
  static handler: Hanlder[] = [
    MutHandler,
    ComputedHandler,
    LinkHandler,
    HookHandler,
  ]
  constructor() {
    markRaw(this)
    VueService.handler.forEach((handler) => handler.handler(this))
  }
}
