export interface AnyContructor {
  new (...args: any[]): any
  displayName?: string
  defaultProps?: any
  inheritAttrs?: boolean
  directives?: any
  [prop: string]: any
}

/**
 * 装饰器处理
 */
export interface Hanlder {
  key: string
  handler: (targetThis: any) => void
}
