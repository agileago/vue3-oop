import { Mut, VueComponent } from 'vue3-oop'

export class A extends VueComponent {
  @Mut() placeholder = 'dddd'
  constructor() {
    super()
  }
  done() {
    console.log('a')
  }
  render() {
    return (
      <div style={{ backgroundColor: 'red' }} onClick={() => this.done()}>
        {this.placeholder}
      </div>
    )
  }
}
