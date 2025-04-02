import type { App } from 'vue'
import { setupDirective } from './common/directive'

export function setup(app: App) {
  setupDirective(app)
}
