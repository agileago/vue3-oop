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
        title: '全功能类组件',
      },
    },
    {
      path: '/basic/user-input',
      component: () => import('./user-input/user-input.view'),
      meta: {
        title: 'user input',
      },
    },
  ],
}

export default routes
