import { Hook, Ref, VueService } from '@/index'
import { Inject, Injectable } from 'injection-js'
import { RouterService } from '../../router/router.service'
import { AxiosInstance } from 'axios'
import { HTTP_CLIENT } from '../../api/http'

@Injectable()
export class UserService extends VueService {
  constructor(private routerService: RouterService, @Inject(HTTP_CLIENT) private httpService: AxiosInstance) {
    super()
    this.guardHttp()
    this.guardRouter()
  }
  @Ref() token = ''

  private _requestGuard: number

  guardHttp() {
    this._requestGuard = this.httpService.interceptors.request.use((config) => {
      return config
    })
  }

  guardRouter() {
    this.routerService.router.beforeEach(async (to, from) => {
      if (to.path === '/login' && this.token) return { path: '/' }
      if (to.path !== '/login' && !this.token) return { path: '/login' }
    })
  }

  @Hook('BeforeUnmount')
  unmount() {
    this.httpService.interceptors.request.eject(this._requestGuard)
  }

  async login(model: any) {
    this.token = await new Promise((resolve) => setTimeout(resolve, 1000, 'token'))
    await this.routerService.router.replace('/')
  }
}
