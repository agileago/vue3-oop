import type {
  ComponentPropsOptions,
  DefineSetupFnComponent,
  EmitsOptions,
  EmitsToProps,
  FunctionalComponent as VueFunctionalComponent,
  SetupContext,
  ShortEmitsToObject,
  Slots,
  SlotsType,
} from 'vue'

type RemovePrefix<
  K extends string,
  P extends string,
> = K extends `${P}${infer Event}` ? Uncapitalize<Event> : never

export type ExtractProps<T> = Omit<T, `render${string}`> &
  Partial<Pick<T, keyof T & `render${string}`>>
export type ExtractEvent<T> = {
  [P in keyof T as RemovePrefix<string & P, 'on'>]: T[P]
}
export type ExtractSlots<T> = {
  [P in keyof T as RemovePrefix<string & P, 'render'>]: T[P]
}

export type ComponentType<
  T extends Record<any, any>,
  S extends Record<any, any>,
  Expose extends Record<any, any>,
> = DefineSetupFnComponent<
  ExtractProps<T>,
  ExtractEvent<T>,
  SlotsType<ExtractSlots<T> & S>
> & { new (...args: any[]): Expose }

type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N
export interface FunctionalComponent<
  P = {},
  E extends EmitsOptions | Record<string, any[]> = {},
  S extends Record<string, any> = any,
  EE extends EmitsOptions = ShortEmitsToObject<E>,
> {
  (
    props: P & EmitsToProps<EE>,
    ctx: SetupContext<EE, IfAny<S, {}, SlotsType<S>>>,
  ): any
  props?: ComponentPropsOptions<P>
  emits?: EE | (keyof EE)[]
  slots?: IfAny<S, Slots, SlotsType<S>>
  expose?: string[]
  inheritAttrs?: boolean
  displayName?: string
  compatConfig?: VueFunctionalComponent['compatConfig']
}
