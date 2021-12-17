import '@abraham/reflection'
import { Component, VueComponent } from 'vue3-oop'
import { Inject, InjectionToken, SkipSelf } from 'injection-js'
import { createApp } from 'vue'
import './theme/app.css'
import { focusDirective } from './focus.directive'
import { CountService } from './count.service'

const TOKEN1 = new InjectionToken('TOken')

abstract class A {
  name = 1
}

@Component({
  providers: [
    { provide: TOKEN1, useValue: 1 },
    { provide: A, useValue: { age: 19 } },
    { provide: 'aa', useValue: 1, multi: true },
    { provide: 'aa', useValue: 2, multi: true },
  ],
})
class Home extends VueComponent {
  static directives = {
    focus: focusDirective,
  }
  constructor(
    @Inject(TOKEN1) private a: any,
    private c: CountService,
    private d: A,
    @Inject('aa') private e: number[],
  ) {
    super()
    console.log(a, c, d, e)
  }

  render() {
    return (
      <div>
        111122222ccc
        <HomeChild></HomeChild>
      </div>
    )
  }
}

@Component()
class HomeChild extends VueComponent {
  constructor(
    private countService: CountService,
    @SkipSelf() private countService1: CountService,
    @Inject(TOKEN1) private a: number,
  ) {
    super()
    console.log(countService, countService1, countService === countService1)
    console.log(a)
  }

  render() {
    return <div>2222</div>
  }
}

const app = createApp(Home)
app.mount('#app')
