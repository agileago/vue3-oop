import type { RouteRecordRaw } from 'vue-router'

// 自动收集子模块的路由
const moduleRoutes = import.meta.glob('../module/**/*.router.ts', {
  eager: true,
})

export const routes: RouteRecordRaw[] = Reflect.ownKeys(moduleRoutes)
  .map(k => (moduleRoutes[k as string] as any).default as RouteRecordRaw)
  .filter(Boolean)
