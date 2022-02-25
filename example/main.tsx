import '@abraham/reflection'
import {
  Component,
  Computed,
  getCurrentInjector,
  Mut,
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

  @Mut() count = 1

  @Computed('pre')
  get abc() {
    return this.count > 10
  }
  render() {
    return (
      <div>
        <div>
          指令：abc大于20：{String(this.abc)}
          <input type="text" v-focus />
        </div>
      </div>
    )
  }
}

const app = createApp(App)
app.mount('#app')
