import '@abraham/reflection'
import { Component, VueComponent } from 'vue3-oop'
import { createApp } from 'vue'
import './theme/app.css'
import { CountService } from './count.service'
import { SizeService } from './size.service'

@Component()
class Home extends VueComponent {
  constructor(private countService: CountService, private sizeService: SizeService) {
    super()
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2>count: {this.countService.count}</h2>
        <button onClick={() => this.countService.add()}>+</button>
        <button onClick={() => this.countService.remove()}>-</button>
        <p>
          矩形大小： 宽度： {this.sizeService.x} 长度: {this.sizeService.y}
        </p>
        <div
          ref={this.sizeService.target}
          style={{
            width: '100px',
            height: '100px',
            resize: 'both',
            border: '1px solid #ccc',
            overflow: 'scroll',
          }}
        ></div>
      </div>
    )
  }
}

const app = createApp(Home)
app.mount('#app')
