import '@abraham/reflection'
import {
  Component,
  getCurrentInjector,
  Hook,
  VueComponent,
  VueService,
} from 'vue3-oop'
import type { Directive } from 'vue'
import { createApp } from 'vue'
import { focusDirective } from './focus.directive'
import { Injector } from 'injection-js'

class OutService extends VueService {
  injector = getCurrentInjector()
}

@Component()
class App extends VueComponent {
  static directives: Record<string, Directive> = {
    focus: focusDirective,
  }
  constructor(private injector: Injector) {
    super()
  }

  outService = new OutService()

  @Hook('Mounted')
  mount() {
    console.log(
      this.injector,
      this.outService.injector,
      this.injector === this.outService.injector
    )
  }

  render() {
    return (
      <div>
        <div>
          指令：
          <input type="text" v-focus />
        </div>
      </div>
    )
  }
}

const app = createApp(App)
app.mount('#app')
