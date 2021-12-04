export interface VueComponentStaticContructor {
  new (...args: any[]): any
  /** 组件显示名称 */
  displayName?: string
  /** 组件属性vue描述 */
  defaultProps?: any
  /** 组件是否回退attrs */
  inheritAttrs?: boolean
  /** 组件使用的指令 */
  directives?: any
  /** 组件作为服务的key */
  ProviderKey?: symbol | string
  /** 组件是否作为全局服务 */
  globalStore?: boolean
  /** 自定义解析组件 */
  resolveComponent?: any
  [prop: string]: any
}

/**
 * 装饰器处理
 */
export interface Hanlder {
  key: string
  handler: (targetThis: any) => void
}
