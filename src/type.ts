import { InjectionKey, Prop, SetupContext, VNodeChild } from 'vue'

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
  ProviderKey?: symbol | string | number | InjectionKey<any>
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

type DefaultSlots = {
  default(): VNodeChild
}

type MixDefaultSlots<T extends {}> = 'default' extends keyof T ? {} : DefaultSlots

// 处理tsx slots 类型问题
export type WithVSlots<T extends {}> = {
  'v-slots'?: 'slots' extends keyof T
    ? Partial<T['slots'] & { $stable: boolean } & MixDefaultSlots<T['slots']>>
    : Partial<{ $stable: boolean; default(): VNodeChild }>
}

export type WithSlotTypes<T extends {}> = Omit<SetupContext, 'slots'> & {
  slots: 'slots' extends keyof T
    ? Partial<T['slots'] & MixDefaultSlots<T['slots']>>
    : Partial<{ default(): VNodeChild }>
}

type ModelProps<T extends {}> = Exclude<
  {
    [Prop in keyof T]: T extends { [k in Prop as `onUpdate:${k & string}`]?: any } ? Prop : never
  }[keyof T],
  undefined
>

export type WithVModel<T extends {}, U extends keyof T = ModelProps<T>> = TransformModelValue<{
  [k in U as `v-model:${k & string}`]?: T[k] | [T[k], string[]]
}>
export type TransformModelValue<T extends {}> = 'v-model:modelValue' extends keyof T
  ? Omit<T, 'v-model:modelValue'> & { ['v-model']?: T['v-model:modelValue'] }
  : T

export type ComponentProps<T extends {}> = ComponentPropsObject<T> | Array<keyof Omit<T, 'slots'>>

export type ComponentPropsObject<T extends {}> = {
  [U in keyof Omit<T, 'slots'>]-?: Prop<any>
}
export type ComponentPropsArray<T extends {}> = UnionToTuple<keyof Omit<T, 'slots'>>

export type ComponentSlots<T extends { props: any }> = T['props']['v-slots']

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
