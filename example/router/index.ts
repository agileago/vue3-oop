import { Injectable } from 'injection-js'
import { RouterService } from './router.service'
import { routes } from './routes'

@Injectable()
export class RouterStartService {
  constructor(private rs: RouterService) {
    rs.init(routes)
  }
}
