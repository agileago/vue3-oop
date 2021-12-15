import '@abraham/reflection'
import { Component, Ref, VueComponent, VueService } from '@/index'
import { Inject, Injectable, InjectionToken, SkipSelf } from 'injection-js'
import { createApp } from 'vue'

const TOKEN1 = new InjectionToken('TOken')

@Injectable()
class CountService extends VueService {
  @Ref() count = 1
  add() {
    this.count++
  }
  remove() {
    this.count--
  }
}

@Component({
  providers: [{ provide: TOKEN1, useValue: 1 }],
})
class Home extends VueComponent {
  constructor(@Inject(TOKEN1) private a: any, private c: CountService) {
    super()
    console.log(a, c)
  }

  render() {
    return (
      <div>
        1111
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
    return <div>1111</div>
  }
}

const app = createApp(Home)
app.mount('#app')
