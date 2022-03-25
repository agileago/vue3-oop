import { Mut, VueComponent } from 'vue3-oop'

export default class UserInputView extends VueComponent {
  @Mut() message = 'Hello World!'

  render() {
    return <div>111</div>
  }
}
