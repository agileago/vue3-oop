// 由于tsx的缘故，指令不能挂载在组件上面 https://github.com/vuejs/babel-plugin-jsx/issues/541
// 所以所有指令需挂载在app上

import type { App, Directive } from 'vue'

const dirs = import.meta.glob('./**/*.directive.ts', { eager: true })

export function setupDirective(app: App) {
  Reflect.ownKeys(dirs).forEach(k => {
    const module: any = dirs[k as string]
    if (!module?.default) return
    const dir = module.default as Directive & { name: string }
    app.directive(dir.name, dir)
  })
}
