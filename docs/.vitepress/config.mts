import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh_CN',
  base: '/vue3-oop/',
  title: 'VUE3-OOP',
  description: 'vue3 oop是vue3开发进入面向对象阶段',
  markdown: {
    lineNumbers: false,
  },
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/', activeMatch: '/guide/' },
      {
        text: 'DEMO',
        link: 'https://stackblitz.com/edit/vite-y7m4fy?file=main.tsx',
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/agileago/vue3-oop' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '介绍',
          collapsed: true,
          items: [
            { text: '使用指南', link: '/guide/' },
            { text: '组件', link: '/guide/component' },
            { text: '服务', link: '/guide/service' },
          ],
        },
        {
          text: '依赖注入',
          items: [{ text: '服务注入', link: '/guide/di' }],
        },
        {
          text: 'API',
          items: [{ text: 'API', link: '/guide/api' }],
        },
      ],
    },
  },
})
