import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw = {
  path: '/basic',
  component: () => import('./basic.module'),
  meta: {
    title: '基础功能',
  },
  children: [
    {
      path: '/basic/hello-world',
      component: () => import('./hello-world/hello-world.view'),
      meta: {
        title: '加减',
      },
    },
    {
      path: '/basic/user-input',
      component: () => import('./user-input/user-input.view'),
      meta: {
        title: '增删改查',
      },
    },
  ],
}

export default routes
