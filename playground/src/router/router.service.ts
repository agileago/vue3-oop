import { getCurrentApp, Hook, VueService } from 'vue3-oop'
import type { Router, RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

export class RouterService extends VueService {
  history = createWebHistory()
  router!: Router
  app = getCurrentApp()
  init(routes: RouteRecordRaw[]) {
    this.router = createRouter({
      history: this.history,
      routes,
    })
    this.app?.use(this.router)
  }
  @Hook('BeforeUnmount')
  beforeUnmount() {
    this.history.destroy()
  }
}
