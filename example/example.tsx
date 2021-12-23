import { Autobind, ComponentProps, Mut, VueComponent, VueService } from 'vue3-oop'
import { onBeforeUnmount } from 'vue'

class PositionService extends VueService {
  constructor() {
    super()
    window.addEventListener('mousemove', this.change)
    onBeforeUnmount(() => window.removeEventListener('mousemove', this.change))
  }

  @Mut() x = 0
  @Mut() y = 0

  @Autobind()
  private change(e: MouseEvent) {
    this.x = e.clientX
    this.y = e.clientY
  }
}

interface Foo_Props {
  name?: string
  size?: number
}

class Foo extends VueComponent<Foo_Props> {
  static defaultProps: ComponentProps<Foo_Props> = ['size', 'name']
  postionService = new PositionService()

  render() {
    return <div>{this.postionService.x}</div>
  }
}
