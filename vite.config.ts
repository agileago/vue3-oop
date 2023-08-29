import { defineConfig } from 'vite'
import vueJsx from '@vue3-oop/plugin-vue-jsx'
import { name } from './package.json'
import dtsPlugin from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ command }) => {
  return {
    plugins:
      command === 'build'
        ? [dtsPlugin({ outDir: 'types', include: ['src'] })]
        : [vueJsx({ enableObjectSlots: false }), tsconfigPaths()],
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
