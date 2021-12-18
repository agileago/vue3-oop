import type { UserConfig } from 'vitepress'
// @ts-ignore
import codetabs from 'markdown-it-codetabs'
import type MarkdownIt from 'markdown-it'

const config: UserConfig = {
  base: '/vue3-oop/',
  title: 'VUE3-OOP',
  description: 'vue3 oop是vue3开发进入面向对象阶段',
  markdown: {
    lineNumbers: false,
    config(md: MarkdownIt) {
      md.use(codetabs)
    },
  },
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/', activeMatch: '^/guide/' },
      {
        text: 'DEMO',
        link: 'https://stackblitz.com/edit/vite-y7m4fy?file=main.tsx',
      },
      {
        text: 'Github',
        link: 'https://github.com/agileago/vue3-oop',
      },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '介绍',
          children: [
            { text: '使用指南', link: '/guide/' },
            { text: '组件', link: '/guide/component' },
            { text: '服务', link: '/guide/service' },
          ],
        },
        {
          text: '依赖注入',
          children: [{ text: '服务注入', link: '/guide/di' }],
        },
        {
          text: 'API',
          link: '/guide/api',
        },
      ],
    },
  },
}

export default config
