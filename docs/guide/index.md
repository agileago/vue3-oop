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

4. Vite设置

由于vite内部使用esbuild编译ts, esbuild不支持元数据 `metadata`, 所以需要使用tsc编译ts 

```shell
pnpm add rollup-plugin-typescript2 -D
```

vite 插件配置
```typescript
import typescript from 'rollup-plugin-typescript2'
export default {
  esbuild: {
    exclude: /\.tsx?$/
  },
  plugins: [typescript({ check: false })]
}
```
## 装饰器

有关装饰器的知识请阅读 https://www.typescriptlang.org/docs/handbook/decorators.html#decorators

## 模板

vite: [https://github.com/agileago/fe-template](https://github.com/agileago/fe-template)

webpack: [https://github.com/agileago/fe-vue3-template](https://github.com/agileago/fe-vue3-template)

