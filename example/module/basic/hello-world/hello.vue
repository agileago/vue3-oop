<script lang="ts">
import { getCurrentInjector, Mut, VueComponent } from 'vue3-oop'
import { CountComp } from './count.comp'
import { RouterService } from '../../../router/router.service'

export default class Hello extends VueComponent {
  static components = {
    CountComp,
  }
  @Mut() count = 1
  add = () => this.count++
  injector = getCurrentInjector()
  router: RouterService = this.injector.get(RouterService)
  constructor() {
    super()
    console.log(this.router)
  }
}
</script>

<template>
  <h2 class="abc">aaa1111</h2>
  <p @click="add">{{ count }}</p>
  <CountComp size="large"></CountComp>
</template>

<style lang="scss" scoped>
.abc {
  color: red;
}
</style>
