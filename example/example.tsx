import { Autobind, Ref, VueComponent, VueService } from 'vue3-oop'
import { onBeforeUnmount } from 'vue'

class PositionService extends VueService {
  constructor() {
    super()
    window.addEventListener('mousemove', this.change)
    onBeforeUnmount(() => window.removeEventListener('mousemove', this.change))
  }

  @Ref() x = 0
  @Ref() y = 0

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
