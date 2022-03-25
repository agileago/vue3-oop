import { RouterView } from 'vue-router'
import { Hook, VueComponent } from 'vue3-oop'

export default class BasicModule extends VueComponent {
  @Hook('Mounted')
  mounted() {
    console.log(this.$parent)
  }
  render() {
    return <RouterView></RouterView>
  }
}
