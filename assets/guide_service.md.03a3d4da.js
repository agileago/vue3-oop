import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.036fba1f.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/service.md","filePath":"guide/service.md"}'),l={name:"guide/service.md"},o=p(`<h2 id="定义" tabindex="-1">定义 <a class="header-anchor" href="#定义" aria-label="Permalink to &quot;定义&quot;">​</a></h2><p>服务等价于vue3中<code>composition-api</code>，cpa本质上是用闭包把函数和变量包在一起，形成一个隔离区域，然后 再导出来给外界使用，但这样对类型不太友好，所以js提出了新的<code>class</code>写法去替代这种方式</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { onBeforeUnmount, ref } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">usePosition</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">x</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">y</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">change</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">e</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MouseEvent</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    x.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> e.clientX</span></span>
<span class="line"><span style="color:#E1E4E8;">    y.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> e.clientY</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  document.</span><span style="color:#B392F0;">addEventListener</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;mousemove&#39;</span><span style="color:#E1E4E8;">, change)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">onBeforeUnmount</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">removeEventListener</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;mousemove&#39;</span><span style="color:#E1E4E8;">, change))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    x,</span></span>
<span class="line"><span style="color:#E1E4E8;">    y</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { onBeforeUnmount, ref } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">usePosition</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">x</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">y</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">change</span><span style="color:#24292E;">(</span><span style="color:#E36209;">e</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MouseEvent</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    x.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> e.clientX</span></span>
<span class="line"><span style="color:#24292E;">    y.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> e.clientY</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  document.</span><span style="color:#6F42C1;">addEventListener</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;mousemove&#39;</span><span style="color:#24292E;">, change)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">onBeforeUnmount</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">removeEventListener</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;mousemove&#39;</span><span style="color:#24292E;">, change))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    x,</span></span>
<span class="line"><span style="color:#24292E;">    y</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>而使用服务同样能达到同样的效果</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { VueService, Autobind, VueComponent } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue3-oop&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { onBeforeUnmount } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PositionService</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VueService</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">constructor</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    window.</span><span style="color:#B392F0;">addEventListener</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;mousemove&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.change)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">onBeforeUnmount</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> window.</span><span style="color:#B392F0;">removeEventListener</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;mousemove&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.change))</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#B392F0;">Mut</span><span style="color:#E1E4E8;">() </span><span style="color:#FFAB70;">x</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#B392F0;">Mut</span><span style="color:#E1E4E8;">() </span><span style="color:#FFAB70;">y</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#B392F0;">Autobind</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">change</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">e</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MouseEvent</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.x </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> e.clientX</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.y </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> e.clientY</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Foo</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VueComponent</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">postionService</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PositionService</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#B392F0;">div</span><span style="color:#E1E4E8;">&gt;{ this.postionService.x }</span><span style="color:#F97583;">&lt;/</span><span style="color:#E1E4E8;">div</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { VueService, Autobind, VueComponent } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue3-oop&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { onBeforeUnmount } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PositionService</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VueService</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">constructor</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    window.</span><span style="color:#6F42C1;">addEventListener</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;mousemove&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.change)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">onBeforeUnmount</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> window.</span><span style="color:#6F42C1;">removeEventListener</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;mousemove&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.change))</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#6F42C1;">Mut</span><span style="color:#24292E;">() </span><span style="color:#E36209;">x</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#6F42C1;">Mut</span><span style="color:#24292E;">() </span><span style="color:#E36209;">y</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#6F42C1;">Autobind</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">change</span><span style="color:#24292E;">(</span><span style="color:#E36209;">e</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MouseEvent</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.x </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> e.clientX</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.y </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> e.clientY</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Foo</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VueComponent</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">postionService</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PositionService</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> &lt;</span><span style="color:#6F42C1;">div</span><span style="color:#24292E;">&gt;{ this.postionService.x }</span><span style="color:#D73A49;">&lt;/</span><span style="color:#24292E;">div</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>而双方的区别只是初始化的不一样， 但类天生自带类型，所以对类型非常友好，并且把 <code>.value</code>的问题解决掉, 服务与组件的区别：</p><ul><li>继承的类不一样</li><li>少了几个组件特有的属性比如 <code>props</code>, <code>context</code>, 以及 <code>render</code> 函数， 其他都一样，</li></ul><p>但假如你想在服务中获取属性和上下文可以使用 <code>useProps</code> 和 <code>useCtx</code>, 以及获取当前应用的实例 <code>getCurrentApp</code></p>`,8),e=[o];function c(t,r,E,y,i,F){return n(),a("div",null,e)}const v=s(l,[["render",c]]);export{u as __pageData,v as default};
