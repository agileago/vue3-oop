import type { ClassProvider, Provider, ResolvedReflectiveProvider, TypeProvider } from 'injection-js'
import { Injectable, InjectionToken, ReflectiveInjector, SkipSelf } from 'injection-js'
import type { InjectionKey } from 'vue'
import { getCurrentInstance, inject, provide } from 'vue'
import { createSymbol } from '../helper'

export const InjectorKey: InjectionKey<ReflectiveInjector> = createSymbol('VUE3-OOP_ReflectiveInjector') as symbol

const MetadataKey = createSymbol('VUE3-OOP_Component')
const MetadataProviderKey = createSymbol('VUE3-OOP_ResolveProviders')

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
  /**
   * option是否是稳定的，
   * 依赖解析只会在第一次的时候解析并且缓存下来，所以options如果是动态变化的，请标记
   */
  stable?: boolean
}

export function Component(options?: ComponentOptions): ClassDecorator {
  return function (target: any) {
    Reflect.defineMetadata(MetadataKey, options, target)
    return Injectable()(target)
  }
}

export function resolveComponent(target: { new (...args: []): any }) {
  // 如果没有使用 injection-js 则不创建注入器
  if (!Reflect.getMetadata('annotations', target)) return new target()
  const parent = inject(InjectorKey, undefined)
  let resolveProviders = Reflect.getOwnMetadata<ResolvedReflectiveProvider[]>(MetadataProviderKey, target)
  const options: ComponentOptions | undefined = Reflect.getOwnMetadata(MetadataKey, target)
  if (!resolveProviders || options?.stable === false) {
    // 依赖
    let deps: Provider[] = [target]
    if (options?.providers?.length) {
      deps = deps.concat(options.providers)
    }
    // 自动解析依赖的依赖
    if (options?.autoResolveDeps !== false) {
      deps = resolveDependencies(deps)
    }
    // 排除掉某些依赖
    if (options?.exclude?.length) {
      deps = deps.filter((k) => !options.exclude?.includes(k))
    }
    resolveProviders = ReflectiveInjector.resolve(deps)
    // 缓存解析过的依赖, 提高性能
    Reflect.defineMetadata(MetadataProviderKey, resolveProviders, target)
  }
  const injector = ReflectiveInjector.fromResolvedProviders(resolveProviders, parent)
  if (options?.globalStore) {
    // 如果作为全局的服务，则注入到根上面
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const current = getCurrentInstance()!
    const app = current.appContext.app

    app.provide(InjectorKey, injector)
    app.getStore = () => injector
    app.getService = (token) => injector.get(token)
  } else {
    provide(InjectorKey, injector)
  }
  const compInstance = injector.get(target)
  // 处理一下providers中的未创建实例的服务
  resolveProviders.forEach((k) => injector.get(k.key.token))
  return compInstance
}

export function resolveDependencies(inputs: Provider[]) {
  // 处理抽象类
  const noConstructor: Exclude<Provider, TypeProvider | any[]>[] = []

  for (const input of inputs) {
    if (!(input instanceof Function) && !Array.isArray(input)) {
      noConstructor.push(input)
    }
  }

  const deps = new Set<Provider>()

  function resolver(klass: Provider) {
    if (deps.has(klass) || noConstructor.find((k) => k !== klass && k.provide === klass)) return
    deps.add(klass)
    const resolves = ReflectiveInjector.resolve([klass])
    for (const item of resolves) {
      for (const fact of item.resolvedFactories) {
        for (const dep of fact.dependencies) {
          if (
            dep.optional ||
            dep.visibility instanceof SkipSelf ||
            dep.key.token instanceof InjectionToken ||
            typeof dep.key.token !== 'function'
          ) {
            continue
          }
          resolver(dep.key.token as unknown as ClassProvider)
        }
      }
    }
  }

  for (const input of inputs) resolver(input)

  return Array.from(deps)
}
