import '@abraham/reflection'
import { createApp } from 'vue'
import './theme/app.css'
import 'ant-design-vue/dist/antd.css'
import { App } from './app'

const app = createApp(App)
app.mount('#app')
