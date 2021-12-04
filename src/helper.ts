import { getCurrentInstance, inject, InjectionKey, SetupContext } from 'vue'
import autobind from 'autobind-decorator'

/**
 * 自动绑定this !!!此装饰器必须放在最上面
 * @example
 * \@Autobind()
 * \@Abc()
 */
export function Autobind() {
  return autobind
}

export function useProps<T>() {
  const instance = getCurrentInstance()
  return instance!.props as T
}
export function useCtx(): SetupContext {
  const instance = getCurrentInstance()
  // @ts-ignore
  return instance.setupContext
}
export function getCurrentApp() {
  return getCurrentInstance()?.appContext.app
}
export function getProtoMetadata(target: any, key: symbol, returnDesc = false): any[] {
  if (!target) return []
  const proto = Reflect.getPrototypeOf(target)
  if (!proto) return []
  let res: any[] = Reflect.getMetadata(key, proto) || []
  if (returnDesc) {
    res = res.map((k) => {
      if (typeof k === 'string') {
        return {
          key: k,
          desc: getDeepOwnDescriptor(proto, k),
        }
      }
      if (typeof k === 'object') {
        return {
          key: k,
          desc: getDeepOwnDescriptor(proto, k.key),
        }
      }
    })
  }
  return res
}
export function getDeepOwnDescriptor(proto: any, key: string): PropertyDescriptor | null {
  if (!proto) return null
  const desc = Reflect.getOwnPropertyDescriptor(proto, key)
  if (desc) return desc
  return getDeepOwnDescriptor(Reflect.getPrototypeOf(proto), key)
}
export function getEmitsFromProps(defaultProps: Record<string, any>) {
  const keys = Object.keys(defaultProps)
  const emits: string[] = []

  for (let key of keys) {
    if (!/^on/.test(key)) continue
    key = key.slice(2).replace(/Once$/, '')
    emits.push(key[0].toLowerCase() + key.slice(1))
  }
  return emits
}

/**
 * 注入服务
 * @param service
 */
export function injectService<
  T extends {
    new (...args: any[]): InstanceType<T>
    ProviderKey: InjectionKey<InstanceType<T>>
  },
>(service: T, defaultService?: InstanceType<T>): InstanceType<T> {
  return inject(service.ProviderKey, defaultService)!
}
