# 如何使用

## 前提条件

1. 因为要用到ts的获取元数据的能力，所以需要安装`reflect-metada`的支持

```shell
yarn add @abraham/reflection
```
并且把这段代码放到入口引入，只需引入一次

```typescript
import '@abraham/reflection'
```

2. 安装依赖注入库 `injection-js`, 以及本库

```shell
yarn add injection-js vue3-oop
```

3. 设置 `tsconfig.json` 

主要是涉及到装饰器以及类的设置

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "useDefineForClassFields": false,
  }
}
```

4. 如果使用 `vite` 的话，由于vite使用`esbuild`编译`ts`,不支持 `metadata` , 需要把 `@vitejs/plugin-vue-jsx` 这个插件换成`vite-plugin-ts`这个插件

```shell
yarn add vite-plugin-ts
```

vite 插件配置
```typescript
import vueJsx from 'vite-plugin-ts'
export default {
  plugins: [vueJsx()]
}
```

