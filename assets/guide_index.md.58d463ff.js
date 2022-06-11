import{_ as s,c as a,o as n,a as e}from"./app.e2ae8207.js";const h='{"title":"\u5982\u4F55\u4F7F\u7528","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u524D\u63D0\u6761\u4EF6","slug":"\u524D\u63D0\u6761\u4EF6"},{"level":2,"title":"\u88C5\u9970\u5668","slug":"\u88C5\u9970\u5668"},{"level":2,"title":"\u6A21\u677F","slug":"\u6A21\u677F"}],"relativePath":"guide/index.md"}',l={name:"guide/index.md"},p=e(`<h1 id="\u5982\u4F55\u4F7F\u7528" tabindex="-1">\u5982\u4F55\u4F7F\u7528 <a class="header-anchor" href="#\u5982\u4F55\u4F7F\u7528" aria-hidden="true">#</a></h1><h2 id="\u524D\u63D0\u6761\u4EF6" tabindex="-1">\u524D\u63D0\u6761\u4EF6 <a class="header-anchor" href="#\u524D\u63D0\u6761\u4EF6" aria-hidden="true">#</a></h2><ol><li>\u56E0\u4E3A\u8981\u7528\u5230ts\u7684\u83B7\u53D6\u5143\u6570\u636E\u7684\u80FD\u529B\uFF0C\u6240\u4EE5\u9700\u8981\u5B89\u88C5<code>reflect-metada</code>\u7684\u652F\u6301</li></ol><div class="language-shell"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">yarn add @abraham/reflection</span></span>
<span class="line"></span></code></pre></div><p>\u5E76\u4E14\u628A\u8FD9\u6BB5\u4EE3\u7801\u653E\u5230\u5165\u53E3\u5F15\u5165\uFF0C\u53EA\u9700\u5F15\u5165\u4E00\u6B21</p><div class="language-typescript"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@abraham/reflection</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span></code></pre></div><ol start="2"><li>\u5B89\u88C5\u4F9D\u8D56\u6CE8\u5165\u5E93 <code>injection-js</code>, \u4EE5\u53CA\u672C\u5E93</li></ol><div class="language-shell"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">yarn add injection-js vue3-oop</span></span>
<span class="line"></span></code></pre></div><ol start="3"><li>\u8BBE\u7F6E <code>tsconfig.json</code></li></ol><p>\u4E3B\u8981\u662F\u6D89\u53CA\u5230\u88C5\u9970\u5668\u4EE5\u53CA\u7C7B\u7684\u8BBE\u7F6E</p><div class="language-json"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">compilerOptions</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">experimentalDecorators</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">emitDecoratorMetadata</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">useDefineForClassFields</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">false,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><ol start="4"><li>Vite\u8BBE\u7F6E</li></ol><p>\u7531\u4E8Evite\u5185\u90E8\u4F7F\u7528esbuild\u7F16\u8BD1ts, esbuild\u4E0D\u652F\u6301\u5143\u6570\u636E <code>metadata</code>, \u6240\u4EE5\u9700\u8981\u4F7F\u7528tsc\u7F16\u8BD1ts</p><div class="language-shell"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">pnpm add @vue3-oop/plugin-vue-jsx -D</span></span>
<span class="line"></span></code></pre></div><p>vite \u63D2\u4EF6\u914D\u7F6E</p><div class="language-typescript"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> vueJsx </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@vue3-oop/plugin-vue-jsx</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">plugins</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#82AAFF;">vueJsx</span><span style="color:#A6ACCD;">()]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="\u88C5\u9970\u5668" tabindex="-1">\u88C5\u9970\u5668 <a class="header-anchor" href="#\u88C5\u9970\u5668" aria-hidden="true">#</a></h2><p>\u6709\u5173\u88C5\u9970\u5668\u7684\u77E5\u8BC6\u8BF7\u9605\u8BFB <a href="https://www.typescriptlang.org/docs/handbook/decorators.html#decorators" target="_blank" rel="noopener noreferrer">https://www.typescriptlang.org/docs/handbook/decorators.html#decorators</a></p><h2 id="\u6A21\u677F" tabindex="-1">\u6A21\u677F <a class="header-anchor" href="#\u6A21\u677F" aria-hidden="true">#</a></h2><p>vite: <a href="https://github.com/agileago/fe-template" target="_blank" rel="noopener noreferrer">https://github.com/agileago/fe-template</a></p><p>webpack: <a href="https://github.com/agileago/fe-vue3-template" target="_blank" rel="noopener noreferrer">https://github.com/agileago/fe-vue3-template</a></p>`,21),o=[p];function t(c,r,i,d,D,y){return n(),a("div",null,o)}var u=s(l,[["render",t]]);export{h as __pageData,u as default};