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
import { Hanlder } from '@/type'
import { getProtoMetadata } from '@/helper'

interface HookItem {
  key: string | symbol
  lifecycle: Lifecycle
}

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

const MetadataKey = Symbol('Hook')

export function Hook(lifecycle: Lifecycle): MethodDecorator {
  return function (target: any, key: string | symbol) {
    let list: HookItem[] = Reflect.getMetadata(MetadataKey, target) || []
    list = list.slice()
    const hasItem = list.find((k) => k.key === key && k.lifecycle === lifecycle)
    if (!hasItem) list.push({ key, lifecycle })
    Reflect.defineMetadata(MetadataKey, list, target)
  }
}

function handler(targetThis: any) {
  const list: HookItem[] = getProtoMetadata(targetThis, MetadataKey)
  if (!list || !list.length) return
  for (const item of list) {
    let vueFn: any
    switch (item.lifecycle) {
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
    vueFn(() => targetThis[item.key]())
  }
}

export const HookHandler: Hanlder = {
  key: 'Hook',
  handler,
}
