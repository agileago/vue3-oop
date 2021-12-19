import { Hook, Track, VueService } from 'vue3-oop'
import { ref, watchEffect } from 'vue'
import { debounce } from 'lodash-es'

export class SizeService extends VueService {
  constructor() {
    super()
    watchEffect((onInvalidate) => {
      const target = this.target.value
      target && this.observer.observe(target)
      onInvalidate(() => target && this.observer.unobserve(target))
    })
  }
  target = ref<HTMLDivElement>()
  private observer = new ResizeObserver((entries) => {
    const entry = entries[0]
    if (!entry) {
      this.x = 0
      this.y = 0
    } else {
      this.debounceSet(entry.target.clientWidth, entry.target.clientHeight)
    }
  })
  @Track() x = 0
  @Track() y = 0

  debounceSet = debounce((x: number, y: number) => {
    this.x = x
    this.y = y
  })

  @Hook('BeforeUnmount')
  private unmount() {
    this.observer.disconnect()
  }
}
