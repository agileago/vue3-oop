import { getCurrentInstance, provide, VNodeChild, VNodeProps } from 'vue'
import { getEmitsFromProps, useCtx, useProps } from '@/helper'
import { Hanlder, VueComponentStaticContructor, WithSlotTypes, WithVModel, WithVSlots } from '@/type'
import { RefHandler } from '@/decorators/ref'
import { ComputedHandler } from '@/decorators/computed'
import { HookHandler } from '@/decorators/hook'
import { LinkHandler } from '@/decorators/link'

export const GlobalStoreKey = 'GlobalStoreKey'

type VueComponentProps<T extends Record<string, any>> = Omit<T, 'slots'> & WithVModel<T> & WithVSlots<T> & VNodeProps

export abstract class VueComponent<T = Record<string, any>> {
  /** 装饰器处理 */
  static handler: Hanlder[] = [RefHandler, ComputedHandler, LinkHandler, HookHandler]
  /** 是否自定义解析组件 */
  static resolveComponent?: any
  static __vccOpts__value?: any
  /** 组件option定义,vue3遇到类组件会从此属性获取组件的option */
  static get __vccOpts() {
    if (this.__vccOpts__value) return this.__vccOpts__value
    const CompConstructor = this as unknown as VueComponentStaticContructor

    return (this.__vccOpts__value = {
      ...CompConstructor,
      name: CompConstructor.displayName || CompConstructor.name,
      props: CompConstructor.defaultProps || {},
      inheritAttrs: CompConstructor.inheritAttrs,
      directives: CompConstructor.directives,
      // 放到emits的on函数会自动缓存
      emits: (CompConstructor.emits || []).concat(getEmitsFromProps(CompConstructor.defaultProps || {})),
      setup: (props: any, ctx: any) => {
        let instance: any
        if (CompConstructor.resolveComponent) {
          instance = CompConstructor.resolveComponent(CompConstructor)
        } else {
          instance = new CompConstructor()
        }
        return instance.render.bind(instance)
      },
    })
  }
  /** 是否作为全局store提供外部入口，此时会在 当前app上注入2个方法，用于获取此组件的服务 */
  static globalStore?: boolean
  /** 是否把自己当做服务provide出去，以便子组件可注入 */
  static ProviderKey?: string | symbol
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
  abstract render(): VNodeChild
  abstract render(ctx?: any): VNodeChild
  abstract render(ctx?: any, cache?: any[]): VNodeChild
}
