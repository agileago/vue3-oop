import '@abraham/reflection'
import { Component, VueComponent } from 'vue3-oop'
import { createApp } from 'vue'
import './theme/app.css'
import { CountService } from './count.service'

@Component()
class Home extends VueComponent {
  constructor(private countService: CountService) {
    super()
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2>count: {this.countService.count}</h2>
        <button onClick={() => this.countService.add()}>+</button>
        <button onClick={() => this.countService.remove()}>-</button>
      </div>
    )
  }
}

const app = createApp(Home)
app.mount('#app')
