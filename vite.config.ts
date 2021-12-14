import { defineConfig } from 'vite'
import vueJsx from '@vue3-oop/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: [
        { find: /^~/, replacement: '' },
        { find: '@/', replacement: '/src/' },
      ],
    },
    server: {
      open: '/',
    },
    build: {
      target: 'es2015',
      lib: {
        entry: 'src/index.ts',
        name: 'vue3-oop',
        fileName: (format) => `vue3-oop.${format}.js`,
        formats: ['es', 'cjs'],
      },
      rollupOptions: {
        external: ['vue', 'injection-js'],
      },
      minify: false,
    },
  }
})
