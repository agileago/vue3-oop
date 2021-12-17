import { defineConfig } from 'vite'
import vueJsx from '@vue3-oop/plugin-vue-jsx'
import typescript from 'rollup-plugin-typescript2'
// import typescript from '@rollup/plugin-typescript'

export default defineConfig(({ command, mode }) => {
  return {
    esbuild: {
      exclude: /\.tsx?$/,
    }, // 不支持装饰器
    plugins: [typescript({ check: false }), vueJsx()],
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
