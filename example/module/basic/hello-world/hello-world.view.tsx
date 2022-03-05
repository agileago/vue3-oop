import { Mut, VueComponent } from 'vue3-oop'

export default class HelloWorldView extends VueComponent {
  @Mut() msg = 'hello world'
  render() {
    return <h1>{this.msg}</h1>
  }
}
