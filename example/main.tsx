import '@abraham/reflection'
import { Component, Computed, Hook, Mut, VueComponent, VueService } from 'vue3-oop'
import { createApp } from 'vue'

const debounce = (delay: number) => {
  let timeout: number | undefined
  return (track: any, trigger: any) => {
    let value: any
    return {
      get() {
        track()
        return value
      },
      set(newValue: any) {
        clearTimeout(timeout)
        timeout = window.setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      },
    }
  }
}

class CountService extends VueService {
  @Mut() count = 1
}

class Home extends VueComponent {
  @Mut(debounce(1000)) _count = ''

  @Mut() obj = { name: 123 }

  @Computed()
  get double() {
    return this._count
  }
  set double(val: string) {
    this._count = val.toUpperCase()
  }

  @Hook('Mounted')
  mounted() {
    console.log('mounted')
  }

  render() {
    console.log(this.obj)
    console.log('render')
    return <input type="text" v-model={this.double} />
  }
}

@Component()
class Home1 extends Home {
  constructor(private cs: CountService) {
    super()
    console.log(cs)
  }
  @Mut() count1 = 111
  render() {
    return (
      <div>
        <h5 onClick={() => this.cs.count++}>{this.cs.count}</h5>
        <h2 onClick={() => this.count1++}>1111{this.count1}</h2>
        {super.render()}
      </div>
    )
  }
}

const app = createApp(Home1)
app.mount('#app')
