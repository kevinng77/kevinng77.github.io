import{_ as p,E as o,S as i,W as c,$ as n,a3 as s,Z as e,aS as t}from"./framework-d5c0d2cb.js";const l="/assets/img/uniapp2/index_picture_1-16936464377531.png",u="/assets/img/uniapp2/index_picture_2.png",r={},d=t('<h1 id="小兔鲜儿-项目起步" tabindex="-1"><a class="header-anchor" href="#小兔鲜儿-项目起步" aria-hidden="true">#</a> 小兔鲜儿 - 项目起步</h1><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>感谢黑马程序员提供的完善资料。该文章基于黑马程序员教材做了少量改动。</p></div><h2 id="项目架构" tabindex="-1"><a class="header-anchor" href="#项目架构" aria-hidden="true">#</a> 项目架构</h2><h3 id="项目架构图" tabindex="-1"><a class="header-anchor" href="#项目架构图" aria-hidden="true">#</a> 项目架构图</h3><figure><img src="'+l+`" alt="项目架构图" tabindex="0" loading="lazy"><figcaption>项目架构图</figcaption></figure><h2 id="拉取项目模板代码" tabindex="-1"><a class="header-anchor" href="#拉取项目模板代码" aria-hidden="true">#</a> 拉取项目模板代码</h2><p>项目模板包含：目录结构，项目素材，代码风格。</p><h3 id="模板地址" tabindex="-1"><a class="header-anchor" href="#模板地址" aria-hidden="true">#</a> 模板地址</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> clone https://gitee.com/Megasu/uniapp-shop-vue3-ts.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>注意事项</p><ul><li>在 <code>manifest.json</code> 中添加微信小程序的 <code>appid</code></li></ul></blockquote><h2 id="引入-uni-ui-组件库" tabindex="-1"><a class="header-anchor" href="#引入-uni-ui-组件库" aria-hidden="true">#</a> 引入 uni-ui 组件库</h2><h3 id="操作步骤" tabindex="-1"><a class="header-anchor" href="#操作步骤" aria-hidden="true">#</a> 操作步骤</h3><p>安装 [uni-ui 组件库](https://uniapp.dcloud.net.cn/component/uniui/quickstart.html#npm 安装)</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> i @dcloudio/uni-ui
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>配置自动导入组件</strong></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// pages.json</span>
<span class="token punctuation">{</span>
  <span class="token comment">// 组件自动导入</span>
  <span class="token property">&quot;easycom&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;autoscan&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token property">&quot;custom&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// uni-ui 规则如下配置  // [!code ++]</span>
      <span class="token property">&quot;^uni-(.*)&quot;</span><span class="token operator">:</span> <span class="token string">&quot;@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue&quot;</span> <span class="token comment">// [!code ++]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;pages&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">// …省略</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>安装类型声明文件</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> i <span class="token parameter variable">-D</span> @uni-helper/uni-ui-types
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>配置类型声明文件</strong></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// tsconfig.json</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;compilerOptions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;types&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">&quot;@dcloudio/types&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;@uni-helper/uni-app-types&quot;</span><span class="token punctuation">,</span> <span class="token comment">// [!code ++]</span>
      <span class="token string">&quot;@uni-helper/uni-ui-types&quot;</span> <span class="token comment">// [!code ++]</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="小程序端-pinia-持久化" tabindex="-1"><a class="header-anchor" href="#小程序端-pinia-持久化" aria-hidden="true">#</a> 小程序端 Pinia 持久化</h2><p>说明：项目中 Pinia 用法平时完全一致，主要解决持久化插件 <strong>兼容性</strong> 问题。</p><h3 id="持久化存储插件" tabindex="-1"><a class="header-anchor" href="#持久化存储插件" aria-hidden="true">#</a> 持久化存储插件</h3>`,23),k={href:"https://prazdevs.github.io/pinia-plugin-persistedstate/guide/config.html#storage",target:"_blank",rel:"noopener noreferrer"},v=t(`<p>插件默认使用 <code>localStorage</code> 实现持久化，小程序端不兼容，需要替换持久化 API。</p><p><strong>网页端持久化 API</strong></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 网页端 API</span>
localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>多端持久化 API</strong></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 兼容多端 API</span>
uni<span class="token punctuation">.</span><span class="token function">setStorageSync</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
uni<span class="token punctuation">.</span><span class="token function">getStorageSync</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>参考代码</strong></p>`,6),m=n("div",{class:"language-typescript line-numbers-mode","data-ext":"ts"},[n("pre",{ts:"",class:"language-typescript"},[n("code",null,[n("span",{class:"token comment"},"// stores/modules/member.ts"),s(`
`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"const"),s(" useMemberStore "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"defineStore"),n("span",{class:"token punctuation"},"("),s(`
  `),n("span",{class:"token string"},"'member'"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token comment"},"//…省略"),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token comment"},"// 配置持久化"),s(`
    persist`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token comment"},"// 调整为兼容多端的 API"),s(`
      storage`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token function"},"setItem"),n("span",{class:"token punctuation"},"("),s("key"),n("span",{class:"token punctuation"},","),s(" value"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
          uni`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"setStorageSync"),n("span",{class:"token punctuation"},"("),s("key"),n("span",{class:"token punctuation"},","),s(" value"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token comment"},"// [!code warning]"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token function"},"getItem"),n("span",{class:"token punctuation"},"("),s("key"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token keyword"},"return"),s(" uni"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"getStorageSync"),n("span",{class:"token punctuation"},"("),s("key"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token comment"},"// [!code warning]"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
`),n("span",{class:"token punctuation"},")"),s(`
`)])]),n("div",{class:"highlight-lines"},[n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),b=n("h2",{id:"uni-request-请求封装",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#uni-request-请求封装","aria-hidden":"true"},"#"),s(" uni.request 请求封装")],-1),g=n("h3",{id:"添加请求和上传文件拦截器",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#添加请求和上传文件拦截器","aria-hidden":"true"},"#"),s(" 添加请求和上传文件拦截器")],-1),h=n("strong",null,"uniapp 拦截器",-1),y={href:"https://uniapp.dcloud.net.cn/api/interceptor.html",target:"_blank",rel:"noopener noreferrer"},f=n("strong",null,"接口说明",-1),x={href:"https://www.apifox.cn/apidoc/shared-0e6ee326-d646-41bd-9214-29dbf47648fa/doc-1521513",target:"_blank",rel:"noopener noreferrer"},q=t(`<p><strong>实现步骤</strong></p><ol><li>基础地址</li><li>超时时间</li><li>请求头标识</li><li>添加 token</li></ol><p><strong>参考代码</strong></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// src/utils/http.ts</span>
<span class="token keyword">const</span> httpInterceptor <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 拦截前触发</span>
  <span class="token function">invoke</span><span class="token punctuation">(</span>options<span class="token operator">:</span> UniApp<span class="token punctuation">.</span>RequestOptions<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 1. 非 http 开头需拼接地址</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>options<span class="token punctuation">.</span>url<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">&#39;http&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      options<span class="token punctuation">.</span>url <span class="token operator">=</span> baseURL <span class="token operator">+</span> options<span class="token punctuation">.</span>url
    <span class="token punctuation">}</span>
    <span class="token comment">// 2. 请求超时</span>
    options<span class="token punctuation">.</span>timeout <span class="token operator">=</span> <span class="token number">10000</span>
    <span class="token comment">// 3. 添加小程序端请求头标识</span>
    options<span class="token punctuation">.</span>header <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token operator">...</span>options<span class="token punctuation">.</span>header<span class="token punctuation">,</span>
      <span class="token string-property property">&#39;source-client&#39;</span><span class="token operator">:</span> <span class="token string">&#39;miniapp&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 4. 添加 token 请求头标识</span>
    <span class="token keyword">const</span> memberStore <span class="token operator">=</span> <span class="token function">useMemberStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> token <span class="token operator">=</span> memberStore<span class="token punctuation">.</span>profile<span class="token operator">?.</span>token
    <span class="token keyword">if</span> <span class="token punctuation">(</span>token<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      options<span class="token punctuation">.</span>header<span class="token punctuation">.</span>Authorization <span class="token operator">=</span> token
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// 拦截 request 请求</span>
uni<span class="token punctuation">.</span><span class="token function">addInterceptor</span><span class="token punctuation">(</span><span class="token string">&#39;request&#39;</span><span class="token punctuation">,</span> httpInterceptor<span class="token punctuation">)</span>
<span class="token comment">// 拦截 uploadFile 文件上传</span>
uni<span class="token punctuation">.</span><span class="token function">addInterceptor</span><span class="token punctuation">(</span><span class="token string">&#39;uploadFile&#39;</span><span class="token punctuation">,</span> httpInterceptor<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="封装-promise-请求函数" tabindex="-1"><a class="header-anchor" href="#封装-promise-请求函数" aria-hidden="true">#</a> 封装 Promise 请求函数</h3><p><strong>实现步骤</strong></p><ol><li>返回 Promise 对象</li><li>成功 resolve <ol><li>提取数据</li><li>添加泛型</li></ol></li><li>失败 reject <ol><li>401 错误</li><li>其他错误</li><li>网络错误</li></ol></li></ol><p><strong>参考代码</strong></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * 请求函数
 * <span class="token keyword">@param</span>  <span class="token parameter">UniApp</span>.RequestOptions
 * <span class="token keyword">@returns</span> Promise
 *  1. 返回 Promise 对象
 *  2. 获取数据成功
 *    2.1 提取核心数据 res.data
 *    2.2 添加类型，支持泛型
 *  3. 获取数据失败
 *    3.1 401 错误  -&gt; 清理用户信息，跳转到登录页
 *    3.2 其他错误 -&gt; 根据后端错误信息轻提示
 *    3.3 网络错误 -&gt; 提示用户换网络
 */</span>
<span class="token keyword">type</span> <span class="token class-name">Data<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  code<span class="token operator">:</span> <span class="token builtin">string</span>
  msg<span class="token operator">:</span> <span class="token builtin">string</span>
  result<span class="token operator">:</span> <span class="token constant">T</span>
<span class="token punctuation">}</span>
<span class="token comment">// 2.2 添加类型，支持泛型</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> http <span class="token operator">=</span> <span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>options<span class="token operator">:</span> UniApp<span class="token punctuation">.</span>RequestOptions<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// 1. 返回 Promise 对象</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Promise</span><span class="token operator">&lt;</span>Data<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    uni<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token operator">...</span>options<span class="token punctuation">,</span>
      <span class="token comment">// 响应成功</span>
      <span class="token function">success</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 状态码 2xx， axios 就是这样设计的</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>res<span class="token punctuation">.</span>statusCode <span class="token operator">&gt;=</span> <span class="token number">200</span> <span class="token operator">&amp;&amp;</span> res<span class="token punctuation">.</span>statusCode <span class="token operator">&lt;</span> <span class="token number">300</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 2.1 提取核心数据 res.data</span>
          <span class="token function">resolve</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>data <span class="token keyword">as</span> Data<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>res<span class="token punctuation">.</span>statusCode <span class="token operator">===</span> <span class="token number">401</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 401 错误  -&gt; 清理用户信息，跳转到登录页</span>
          <span class="token keyword">const</span> memberStore <span class="token operator">=</span> <span class="token function">useMemberStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          memberStore<span class="token punctuation">.</span><span class="token function">clearProfile</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          uni<span class="token punctuation">.</span><span class="token function">navigateTo</span><span class="token punctuation">(</span><span class="token punctuation">{</span> url<span class="token operator">:</span> <span class="token string">&#39;/pages/login/login&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
          <span class="token function">reject</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token comment">// 其他错误 -&gt; 根据后端错误信息轻提示</span>
          uni<span class="token punctuation">.</span><span class="token function">showToast</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            icon<span class="token operator">:</span> <span class="token string">&#39;none&#39;</span><span class="token punctuation">,</span>
            title<span class="token operator">:</span> <span class="token punctuation">(</span>res<span class="token punctuation">.</span>data <span class="token keyword">as</span> Data<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>msg <span class="token operator">||</span> <span class="token string">&#39;请求错误&#39;</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span>
          <span class="token function">reject</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// 响应失败</span>
      <span class="token function">fail</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        uni<span class="token punctuation">.</span><span class="token function">showToast</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          icon<span class="token operator">:</span> <span class="token string">&#39;none&#39;</span><span class="token punctuation">,</span>
          title<span class="token operator">:</span> <span class="token string">&#39;网络错误，换个网络试试&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="【拓展】代码规范" tabindex="-1"><a class="header-anchor" href="#【拓展】代码规范" aria-hidden="true">#</a> 【拓展】代码规范</h2><p><strong>为什么需要代码规范</strong></p><p>如果没有统一代码风格，团队协作不便于查看代码提交时所做的修改。</p><figure><img src="`+u+`" alt="diff" tabindex="0" loading="lazy"><figcaption>diff</figcaption></figure><h3 id="统一代码风格" tabindex="-1"><a class="header-anchor" href="#统一代码风格" aria-hidden="true">#</a> 统一代码风格</h3><ul><li>安装 <code>eslint</code> + <code>prettier</code></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">pnpm</span> i <span class="token parameter variable">-D</span> eslint prettier eslint-plugin-vue @vue/eslint-config-prettier @vue/eslint-config-typescript @rushstack/eslint-patch @vue/tsconfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>新建 <code>.eslintrc.cjs</code> 文件，添加以下 <code>eslint</code> 配置</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* eslint-env node */</span>
<span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;@rushstack/eslint-patch/modern-module-resolution&#39;</span><span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">root</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&#39;plugin:vue/vue3-essential&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;eslint:recommended&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;@vue/eslint-config-typescript&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;@vue/eslint-config-prettier&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token comment">// 小程序全局变量</span>
  <span class="token literal-property property">globals</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">uni</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">wx</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">WechatMiniprogram</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">getCurrentPages</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">UniApp</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">UniHelper</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">parserOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">ecmaVersion</span><span class="token operator">:</span> <span class="token string">&#39;latest&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&#39;prettier/prettier&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">&#39;warn&#39;</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">singleQuote</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">semi</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token literal-property property">printWidth</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span>
        <span class="token literal-property property">trailingComma</span><span class="token operator">:</span> <span class="token string">&#39;all&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">endOfLine</span><span class="token operator">:</span> <span class="token string">&#39;auto&#39;</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token string-property property">&#39;vue/multi-word-component-names&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;off&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token string-property property">&#39;vue/no-setup-props-destructure&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;off&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token string-property property">&#39;vue/no-deprecated-html-element-is&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;off&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token string-property property">&#39;@typescript-eslint/no-unused-vars&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;off&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>配置 <code>package.json</code></li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;script&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// ... 省略 ...</span>
    <span class="token property">&quot;lint&quot;</span><span class="token operator">:</span> <span class="token string">&quot;eslint . --ext .vue,.js,.ts --fix --ignore-path .gitignore&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>运行</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">pnpm</span> lint
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>到此，你已完成 <code>eslint</code> + <code>prettier</code> 的配置。</p><h3 id="git-工作流规范" tabindex="-1"><a class="header-anchor" href="#git-工作流规范" aria-hidden="true">#</a> Git 工作流规范</h3><ul><li>安装并初始化 <code>husky</code></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">pnpm</span> dlx husky-init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>安装 <code>lint-staged</code></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">pnpm</span> i lint-staged <span class="token parameter variable">-D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>配置 <code>package.json</code></li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;script&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// ... 省略 ...</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;lint-staged&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;*.{vue,ts,js}&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;eslint --fix&quot;</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>修改 <code>.husky/pre-commit</code> 文件</li></ul><div class="language-diff line-numbers-mode" data-ext="diff"><pre class="language-diff"><code>npm test   // [!code --]
pnpm lint-staged     // [!code ++]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>到此，你已完成 <code>husky</code> + <code>lint-staged</code> 的配置。</p>`,33);function _(w,j){const a=o("ExternalLinkIcon");return i(),c("div",null,[d,n("p",null,[s("持久化存储插件： "),n("a",k,[s("pinia-plugin-persistedstate"),e(a)])]),v,m,b,g,n("p",null,[h,s(" ： "),n("a",y,[s("uni.addInterceptor"),e(a)])]),n("p",null,[f,s(" ："),n("a",x,[s("接口文档"),e(a)])]),q])}const I=p(r,[["render",_],["__file","笔记uniapp2.html.vue"]]);export{I as default};
