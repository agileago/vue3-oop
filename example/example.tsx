import { Autobind, Track, VueComponent, VueService } from 'vue3-oop'
import { onBeforeUnmount } from 'vue'

class PositionService extends VueService {
  constructor() {
    super()
    window.addEventListener('mousemove', this.change)
    onBeforeUnmount(() => window.removeEventListener('mousemove', this.change))
  }

  @Track() x = 0
  @Track() y = 0

  @Autobind()
  private change(e: MouseEvent) {
    this.x = e.clientX
    this.y = e.clientY
  }
}

class Foo extends VueComponent {
  postionService = new PositionService()

  render() {
    return <div>{this.postionService.x}</div>
  }
}
