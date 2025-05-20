export { VueComponent, GlobalStoreKey, useForwardRef, mergeRefs } from './extends/component'
export { VueService } from './extends/service'
export { Mut, defMut } from './decorators/mut'
export { Computed } from './decorators/computed'
export { Link } from './decorators/link'
export { Hook } from './decorators/hook'
export { createDecorator, getProtoMetadata } from './decorators/util'
export * from './helper'
export * from './simple-props'
export * from './components'
export { Component, InjectorKey, getCurrentInjector, createCurrentInjector, injectService, provideService } from './di'
export type { ComponentOptions } from './di'
export type {
  ComponentProps,
  ComponentSlots,
  ClassType,
  WithVModel,
  ComponentPropsObject,
  Hanlder,
  ClassAndStyleProps,
} from './type'
