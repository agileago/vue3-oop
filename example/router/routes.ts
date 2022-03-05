import type { RouteRecordRaw } from 'vue-router'
import { RouterView } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/basic',
    redirect: '/basic/hello-world',
    component: RouterView,
    meta: {
      title: 'Basic',
    },
    children: [
      {
        path: '/basic/hello-world',
        component: () => import('../module/basic/hello-world/hello-world.view'),
        meta: {
          title: 'Hello Wolrd',
        },
      },
      {
        path: '/basic/user-input',
        component: () => import('../module/basic/user-input/user-input.view'),
        meta: {
          title: 'Handing User Input',
        },
      },
    ],
  },
]
