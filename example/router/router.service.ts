import { Injectable } from 'injection-js'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { getCurrentApp, VueService } from '@/index'

@Injectable()
export class RouterService extends VueService {
  history = createWebHistory()
  router = createRouter({
    history: this.history,
    routes: routes,
  })
  app = getCurrentApp()!
  get currentRoute() {
    return this.router.currentRoute.value
  }

  constructor() {
    super()
    this.app.use(this.router)
  }
}
