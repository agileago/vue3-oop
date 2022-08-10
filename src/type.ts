import type {
  ComponentCustomProps,
  Prop,
  SetupContext,
  StyleValue,
  VNodeChild,
  VNodeProps,
} from 'vue'

/**
 * 装饰器处理
 */
export interface Hanlder {
  key: string
  handler: (targetThis: any) => void
}

type KeysOfUnion<T> = T extends T ? keyof T : never

type DefaultSlots = {
  default(): VNodeChild
}

type MixDefaultSlots<T extends {}> = 'default' extends keyof T
  ? {}
  : DefaultSlots

// 处理tsx slots 类型问题
export type WithVSlots<T extends {}> = {
  'v-slots'?: 'slots' extends keyof T
    ? Partial<T['slots'] & { $stable: boolean } & MixDefaultSlots<T['slots']>>
    : Partial<{ $stable: boolean; default(): VNodeChild }>
}

export type WithSlotTypes<T extends {}> = Omit<SetupContext, 'slots'> & {
  slots: NonNullable<VueComponentProps<T>['v-slots']>
}

type ModelProps<T extends {}> = Exclude<
  {
    [Prop in keyof T]: T extends {
      [k in Prop as `onUpdate:${k & string}`]?: any
    }
      ? Prop
      : never
  }[keyof T],
  undefined
>

export type WithVModel<
  T extends {},
  U extends keyof T = ModelProps<T>
> = TransformModelValue<{
  [k in U as `v-model:${k & string}`]?: T[k] | [T[k], string[]]
}>
export type TransformModelValue<T extends {}> =
  'v-model:modelValue' extends keyof T
    ? Omit<T, 'v-model:modelValue'> & { ['v-model']?: T['v-model:modelValue'] }
    : T

export type ComponentProps<T extends {}> =
  | ComponentPropsObject<T>
  | Array<KeysOfUnion<DistributiveOmit<T, 'slots'>>>

export type ComponentPropsObject<T extends {}> = {
  [U in KeysOfUnion<DistributiveOmit<T, 'slots'>>]-?: Prop<any>
}

export type ComponentSlots<T extends { props: any }> = NonNullable<
  T['props']['v-slots']
>

/** 为了阻止ts把不相关的类也解析到metadata数据中，用这个工具类型包装一下类 */
export type ClassType<T> = T

export type AllowedComponentProps = {
  class?: any
  style?: StyleValue
  [name: string]: any
}

export type DistributiveOmit<T, K extends keyof any> = T extends T
  ? Omit<T, K>
  : never

type DistributiveVModel<T> = T extends T ? WithVModel<T> : never
type DistributiveVSlots<T> = T extends T ? WithVSlots<T> : never

export type VueComponentProps<T extends {}> = DistributiveOmit<T, 'slots'> &
  DistributiveVModel<T> &
  DistributiveVSlots<T> &
  VNodeProps &
  AllowedComponentProps &
  ComponentCustomProps
