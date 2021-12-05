import { Injectable, Provider, ReflectiveInjector, resolveDependencies } from 'injection-js'
import { getCurrentInstance, inject, InjectionKey, provide } from 'vue'

export const InjectorKey: InjectionKey<ReflectiveInjector> = Symbol('ReflectiveInjector')
const MetadataKey = Symbol('Component')

declare module 'vue' {
  interface App {
    getStore(): any
    getService(token: any): any
  }
}

export interface ComponentOptions {
  /**
   * 依赖的服务
   */
  providers?: Provider[]
  /**
   * 排除掉的服务
   */
  exclude?: Provider[]
  /**
   * 自动分析依赖
   */
  autoResolveDeps?: boolean
  /**
   * 此注入器是否作为全局的store
   */
  globalStore?: boolean
}

export function Component(options?: ComponentOptions): ClassDecorator {
  return function (target: any) {
    if (!target.resolveComponent) target.resolveComponent = resolveComponent
    Reflect.defineMetadata(MetadataKey, options, target)
    return Injectable()(target)
  }
}

export function resolveComponent(target: { new (...args: []): any }) {
  // 如果没有使用 injection-js 则不创建注入器
  if (!Reflect.getMetadata('annotations', target)) return new target()
  const parent = inject(InjectorKey, undefined)
  const options: ComponentOptions | undefined = Reflect.getOwnMetadata(MetadataKey, target)
  // 自动解析依赖,根据组件
  let deps: Provider[] = options?.autoResolveDeps ? resolveDependencies(target) : options?.providers || []
  if (!deps.includes(target)) deps.unshift(target)
  if (options?.exclude?.length) {
    deps = deps.filter((k) => !options.exclude?.includes(k))
  }
  const injector = ReflectiveInjector.resolveAndCreate(deps, parent)
  if (options?.globalStore) {
    // 如果作为全局的服务，则注入到根上面
    const current = getCurrentInstance()!
    const app = current.appContext.app
    // todo 此处需判断重复
    app.provide(InjectorKey, injector)
    app.getStore = () => injector
    app.getService = (token) => injector.get(token)
  } else {
    provide(InjectorKey, injector)
  }
  return injector.get(target)
}
