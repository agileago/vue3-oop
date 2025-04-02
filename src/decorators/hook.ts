import {
  onActivated,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onDeactivated,
  onErrorCaptured,
  onMounted,
  onRenderTracked,
  onRenderTriggered,
  onServerPrefetch,
  onUnmounted,
  onUpdated,
} from 'vue'
import type { Hanlder } from '../type'
import { createDecorator, getProtoMetadata } from './util'

type Lifecycle =
  | 'BeforeMount'
  | 'Mounted'
  | 'BeforeUpdate'
  | 'Updated'
  | 'BeforeUnmount'
  | 'Unmounted'
  | 'Activated'
  | 'Deactivated'
  | 'ErrorCaptured'
  | 'RenderTracked'
  | 'RenderTriggered'
  | 'ServerPrefetch'

export const Hook: HookDecorator = createDecorator('Hook', true)

export interface HookDecorator {
  (lifecycle: Lifecycle | Lifecycle[]): MethodDecorator
  MetadataKey: string | symbol
}

function handler(targetThis: any) {
  const list = getProtoMetadata<(Lifecycle | Lifecycle[])[]>(targetThis, Hook.MetadataKey)
  if (!list?.length) return
  for (const item of list) {
    let vueFn: any
    const doneLife: Record<string, true> = {}
    const options = item.options.slice()
    for (const option of options) {
      if (Array.isArray(option)) {
        options.push(...option)
        continue
      }
      if (doneLife[option]) continue
      switch (option) {
        case 'BeforeMount':
          vueFn = onBeforeMount
          break
        case 'Mounted':
          vueFn = onMounted
          break
        case 'BeforeUpdate':
          vueFn = onBeforeUpdate
          break
        case 'Updated':
          vueFn = onUpdated
          break
        case 'BeforeUnmount':
          vueFn = onBeforeUnmount
          break
        case 'Unmounted':
          vueFn = onUnmounted
          break
        case 'Activated':
          vueFn = onActivated
          break
        case 'Deactivated':
          vueFn = onDeactivated
          break
        case 'ErrorCaptured':
          vueFn = onErrorCaptured
          break
        case 'RenderTracked':
          vueFn = onRenderTracked
          break
        case 'RenderTriggered':
          vueFn = onRenderTriggered
          break
        case 'ServerPrefetch':
          vueFn = onServerPrefetch
          break
      }
      doneLife[option] = true
      vueFn((...args: any[]) => targetThis[item.key](...args))
    }
  }
}

export const HookHandler: Hanlder = {
  key: 'Hook',
  handler,
}
