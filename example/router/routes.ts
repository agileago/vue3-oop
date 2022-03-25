import type { RouteRecordRaw } from 'vue-router'

// 自动收集子模块的路由
const moduleRoutes = import.meta.globEager('../module/**/*.router.ts')

export const routes: RouteRecordRaw[] = Reflect.ownKeys(moduleRoutes)
  .map((k) => moduleRoutes[k as string].default as RouteRecordRaw)
  .filter(Boolean)
