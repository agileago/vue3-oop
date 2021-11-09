import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

export function setupRouter(app: App) {
  const router = createRouter({
    history: createWebHistory(),
    routes: routes,
  })
  app.use(router)
}
