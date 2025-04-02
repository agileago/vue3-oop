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
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },
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
