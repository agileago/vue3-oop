import{_ as n,c as s,o as a,a as t}from"./app.a7769e12.js";const f='{"title":"Home","description":"","frontmatter":{"home":true,"heroText":"VUE3\u9762\u5411\u5BF9\u8C61\u7F16\u7A0B","tagline":"\u6781\u81F4\u4F18\u79C0\u7684\u7F16\u7801\u4F53\u9A8C","actionText":"\u5F00\u59CB\u4F7F\u7528","actionLink":"/guide/","features":[{"title":"\u7C7B\u7EC4\u4EF6","details":"\u529F\u80FD\u4E0E\u7C7B\u578B\u878D\u4E3A\u4E00\u4F53\uFF0C\u65E0\u9700\u591A\u6B21\u58F0\u660E\u7C7B\u578B\uFF0C\u72EC\u7ACB\u7684\u5C5E\u6027\u7C7B\u578B\u58F0\u660E\uFF0C\u5404\u79CDHOC\u7EC4\u5408\u8F7B\u800C\u6613\u4E3E"},{"title":"\u81EA\u52A8\u7684\u4F9D\u8D56\u6CE8\u5165","details":"\u57FA\u4E8E\u52A8\u6001\u89E3\u6790\u7684 injection-js \u4F9D\u8D56\u6CE8\u5165\uFF0C\u8BA9\u4F7F\u7528\u670D\u52A1\u4E1D\u822C\u81EA\u7136"},{"title":"vue3\u65E0ref\u7F16\u7A0B","details":"\u65E0\u9700\u5173\u6CE8ref\u53CA\u5176value\uFF0C\u6B63\u5E38\u58F0\u660E\u53D8\u91CF\uFF0C\u7F16\u7A0B\u4F53\u9A8C\u66F4\u81EA\u7136"}]},"relativePath":"index.md","lastUpdated":1638661850712}',p={},o=t(`__VP_STATIC_START__<h4 id="\u4EE5\u4E0B\u4EE3\u7801\u5C55\u793A\u5E38\u7528api" tabindex="-1">\u4EE5\u4E0B\u4EE3\u7801\u5C55\u793A\u5E38\u7528API <a class="header-anchor" href="#\u4EE5\u4E0B\u4EE3\u7801\u5C55\u793A\u5E38\u7528api" aria-hidden="true">#</a></h4><div class="language-typescript jsx"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> VueComponent<span class="token punctuation">,</span> Ref<span class="token punctuation">,</span> Autobind<span class="token punctuation">,</span> VueService <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue3-oop&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Injectable <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;injection-js&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createApp<span class="token punctuation">,</span> VNodeChild <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span>

<span class="token comment">// \u670D\u52A1\uFF0C\u5373\u53EF\u590D\u7528\u7684\u903B\u8F91 \u7C7B\u4F3C useXXX</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">CountService</span> <span class="token keyword">extends</span> <span class="token class-name">VueService</span> <span class="token punctuation">{</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Ref</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> count <span class="token operator">=</span> <span class="token number">0</span>

  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Autobind</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token operator">++</span>
  <span class="token punctuation">}</span>

  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Autobind</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token operator">--</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// \u7EC4\u4EF6</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  providers<span class="token operator">:</span> <span class="token punctuation">[</span>CountService<span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">Home</span> <span class="token keyword">extends</span> <span class="token class-name">VueComponent</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u6784\u9020\u51FD\u6570\u6CE8\u5165\u670D\u52A1\uFF0C\u65E0\u9700new</span>
  <span class="token class-name">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> countService<span class="token operator">:</span> CountService<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>span onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>countService<span class="token punctuation">.</span>add<span class="token punctuation">}</span><span class="token operator">&gt;</span><span class="token operator">+</span><span class="token operator">&lt;</span><span class="token operator">/</span>span<span class="token operator">&gt;</span>
      <span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>countService<span class="token punctuation">.</span>count<span class="token punctuation">}</span>
      <span class="token operator">&lt;</span>span onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>countService<span class="token punctuation">.</span>remove<span class="token punctuation">}</span><span class="token operator">&gt;</span><span class="token operator">-</span><span class="token operator">&lt;</span><span class="token operator">/</span>span<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u5B50\u7EC4\u4EF6\u5C5E\u6027</span>
<span class="token keyword">interface</span> <span class="token class-name">HomeChild_Props<span class="token operator">&lt;</span>DataItem <span class="token operator">=</span> <span class="token builtin">any</span><span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
  list<span class="token operator">:</span> DataItem<span class="token punctuation">[</span><span class="token punctuation">]</span>
  title<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>list<span class="token operator">:</span> DataItem<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> VNodeChild<span class="token punctuation">)</span>
  <span class="token punctuation">[</span><span class="token string">&#39;v-slots&#39;</span><span class="token punctuation">]</span><span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token keyword">default</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> VNodeChild
    <span class="token function">item</span><span class="token punctuation">(</span>item<span class="token operator">:</span> DataItem<span class="token punctuation">)</span><span class="token operator">:</span> VNodeChild
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u5B50\u7EC4\u4EF6</span>
<span class="token keyword">class</span> <span class="token class-name">HomeChild<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token keyword">extends</span> <span class="token class-name">VueComponent<span class="token operator">&lt;</span>HomeChild_Props<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;&gt;</span></span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> defaultProps<span class="token operator">:</span> ComponentProps<span class="token operator">&lt;</span>HomeChild_Props<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    list<span class="token operator">:</span> <span class="token punctuation">{</span>
      type<span class="token operator">:</span> <span class="token builtin">Array</span><span class="token punctuation">,</span>
      required<span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    title<span class="token operator">:</span> <span class="token punctuation">{</span>
      type<span class="token operator">:</span> <span class="token punctuation">[</span>String<span class="token punctuation">,</span> <span class="token builtin">Function</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      required<span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>

  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
        <span class="token punctuation">{</span>
          
        <span class="token punctuation">}</span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  
<span class="token punctuation">}</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span>Home<span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app&#39;</span><span class="token punctuation">)</span>
</code></pre></div>__VP_STATIC_END__`,2),e=[o];function c(l,u,k,r,i,d){return a(),s("div",null,e)}var y=n(p,[["render",c]]);export{f as __pageData,y as default};
