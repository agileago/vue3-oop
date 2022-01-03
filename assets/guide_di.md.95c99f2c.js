import{_ as n,c as s,o as a,a as t}from"./app.6a79d6a2.js";const h='{"title":"\u4F9D\u8D56\u6CE8\u5165","description":"","frontmatter":{},"headers":[{"level":3,"title":"\u4F9D\u8D56\u6CE8\u5165","slug":"\u4F9D\u8D56\u6CE8\u5165"}],"relativePath":"guide/di.md","lastUpdated":1641222342703}',p={},o=t(`<h3 id="\u4F9D\u8D56\u6CE8\u5165" tabindex="-1">\u4F9D\u8D56\u6CE8\u5165 <a class="header-anchor" href="#\u4F9D\u8D56\u6CE8\u5165" aria-hidden="true">#</a></h3><p>\u4F9D\u8D56\u6CE8\u5165\u662F\u4E00\u79CD\u5728\u540E\u7AEF\u975E\u5E38\u5E38\u89C1\u7684\u8BBE\u8BA1\u6A21\u5F0F\uFF0C\u5177\u4F53\u7684\u4F9D\u8D56\u6CE8\u5165\u5B66\u4E60\u8BF7\u770B</p><ul><li><a href="https://zhuanlan.zhihu.com/p/311184005" target="_blank" rel="noopener noreferrer">https://zhuanlan.zhihu.com/p/311184005</a></li><li><a href="https://zhuanlan.zhihu.com/p/113299696" target="_blank" rel="noopener noreferrer">https://zhuanlan.zhihu.com/p/113299696</a></li></ul><p>\u672C\u5E93\u7684\u4F9D\u8D56\u6CE8\u5165\u4F7F\u7528\u4E86 <code>Angular</code> \u65E9\u671F\u7684\u57FA\u4E8E\u52A8\u6001\u7684\u4F9D\u8D56\u6CE8\u5165 <code>injection-js</code> <a href="https://github.com/mgechev/injection-js" target="_blank" rel="noopener noreferrer">https://github.com/mgechev/injection-js</a>, \u7ED3\u5408vue3\u8FDB\u884C\u4E86\u96C6\u6210\u548C\u4F18\u5316\uFF0C\u4F7F\u7528\u8BF7\u770B\u4E0B\u9762\u4F8B\u5B50</p><div class="language-tsx"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> VueService<span class="token punctuation">,</span> VueComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue3-oop&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Injectable <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;injection-js&#39;</span>

<span class="token comment">// \u5B9A\u4E49\u670D\u52A1 \u52A0\u4E0A\u6B64\u88C5\u9970\u5668\u8868\u660E\u6211\u6709\u9700\u8981\u5176\u4ED6\u670D\u52A1\uFF0C\u5982\u679C\u4E0D\u9700\u8981\uFF0C\u53EF\u4EE5\u4E0D\u52A0</span>
@<span class="token function">Injectable</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">CountService</span> <span class="token keyword">extends</span> <span class="token class-name">VueService</span> <span class="token punctuation">{</span>
  @<span class="token function">Mut</span><span class="token punctuation">(</span><span class="token punctuation">)</span> count <span class="token operator">=</span> <span class="token number">1</span>

  <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token operator">++</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u52A0\u4E0A\u6B64\u88C5\u9970\u5668\u8868\u660E\u6211\u6709\u670D\u52A1\u9700\u8981\u6CE8\u5165</span>
@<span class="token function">Component</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">Home</span> <span class="token keyword">extends</span> <span class="token class-name">VueComponent</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token keyword">private</span> countService<span class="token operator">:</span> CountService</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span>

  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>countService<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>countService<span class="token punctuation">.</span>count<span class="token punctuation">}</span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>\u5728 <code>vue3-oop</code> \u91CC\u9762\uFF0C\u4F9D\u8D56\u6CE8\u5165\u662F\u5206\u5C42\u7684\uFF0C \u6BCF\u4E00\u4E2A\u5E94\u7528 <code>@Component</code> \u88C5\u9970\u5668\u7684\u7EC4\u4EF6\u90FD\u4F1A\u751F\u6210\u6CE8\u5C04\u5668\uFF0C \u6CE8\u5C04\u5668\u5728\u672C\u7EA7\u5BFB\u627E\u4E0D\u5230\u670D\u52A1\u4F1A\u81EA\u52A8\u5411\u4E0A\u7EA7\u5BFB\u627E\uFF0C\u4E0D\u8FC7\u9700\u8981\u52A0\u4E0A <code>@SkipSelf</code> \u6807\u8BC6</p><div class="language-tsx"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> VueComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./component&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> SkipSelf <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;injection-js&#39;</span>

<span class="token keyword">class</span> <span class="token class-name">CountService</span> <span class="token keyword">extends</span> <span class="token class-name">VueService</span> <span class="token punctuation">{</span>
  @<span class="token function">Mut</span><span class="token punctuation">(</span><span class="token punctuation">)</span> count <span class="token operator">=</span> <span class="token number">1</span>

  <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token operator">++</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u52A0\u4E0A\u6B64\u88C5\u9970\u5668\u8868\u660E\u6211\u6709\u670D\u52A1\u9700\u8981\u6CE8\u5165</span>
@<span class="token function">Component</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// \u5982\u679C\u67D0\u4E9B\u670D\u52A1\u53EA\u662F\u5728\u7236\u7EA7\u9700\u8981\uFF0C\u800C\u7236\u7EA7\u7EC4\u4EF6\u4E0D\u9700\u8981\u53EF\u4EE5\u76F4\u63A5\u5199\u5728\u8FD9\u91CC</span>
  providers<span class="token operator">:</span> <span class="token punctuation">[</span>CountService<span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">Home</span> <span class="token keyword">extends</span> <span class="token class-name">VueComponent</span> <span class="token punctuation">{</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">

      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

@<span class="token function">Component</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">HomeChild</span> <span class="token keyword">extends</span> <span class="token class-name">VueComponent</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>
    <span class="token keyword">private</span> countService<span class="token operator">:</span> CountService<span class="token punctuation">,</span> <span class="token comment">// \u81EA\u8EAB\u6CE8\u5165</span>
    @<span class="token function">SkipSelf</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">private</span> c2<span class="token operator">:</span> CountService <span class="token comment">// \u4ECE\u7236\u7EA7\u6CE8\u5165</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span>

  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">

      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,7),e=[o];function c(u,l,k,i,r,d){return a(),s("div",null,e)}var g=n(p,[["render",c]]);export{h as __pageData,g as default};
