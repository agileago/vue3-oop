import { VueService } from '@/extends/service'
import { Injectable } from 'injection-js'
import { RouterService } from '../../router/router.service'
import { Ref } from '@/index'

@Injectable()
export class UserService extends VueService {
  constructor(private routerService: RouterService) {
    super()
    this.guardRouter()
  }
  @Ref() token?: string

  guardRouter() {
    this.routerService.router.beforeEach(async (to, from) => {
      if (to.path === '/login' && this.token) return { path: '/' }
      if (to.path !== '/login' && !this.token) return { path: '/login' }
    })
  }
  async login(model: any) {
    this.token = await new Promise((resolve) => setTimeout(resolve, 3000, 'token'))
    this.routerService.router.replace('/')
  }
}
