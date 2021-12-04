import axios from 'axios'

export const http = axios.create()
export const HTTP_CLIENT = Symbol()

export function login() {
  return http.get('/login')
}
