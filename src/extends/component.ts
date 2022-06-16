import type {
  ComponentOptions,
  ComponentPublicInstance,
  InjectionKey,
  VNodeChild,
} from 'vue'
import { getCurrentInstance, markRaw, provide } from 'vue'
import { getEmitsFromProps, useCtx, useProps } from '../helper'
import type { Hanlder, VueComponentProps, WithSlotTypes } from '../type'
import { MutHandler } from '../decorators/mut'
import { ComputedHandler } from '../decorators/computed'
import { HookHandler } from '../decorators/hook'
import { LinkHandler } from '../decorators/link'
import { resolveComponent } from '../di'

export const GlobalStoreKey = 'GlobalStoreKey'
const hasOwnProperty = Object.prototype.hasOwnProperty
const hasOwn = (val: any, key: string) => hasOwnProperty.call(val, key)

export class VueComponent<T extends {} = {}> {
  /** 装饰器处理 */
  static handler: Hanlder[] = [
    MutHandler,
    ComputedHandler,
    LinkHandler,
    HookHandler,
  ]
  /** 是否自定义解析组件 */
  static resolveComponent = resolveComponent

  /** 热更新使用 */
  static __hmrId?: string
  /** 组件显示名字 */
  static displayName?: string
  /** 组件的属性定义 */
  static defaultProps?: any
  /** vue options emits */
  static emits?: string[]
  static __vccOpts__value?: ComponentOptions
  /** 组件option定义,vue3遇到类组件会从此属性获取组件的option */
  static __vccOpts: ComponentOptions
  /** 是否作为全局store提供外部入口，此时会在 当前app上注入2个方法，用于获取此组件的服务 */
  static globalStore?: boolean
  /** 是否把自己当做服务provide出去，以便子组件可注入 */
  static ProviderKey?: string | symbol | number | InjectionKey<any>
  /** 组件属性 */
  public props = useProps<VueComponentProps<T>>()
  /** 组件上下文 */
  public context = useCtx() as WithSlotTypes<T>

  // 公开的一些属性 publicPropertiesMap
  /** 组件内部实例，如果使用组件实例请 this.$.proxy */
  public $ = getCurrentInstance()!
  /** 主要给jsx提示用 */
  get $props() {
    return this.props
  }
  get $el() {
    return this.$.proxy!.$el
  }
  get $data() {
    return this.$.proxy!.$data
  }
  get $attrs() {
    return this.$.proxy!.$attrs
  }
  get $slots() {
    return this.$.proxy!.$slots
  }
  get $options() {
    return this.$.proxy!.$options
  }
  get $refs() {
    return this.$.proxy!.$refs
  }
  get $parent() {
    return this.$.proxy!.$parent
  }
  get $root() {
    return this.$.proxy!.$root
  }
  get $emit() {
    return this.$.proxy!.$emit
  }
  get $forceUpdate() {
    return this.$.proxy!.$forceUpdate
  }
  get $nextTick() {
    return this.$.proxy!.$nextTick
  }
  get $watch() {
    return this.$.proxy!.$watch
  }

  constructor() {
    markRaw(this)
    // 处理ref
    const current = this.$
    // 由于vue会包装一层，会自动代理ref,导致类型错误, 还导致不能修改变量
    current.exposed = this
    current.exposeProxy = this

    // 处理依赖注入
    const ThisConstructor = this.constructor as typeof VueComponent
    if (ThisConstructor.ProviderKey) provide(ThisConstructor.ProviderKey, this)
    if (ThisConstructor.globalStore) {
      // 如果作为全局的服务，则注入到根上面
      const app = current.appContext.app
      app.provide(GlobalStoreKey, this)
      app.getStore = () => this
      app.getService = (token) => {
        if (
          (typeof token === 'function' || typeof token === 'object') &&
          'ProviderKey' in token
        ) {
          token = token.ProviderKey
        }
        // @ts-ignore
        return current?.provides[token]
      }
    }

    VueComponent.handler.forEach((handler) => handler.handler(this))
  }

  /** 渲染函数 */
  render?(ctx: ComponentPublicInstance, cache: any[]): VNodeChild

  /* 组件初始化逻辑，如果返回promise则为异步组件, 需配合 suspense 组件使用 */
  init?(): any
}
// 某些浏览器不支持 static get
Object.defineProperty(VueComponent, '__vccOpts', {
  enumerable: true,
  configurable: true,
  get() {
    const parentOpt = this.__vccOpts__value
    if (parentOpt && hasOwn(this, '__vccOpts__value')) return parentOpt
    const CompConstructor = this as typeof VueComponent
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { displayName, defaultProps, emits, ...rest } = CompConstructor

    // 处理继承
    if (parentOpt) {
      const mergeopt: ComponentOptions = {
        ...parentOpt,
        ...rest,
        name: displayName || CompConstructor.name,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setup: (props: any, ctx: any) => {
          const instance = VueComponent.resolveComponent(CompConstructor)
          // 支持模板
          if (CompConstructor.__vccOpts__value!.render) return instance
          // 支持异步组件
          if (typeof instance.init === 'function') {
            console.log('init func')
            const res = instance.init()
            if (
              res &&
              typeof res === 'object' &&
              typeof res.then === 'function'
            ) {
              return res.then(() => instance.render.bind(instance))
            }
          }

          return instance.render.bind(instance)
        },
      }
      if (defaultProps) mergeopt.props = defaultProps
      if (emits) mergeopt.emits = emits

      this.__vccOpts__value = mergeopt
      return this.__vccOpts__value
    }

    this.__vccOpts__value = {
      ...rest,
      name: displayName || CompConstructor.name,
      props: defaultProps || {},
      // 放到emits的on函数会自动缓存
      emits: (emits || []).concat(
        getEmitsFromProps(CompConstructor.defaultProps || {})
      ),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setup: (props: any, ctx: any) => {
        const instance = VueComponent.resolveComponent(CompConstructor)
        // 支持模板
        if (CompConstructor.__vccOpts__value!.render) return instance

        // 支持异步组件
        if (typeof instance.init === 'function') {
          const res = instance.init()
          if (
            res &&
            typeof res === 'object' &&
            typeof res.then === 'function'
          ) {
            return res.then(() => instance.render.bind(instance))
          }
        }

        return instance.render.bind(instance)
      },
    }
    return this.__vccOpts__value
  },
})

// 处理forwardref
export function useForwardRef() {
  const instance = getCurrentInstance()!
  function forwardRef(ref: any) {
    instance.exposed = ref
    instance.exposeProxy = ref
  }
  return forwardRef
}
