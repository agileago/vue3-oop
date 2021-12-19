import { Autobind, Track, VueService } from '@/index'

export class CountService extends VueService {
  @Track() count = 1

  @Autobind()
  add() {
    this.count++
  }

  @Autobind()
  remove() {
    this.count--
  }
}
