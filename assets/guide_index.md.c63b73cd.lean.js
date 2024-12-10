import{_ as a,o as n,c as l,O as p}from"./chunks/framework.bb99b966.js";const E=JSON.parse('{"title":"如何使用","description":"","frontmatter":{},"headers":[],"relativePath":"guide/index.md","filePath":"guide/index.md"}'),o={name:"guide/index.md"};function e(t,s,c,r,i,d){return n(),l("div",null,s[0]||(s[0]=[p(`<h1 id="如何使用" tabindex="-1">如何使用 <a class="header-anchor" href="#如何使用" aria-label="Permalink to &quot;如何使用&quot;">​</a></h1><h2 id="前提条件" tabindex="-1">前提条件 <a class="header-anchor" href="#前提条件" aria-label="Permalink to &quot;前提条件&quot;">​</a></h2><ol><li>因为要用到ts的获取元数据的能力，所以需要安装<code>reflect-metada</code>的支持</li></ol><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">yarn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">@abraham/reflection</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">yarn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#032F62;">@abraham/reflection</span></span></code></pre></div><p>并且把这段代码放到入口引入，只需引入一次</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@abraham/reflection&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@abraham/reflection&#39;</span></span></code></pre></div><ol start="2"><li>安装依赖注入库 <code>injection-js</code>, 以及本库</li></ol><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">yarn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">injection-js</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">vue3-oop</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">yarn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#032F62;">injection-js</span><span style="color:#24292E;"> </span><span style="color:#032F62;">vue3-oop</span></span></code></pre></div><ol start="3"><li>设置 <code>tsconfig.json</code></li></ol><p>主要是涉及到装饰器以及类的设置</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;compilerOptions&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;experimentalDecorators&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;emitDecoratorMetadata&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;useDefineForClassFields&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;compilerOptions&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;experimentalDecorators&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;emitDecoratorMetadata&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;useDefineForClassFields&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ol start="4"><li>Vite设置</li></ol><p>由于vite内部使用esbuild编译ts, esbuild不支持元数据 <code>metadata</code>, 所以需要使用tsc编译ts</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">pnpm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">@vue3-oop/plugin-vue-jsx</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-D</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">pnpm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#032F62;">@vue3-oop/plugin-vue-jsx</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-D</span></span></code></pre></div><p>vite 插件配置</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> vueJsx </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@vue3-oop/plugin-vue-jsx&#39;</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span><span style="color:#B392F0;">vueJsx</span><span style="color:#E1E4E8;">()]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> vueJsx </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@vue3-oop/plugin-vue-jsx&#39;</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [</span><span style="color:#6F42C1;">vueJsx</span><span style="color:#24292E;">()]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="装饰器" tabindex="-1">装饰器 <a class="header-anchor" href="#装饰器" aria-label="Permalink to &quot;装饰器&quot;">​</a></h2><p>有关装饰器的知识请阅读 <a href="https://www.typescriptlang.org/docs/handbook/decorators.html#decorators" target="_blank" rel="noreferrer">https://www.typescriptlang.org/docs/handbook/decorators.html#decorators</a></p><h2 id="模板" tabindex="-1">模板 <a class="header-anchor" href="#模板" aria-label="Permalink to &quot;模板&quot;">​</a></h2><p>vite: <a href="https://github.com/agileago/fe-template" target="_blank" rel="noreferrer">https://github.com/agileago/fe-template</a></p><p>webpack: <a href="https://github.com/agileago/fe-vue3-template" target="_blank" rel="noreferrer">https://github.com/agileago/fe-vue3-template</a></p>`,21)]))}const u=a(o,[["render",e]]);export{E as __pageData,u as default};