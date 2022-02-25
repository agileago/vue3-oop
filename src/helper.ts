import type { InjectionKey, SetupContext } from 'vue'
import { getCurrentInstance, inject } from 'vue'
import autobind from 'autobind-decorator'

/**
 * 自动绑定this !!!此装饰器必须放在最上面
 */
export function Autobind() {
  return autobind
}

export function useProps<T>() {
  const instance = getCurrentInstance()
  return instance?.props as T
}
export function useCtx() {
  const instance = getCurrentInstance()
  // @ts-ignore
  return instance?.setupContext as SetupContext
}
export function getCurrentApp() {
  return getCurrentInstance()?.appContext.app
}
export function getEmitsFromProps(
  defaultProps: Record<string, any> | string[]
) {
  const keys = Array.isArray(defaultProps)
    ? defaultProps
    : Object.keys(defaultProps)
  const emits: string[] = []

  for (let key of keys) {
    if (!/^on/.test(key)) continue
    key = key.slice(2).replace(/Once$/, '')
    emits.push(key[0].toLowerCase() + key.slice(1))
  }
  return emits
}
export function createSymbol(name: string) {
  return typeof Symbol === 'undefined' ? name : Symbol(name)
}

/**
 * 注入服务
 */
export function injectService<
  T extends {
    new (...args: any[]): InstanceType<T>
    ProviderKey: InjectionKey<InstanceType<T>>
  }
>(service: T, defaultService?: InstanceType<T>): InstanceType<T> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return inject(service.ProviderKey, defaultService)!
}
