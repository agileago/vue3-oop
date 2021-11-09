import { Prop, provide, SetupContext, VNodeChild, VNodeProps } from 'vue'
import { getEmitsFromProps, useCtx, useProps } from '@/helper'
import { AnyContructor, Hanlder } from '@/type'
import { RefHandler } from '@/decorators/ref'
import { ComputedHandler } from '@/decorators/computed'
import { HookHandler } from '@/decorators/hook'
import { ProviderKey } from '@/extends/service'
import { LinkHandler } from '@/decorators/link'

export abstract class VueComponent<T = Record<string, any>> {
  static handler: Hanlder[] = [RefHandler, ComputedHandler, LinkHandler, HookHandler]
  static resolveComponent: any
  static __vccOpts__value: any
  static get __vccOpts() {
    if (this.__vccOpts__value) return this.__vccOpts__value
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const CompConstructor = this as unknown as AnyContructor

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

  /**
   * 主要给jsx提示用
   */
  get $props() {
    return this.props
  }

  /**
   * 组件属性
   */
  public props: T & VNodeProps & Record<string, any>
  /**
   * 组件上下文
   */
  public context: SetupContext

  constructor() {
    this.props = useProps<T & VNodeProps>()
    this.context = useCtx()
    this.context.expose(this)
    // @ts-ignore
    if (this.constructor[ProviderKey]) provide(this.constructor[ProviderKey], this)
    VueComponent.handler.forEach((handler) => handler.handler(this))
  }

  /**
   * 渲染函数
   */
  abstract render(): VNodeChild
  abstract render(ctx?: any): VNodeChild
  abstract render(ctx?: any, cache?: any[]): VNodeChild
}

export type ComponentProps<T extends Record<string, any>> = {
  [U in keyof T]-?: Prop<any>
}
