import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  base: '/vue3-oop/',
  title: 'VUE3-OOP',
  description: 'vue3 oop是vue3开发进入面向对象阶段',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/', activeMatch: '^/guide/' },
      {
        text: 'API参考',
        link: '/api/',
        activeMatch: '^/api/',
      },
      {
        text: 'Github',
        link: 'https://github.com/agileago/vue3-oop',
      },
    ],
  },
}

export default config
