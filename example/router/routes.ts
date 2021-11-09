import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('../module/auth/login.view'),
  },
  {
    path: '/',
    component: () => import('../layout/default.layout'),
    children: [
      {
        path: '/',
        component: () => import('../module/home/home.view'),
      },
    ],
  },
]
