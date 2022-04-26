import { defineConfig } from 'vite'
import vueJsx from '@vue3-oop/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
import { name } from './package.json'
import dtsPlugin from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ command, mode }) => {
  return {
    plugins:
      command === 'build'
        ? [dtsPlugin({ outputDir: 'types' })]
        : [vue(), vueJsx({ enableObjectSlots: false }), tsconfigPaths()],
    server: {
      open: '/',
    },
    build: {
      target: 'es2015',
      sourcemap: true,
      lib: {
        entry: 'src/index.ts',
        name,
        fileName: name,
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
