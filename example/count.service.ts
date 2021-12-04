import { Autobind, Ref, VueService } from '@/index'

export class CountService extends VueService {
  @Ref() count = 0

  @Autobind()
  add() {
    this.count++
  }

  @Autobind()
  remove() {
    this.count--
  }
}
