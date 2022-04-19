import { defineConfig } from 'vite'
import vueJsx from '@vue3-oop/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ command, mode }) => {
  return {
    plugins:
      command === 'build'
        ? undefined
        : [vue(), vueJsx({ enableObjectSlots: false })],
    resolve: {
      alias: [
        { find: /^~/, replacement: '' },
        { find: '@/', replacement: '/src/' },
        { find: 'vue3-oop', replacement: '/src/' },
      ],
    },
    server: {
      open: '/',
    },
    build: {
      target: 'es2015',
      sourcemap: true,
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
    test: {
      global: true,
      environment: 'happy-dom',
      open: true,
    },
  }
})
