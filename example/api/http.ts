import axios from 'axios'
import type { App } from 'vue'
import { UserService } from '../module/auth/user.service'

export const http = axios.create()
let app: App | undefined = undefined
export function setupHttp(obj: App) {
  app = obj
}

http.interceptors.request.use((config) => {
  const userService = app?.getService(UserService)
  console.log(userService)
  return config
})

export function login() {
  return http.get('/login')
}
