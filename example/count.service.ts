import { Autobind, Mut, VueService } from '@/index'

export class CountService extends VueService {
  @Mut() count = 1

  @Autobind()
  add() {
    this.count++
  }

  @Autobind()
  remove() {
    this.count--
  }
}
