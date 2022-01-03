import {
  AllowedComponentProps,
  ComponentPublicInstance,
  getCurrentInstance,
  InjectionKey,
  provide,
  VNodeChild,
  VNodeProps,
} from 'vue'
import { getEmitsFromProps, useCtx, useProps } from '../helper'
import { Hanlder, VueComponentStaticContructor, WithSlotTypes, WithVModel, WithVSlots } from '../type'
import { MutHandler } from '../decorators/mut'
import { ComputedHandler } from '../decorators/computed'
import { HookHandler } from '../decorators/hook'
import { LinkHandler } from '../decorators/link'
import { resolveComponent } from '../di'
import { ComponentOptions } from '@vue/runtime-core'

export const GlobalStoreKey = 'GlobalStoreKey'

type VueComponentProps<T extends {}> = Omit<T, 'slots'> &
  WithVModel<T> &
  WithVSlots<T> &
  VNodeProps &
  AllowedComponentProps &
  Record<string, unknown>

export abstract class VueComponent<T extends {} = {}> {
  /** 热更新使用 */
  static __hmrId?: string
  /** 装饰器处理 */
  static handler: Hanlder[] = [MutHandler, ComputedHandler, LinkHandler, HookHandler]
  /** 是否自定义解析组件 */
  static resolveComponent = resolveComponent
  private static __vccOpts__value?: ComponentOptions
  /** 组件option定义,vue3遇到类组件会从此属性获取组件的option */
  static get __vccOpts(): ComponentOptions {
    if (this.__vccOpts__value) return this.__vccOpts__value
    const CompConstructor = this as unknown as VueComponentStaticContructor
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { displayName, defaultProps, emits, ProviderKey, globalStore, ...left } = CompConstructor

    return (this.__vccOpts__value = {
      ...left,
      name: displayName || CompConstructor.name,
      props: defaultProps || {},
      // 放到emits的on函数会自动缓存
      emits: (emits || []).concat(getEmitsFromProps(CompConstructor.defaultProps || {})),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setup: (props: any, ctx: any) => {
        const instance = VueComponent.resolveComponent(CompConstructor)
        return instance.render.bind(instance)
      },
    })
  }
  /** 是否作为全局store提供外部入口，此时会在 当前app上注入2个方法，用于获取此组件的服务 */
  static globalStore?: boolean
  /** 是否把自己当做服务provide出去，以便子组件可注入 */
  static ProviderKey?: string | symbol | number | InjectionKey<any>
  /** 主要给jsx提示用 */
  get $props() {
    return this.props
  }
  /** 组件属性 */
  public props: VueComponentProps<T>
  /** 组件上下文 */
  public context: WithSlotTypes<T>

  constructor() {
    this.props = useProps<VueComponentProps<T>>()
    this.context = useCtx() as WithSlotTypes<T>
    this.context.expose(this)
    const ThisConstructor = this.constructor as VueComponentStaticContructor
    if (ThisConstructor.ProviderKey) provide(ThisConstructor.ProviderKey, this)
    if (ThisConstructor.globalStore) {
      // 如果作为全局的服务，则注入到根上面
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const current = getCurrentInstance()!
      const app = current.appContext.app
      app.provide(GlobalStoreKey, this)
      app.getStore = () => this
      app.getService = (token) => {
        if ((typeof token === 'function' || typeof token === 'object') && 'ProviderKey' in token) {
          token = token.ProviderKey
        }
        // @ts-ignore
        return current?.provides[token]
      }
    }
    VueComponent.handler.forEach((handler) => handler.handler(this))
  }

  /** 渲染函数 */
  abstract render(ctx: ComponentPublicInstance, cache: any[]): VNodeChild
}
