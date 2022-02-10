import{_ as n,c as s,o as a,a as t}from"./app.cc96f15e.js";const m='{"title":"\u5B9A\u4E49","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u5B9A\u4E49","slug":"\u5B9A\u4E49"},{"level":2,"title":"\u5C5E\u6027","slug":"\u5C5E\u6027"},{"level":2,"title":"\u4E0A\u4E0B\u6587","slug":"\u4E0A\u4E0B\u6587"},{"level":2,"title":"\u54CD\u5E94\u5F0F\u53D8\u91CF","slug":"\u54CD\u5E94\u5F0F\u53D8\u91CF"},{"level":2,"title":"\u751F\u547D\u5468\u671F","slug":"\u751F\u547D\u5468\u671F"},{"level":2,"title":"watch","slug":"watch"},{"level":2,"title":"\u63D2\u69FD","slug":"\u63D2\u69FD"}],"relativePath":"guide/component.md","lastUpdated":1644475326342}',p={},o=t(`<h2 id="\u5B9A\u4E49" tabindex="-1">\u5B9A\u4E49 <a class="header-anchor" href="#\u5B9A\u4E49" aria-hidden="true">#</a></h2><p>\u7EC4\u4EF6\u5FC5\u987B\u7EE7\u627F <strong><code>VueComponent</code></strong></p><div class="language-typescript"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> VueComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue3-oop&#39;</span>

<span class="token keyword">class</span> <span class="token class-name">Foo</span> <span class="token keyword">extends</span> <span class="token class-name">VueComponent</span> <span class="token punctuation">{</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>\u6211\u662F\u7EC4\u4EF6<span class="token constant">UI</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="\u5C5E\u6027" tabindex="-1">\u5C5E\u6027 <a class="header-anchor" href="#\u5C5E\u6027" aria-hidden="true">#</a></h2><p>\u5C5E\u6027\u4F7F\u7528\u63A5\u53E3\u5B9A\u4E49\uFF0C\u5728\u7EC4\u4EF6\u7684 <code>props</code> \u4E0A\u9762\u83B7\u53D6</p><div class="language-tsx"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> VueComponent<span class="token punctuation">,</span> ComponentProps <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue3-oop&#39;</span>

<span class="token keyword">interface</span> <span class="token class-name">Foo_Props</span> <span class="token punctuation">{</span>
  size<span class="token operator">:</span> <span class="token string">&#39;small&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;large&#39;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Foo</span> <span class="token keyword">extends</span> <span class="token class-name">VueComponent<span class="token operator">&lt;</span>Foo_Props<span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> defaultProps<span class="token operator">:</span> ComponentProps<span class="token operator">&lt;</span>Foo_Props<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;size&#39;</span><span class="token punctuation">]</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>size<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u6CDB\u578B\u7EC4\u4EF6</span>
<span class="token keyword">interface</span> <span class="token class-name">Bar_Props<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> <span class="token builtin">any</span><span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
  data<span class="token operator">:</span> <span class="token constant">T</span>
  <span class="token function-variable function">onChange</span><span class="token operator">:</span> <span class="token punctuation">(</span>item<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Bar<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token keyword">extends</span> <span class="token class-name">VueComponent<span class="token operator">&lt;</span>Bar_Props<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;&gt;</span></span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> defaultProps<span class="token operator">:</span> ComponentProps<span class="token operator">&lt;</span>Bar_Props<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;data&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;onChange&#39;</span><span class="token punctuation">]</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> 
      <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>onChange<span class="token operator">?.</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">}</span></span>
    <span class="token punctuation">&gt;</span></span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>data<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre></div><div class="warning custom-block"><p class="custom-block-title">\u6CE8\u610F\uFF01</p><p>\u5B9A\u4E49\u5C5E\u6027\u4E4B\u540E\u4E00\u5B9A\u8981\u5728\u7C7B\u7684\u9759\u6001\u5C5E\u6027 <code>defaultProps</code> \u5B9A\u4E49 vue \u9700\u8981\u7684\u5C5E\u6027\u5B9A\u4E49</p></div><h2 id="\u4E0A\u4E0B\u6587" tabindex="-1">\u4E0A\u4E0B\u6587 <a class="header-anchor" href="#\u4E0A\u4E0B\u6587" aria-hidden="true">#</a></h2><p>\u7EC4\u4EF6\u7684 <code>context</code> \u5C5E\u6027\u4E0A\u9762\u5B58\u50A8\u8FD9\u4E2A\u7EC4\u4EF6\u7684 <code>emit</code>, <code>slots</code>, <code>attrs</code>, <code>expose</code>, \u5C31\u662Fsetup\u51FD\u6570\u7684\u7B2C\u4E8C\u4E2A\u53C2\u6570</p><div class="language-tsx"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> VueComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./component&#39;</span>

<span class="token keyword">class</span> <span class="token class-name">Foo</span> <span class="token keyword">extends</span> <span class="token class-name">VueComponent</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> inheritAttrs <span class="token operator">=</span> <span class="token boolean">false</span>

  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token spread"><span class="token punctuation">{</span><span class="token operator">...</span><span class="token keyword">this</span><span class="token punctuation">.</span>context<span class="token punctuation">.</span>attrs<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">foo</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="\u54CD\u5E94\u5F0F\u53D8\u91CF" tabindex="-1">\u54CD\u5E94\u5F0F\u53D8\u91CF <a class="header-anchor" href="#\u54CD\u5E94\u5F0F\u53D8\u91CF" aria-hidden="true">#</a></h2><p>\u54CD\u5E94\u5F0F\u53D8\u91CF\u4F7F\u7528\u88C5\u9970\u5668\u6CE8\u89E3\u4E00\u4E0B\uFF0C\u4E3B\u8981\u67092\u4E2A <code>Mut</code> \u548C <code>Computed</code>,\u6B64\u65F6\u5FD8\u8BB0 <code>.value</code> \u7684\u4E8B\u60C5\uFF0C \u5C31\u662F\u6B63\u5E38\u666E\u901A\u7684\u53D8\u91CF\u5B9A\u4E49\uFF0C\u52A0\u4E0A\u88C5\u9970\u5668\u5C31\u662F\u544A\u8BC9\u6846\u67B6\u5F53\u6B64\u53D8\u91CF\u53D8\u5316\u7684\u65F6\u5019\u6211\u8981\u5237\u65B0\u89C6\u56FE</p><div class="language-tsx"><pre><code><span class="token keyword">class</span> <span class="token class-name">Foo</span> <span class="token keyword">extends</span> <span class="token class-name">VueComponent</span> <span class="token punctuation">{</span>
  @<span class="token function">Mut</span><span class="token punctuation">(</span><span class="token punctuation">)</span> count <span class="token operator">=</span> <span class="token number">1</span>

  @<span class="token function">Computed</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">get</span> <span class="token function">doubleCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">*</span> <span class="token number">2</span>
  <span class="token punctuation">}</span>

  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token operator">++</span><span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token punctuation">}</span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="\u751F\u547D\u5468\u671F" tabindex="-1">\u751F\u547D\u5468\u671F <a class="header-anchor" href="#\u751F\u547D\u5468\u671F" aria-hidden="true">#</a></h2><p>\u751F\u547D\u5468\u671F\u4F7F\u7528 <code>Hook</code> \u88C5\u9970\u5668</p><div class="language-tsx"><pre><code><span class="token keyword">class</span> <span class="token class-name">Foo</span> <span class="token keyword">extends</span> <span class="token class-name">VueComponent</span> <span class="token punctuation">{</span>
  @<span class="token function">Hook</span><span class="token punctuation">(</span><span class="token string">&#39;Mounted&#39;</span><span class="token punctuation">)</span>
  <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;foo mounted&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">foo</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span> 
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="watch" tabindex="-1">watch <a class="header-anchor" href="#watch" aria-hidden="true">#</a></h2><p>watch\u5728\u6784\u9020\u51FD\u6570\u4E2D\u4F7F\u7528, \u6784\u9020\u51FD\u6570\u5176\u5B9E\u5C31\u8BA4\u4E3A\u662F setup\uFF0C\u4F60\u53EF\u4EE5\u505A\u4EFB\u4F55\u5728setup\u4E2D\u4F7F\u7528\u7684\u65B9\u6CD5</p><div class="language-tsx"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> watch <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>

<span class="token keyword">class</span> <span class="token class-name">Foo</span> <span class="token keyword">extends</span> <span class="token class-name">VueComponent</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">watch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token punctuation">,</span> <span class="token punctuation">(</span>n<span class="token punctuation">,</span> o<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;change&#39;</span><span class="token punctuation">,</span> n<span class="token punctuation">,</span> o<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  @<span class="token function">Mut</span><span class="token punctuation">(</span><span class="token punctuation">)</span> count <span class="token operator">=</span> <span class="token number">1</span>

  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token operator">++</span><span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="\u63D2\u69FD" tabindex="-1">\u63D2\u69FD <a class="header-anchor" href="#\u63D2\u69FD" aria-hidden="true">#</a></h2><p>slots\u672C\u8D28\u4E0A\u5176\u5B9E\u662F\u5C5E\u6027\u7684\u4E00\u90E8\u5206\uFF0C\u4E3A\u4E86\u6A21\u677F\u7684\u9700\u8981\u5355\u72EC\u7ED9\u62FF\u51FA\u6765\uFF0C\u4ED6\u5176\u5B9E\u5C31\u662F\u7C7B\u4F3C\u4E8E <code>react</code> \u4E2D\u7684 <code>renderProps</code>, \u6240\u4EE5\u6211\u4EEC\u53EF\u4EE5\u5728\u5C5E\u6027\u5B9A\u4E49\u7684\u65F6\u5019\u5B9A\u4E49\u4E00\u4E0B,</p><div class="language-tsx"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> VNodeChild <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> VueComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue3-oop&#39;</span>

<span class="token keyword">interface</span> <span class="token class-name">Foo_Props</span> <span class="token punctuation">{</span>
  slots<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">item</span><span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> VNodeChild
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u6B64\u65F6\u5982\u679C\u53EA\u6709slots\u7684\u8BDD\u5C31\u53EF\u4EE5\u4E0D\u7528\u5B9A\u4E49 defaultProps</span>
<span class="token keyword">class</span> <span class="token class-name">Foo</span> <span class="token keyword">extends</span> <span class="token class-name">VueComponent<span class="token operator">&lt;</span>Foo_Props<span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>context<span class="token punctuation">.</span>slots<span class="token punctuation">.</span>item<span class="token operator">?.</span><span class="token punctuation">(</span><span class="token string">&#39;aaaa&#39;</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,22),e=[o];function c(l,u,k,i,r,d){return a(),s("div",null,e)}var h=n(p,[["render",c]]);export{m as __pageData,h as default};