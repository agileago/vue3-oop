import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw = {
  path: '/basic',
  component: () => import('./basic.module'),
  meta: {
    title: '特色功能',
  },
  children: [
    {
      path: '/basic/simple-component',
      component: () => import('./simple-component/index.view'),
      meta: {
        title: '简单组件',
      },
    },
    {
      path: '/basic/class-component',
      component: () => import('./user-input/user-input.view'),
      meta: {
        title: '类组件',
      },
    },
    {
      path: '/basic/hoc',
      component: () => import('./hoc/hoc.view'),
      meta: {
        title: '高阶组件',
      },
    },
    {
      path: '/basic/service',
      component: () => import('./hoc/hoc.view'),
      meta: {
        title: '简单服务',
      },
    },
    {
      path: '/basic/inject',
      component: () => import('./hoc/hoc.view'),
      meta: {
        title: '复杂服务注入',
      },
    },
  ],
}

export default routes
