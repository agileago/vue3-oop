import { VueComponent } from '@/extends/component'
import { RouterView } from 'vue-router'

export default class DefaultLayout extends VueComponent {
  render() {
    return <RouterView></RouterView>
  }
}
