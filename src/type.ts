import { Prop, SetupContext, VNodeChild } from 'vue'

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

// 处理tsx slots 类型问题
export type WithVSlots<T extends Record<string, any>> = 'slots' extends keyof T
  ? {
      'v-slots'?: Partial<T['slots'] & { $stable: boolean; default(): VNodeChild }>
      [name: string]: any
    }
  : Record<string, any>

export type WithSlotTypes<T extends Record<string, any>> = Omit<SetupContext, 'slots'> & {
  slots: Partial<T['slots'] & { default(): VNodeChild }>
}

type ModelProps<T extends Record<string, any>> = Exclude<
  {
    [Prop in keyof T]: T extends { [k in Prop as `onUpdate:${k & string}`]?: any } ? Prop : never
  }[keyof T],
  undefined
>

export type WithVModel<T extends Record<string, any>, U extends keyof T = ModelProps<T>> = {
  [k in U as `v-model:${k & string}`]?: T[k] | [T[k], string[]]
}

export type ComponentProps<T extends Record<string, any>> = ComponentPropsArray<T> | ComponentPropsObject<T>

export type ComponentPropsObject<T extends Record<string, any>> = {
  [U in keyof Omit<T, 'slots'>]-?: Prop<any>
}
export type ComponentPropsArray<T extends Record<string, any>> = UnionToTuple<keyof Omit<T, 'slots'>>

export type ComponentSlots<T extends { props: any }> = T extends { props: infer U }
  ? 'v-slots' extends keyof U
    ? U['v-slots']
    : Record<string, unknown>
  : never

/** 为了阻止ts把不相关的类也解析到metadata数据中，用这个工具类型包装一下类 */
export type ClassType<T> = T

// 联合类型转换成数组 'aaa' | 'bbb' -> ['aaa', 'bbb']
export type UnionToTuple<T> = (
  (T extends any ? (t: T) => T : never) extends infer U
    ? (U extends any ? (u: U) => any : never) extends (v: infer V) => any
      ? V
      : never
    : never
) extends (_: any) => infer W
  ? [...UnionToTuple<Exclude<T, W>>, W]
  : []
