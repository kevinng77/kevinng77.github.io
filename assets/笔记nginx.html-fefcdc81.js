import{_ as p,E as i,S as c,W as l,$ as n,Z as e,a3 as s,aS as t}from"./framework-d5c0d2cb.js";const o={},r=n("h2",{id:"nginx-目的",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#nginx-目的","aria-hidden":"true"},"#"),s(" Nginx 目的")],-1),d=n("p",null,"在客户端和服务器之间加入管理层，实现用户访问同一地址，但能在不同服务器地址上操作。session 共享的话还是需要使用 redis 等来实现。",-1),k=n("h2",{id:"nginx",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#nginx","aria-hidden":"true"},"#"),s(" Nginx")],-1),u=n("p",null,"官方数据测试表明能够支持高达 50,000 个并发连接数的响应。平时一个 Nginx 可能就能满足小规模的业务需求。",-1),v=n("p",null,"Nginx 可以用来做很多事情：",-1),m=n("ul",null,[n("li",null,"Http 代理，反向代理"),n("li",null,"负载均衡：Nginx 提供的负载均衡策略有 2 种：内置策略和扩展策略。内置策略为轮询，加权轮询，Ip hash。扩展策略，就天马行空，只有你想不到的没有他做不到的啦，你可以参照所有的负载均衡算法，给他一一找出来做下实现。")],-1),b={href:"https://camo.githubusercontent.com/d13d6330de88bf9f549b8086be9a91cea00a0fba6093cb690afcb4b49b8834d0/68747470733a2f2f7777772e72756e6f6f622e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031382f30382f313533353732353037382d383330332d32303136303230323133333735333338322d313836333635373234322e6a7067",target:"_blank",rel:"noopener noreferrer"},_=n("img",{src:"https://camo.githubusercontent.com/d13d6330de88bf9f549b8086be9a91cea00a0fba6093cb690afcb4b49b8834d0/68747470733a2f2f7777772e72756e6f6f622e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031382f30382f313533353732353037382d383330332d32303136303230323133333735333338322d313836333635373234322e6a7067",alt:"img",tabindex:"0",loading:"lazy"},null,-1),h=n("figcaption",null,"img",-1),y={href:"https://www.liaoxuefeng.com/article/990311924891552",target:"_blank",rel:"noopener noreferrer"},w=n("li",null,"一组 host：nginx 配置更简单；",-1),x=n("li",null,"限流：nginx 配置更简单；",-1),g=n("li",null,"限 ip：nginx 配置更简单；",-1),f=n("li",null,"静态文件：nginx 可缓存；",-1),S=n("li",null,"http2：nginx 支持，内部转 http1.x 到 tomcat；",-1),L=n("li",null,"http3：nginx 支持，内部转 http1.x 到 tomcat；",-1),$=n("li",null,"临时重定向 url：nginx 改配置 reload 不重启；",-1),T=n("li",null,"遇到 500 错误：nginx 可重试；",-1),P=n("li",null,"很多 cors、自定义 header 配置、[http://www.example.com 转 http://example.com 放 nginx 不用改 java 应用。](http://www.example.xn--comhttp-c72v//example.com 放 nginx 不用改 java 应用。)",-1),E=t(`<p>核心思想是利用 nginx 强大的配置能力，避免改配置反复部署 ja 应用。</p><h2 id="nginx-的安装" tabindex="-1"><a class="header-anchor" href="#nginx-的安装" aria-hidden="true">#</a> Nginx 的安装</h2><p>可以直接用 docker 进行配置：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">--rm</span> <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> nginx <span class="token punctuation">\\</span>
    <span class="token parameter variable">--net</span> <span class="token function">host</span> <span class="token punctuation">\\</span>
    <span class="token parameter variable">-v</span> ./log:/var/log/nginx <span class="token punctuation">\\</span>
    <span class="token parameter variable">-v</span> ./nginx.conf:/etc/nginx/nginx.conf:ro <span class="token punctuation">\\</span>
    nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nginx-配置示例" tabindex="-1"><a class="header-anchor" href="#nginx-配置示例" aria-hidden="true">#</a> Nginx 配置示例</h2><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment">########### 每个指令必须有分号结束。#################</span>
<span class="token comment">#user administrator administrators;  #配置用户或者组，默认为 nobody nobody。</span>
<span class="token comment">#worker_processes 2;  #允许生成的进程数，默认为 1</span>
<span class="token comment">#pid /nginx/pid/nginx.pid;   #指定 nginx 进程运行文件存放地址</span>
<span class="token directive"><span class="token keyword">error_log</span> log/error.log debug</span><span class="token punctuation">;</span>  <span class="token comment">#制定日志路径，级别。这个设置可以放入全局块，http 块，server 块，级别以此为：debug|info|notice|warn|error|crit|alert|emerg</span>
<span class="token directive"><span class="token keyword">events</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">accept_mutex</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>   <span class="token comment">#设置网路连接序列化，防止惊群现象发生，默认为 on</span>
    <span class="token directive"><span class="token keyword">multi_accept</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>  <span class="token comment">#设置一个进程是否同时接受多个网络连接，默认为 off</span>
    <span class="token comment">#use epoll;      #事件驱动模型，select|poll|kqueue|epoll|resig|/dev/poll|eventport</span>
    <span class="token directive"><span class="token keyword">worker_connections</span>  <span class="token number">1024</span></span><span class="token punctuation">;</span>    <span class="token comment">#最大连接数，默认为 512</span>
<span class="token punctuation">}</span>
<span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">include</span>       mime.types</span><span class="token punctuation">;</span>   <span class="token comment">#文件扩展名与文件类型映射表</span>
    <span class="token directive"><span class="token keyword">default_type</span>  application/octet-stream</span><span class="token punctuation">;</span> <span class="token comment">#默认文件类型，默认为 text/plain</span>
    <span class="token comment">#access_log off; #取消服务日志    </span>
    <span class="token directive"><span class="token keyword">log_format</span> myFormat <span class="token string">&#39;<span class="token variable">$remote_addr–</span><span class="token variable">$remote_user</span> [<span class="token variable">$time_local]</span> <span class="token variable">$request</span> <span class="token variable">$status</span> <span class="token variable">$body_bytes_sent</span> <span class="token variable">$http_referer</span> <span class="token variable">$http_user_agent</span> <span class="token variable">$http_x_forwarded_for</span>&#39;</span></span><span class="token punctuation">;</span> <span class="token comment">#自定义格式</span>
    <span class="token directive"><span class="token keyword">access_log</span> log/access.log myFormat</span><span class="token punctuation">;</span>  <span class="token comment">#combined 为日志格式的默认值</span>
    <span class="token directive"><span class="token keyword">sendfile</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>   <span class="token comment">#允许 sendfile 方式传输文件，默认为 off，可以在 http 块，server 块，location 块。</span>
    <span class="token directive"><span class="token keyword">sendfile_max_chunk</span> <span class="token number">100k</span></span><span class="token punctuation">;</span>  <span class="token comment">#每个进程每次调用传输数量不能大于设定的值，默认为 0，即不设上限。</span>
    <span class="token directive"><span class="token keyword">keepalive_timeout</span> <span class="token number">65</span></span><span class="token punctuation">;</span>  <span class="token comment">#连接超时时间，默认为 75s，可以在 http，server，location 块。</span>

    <span class="token directive"><span class="token keyword">upstream</span> mysvr</span> <span class="token punctuation">{</span>   
      <span class="token directive"><span class="token keyword">server</span> 127.0.0.1:7878</span><span class="token punctuation">;</span>
      <span class="token directive"><span class="token keyword">server</span> 192.168.10.121:3333 backup</span><span class="token punctuation">;</span>  <span class="token comment">#热备</span>
    <span class="token punctuation">}</span>
    <span class="token directive"><span class="token keyword">error_page</span> <span class="token number">404</span> https://www.baidu.com</span><span class="token punctuation">;</span> <span class="token comment">#错误页</span>
    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">keepalive_requests</span> <span class="token number">120</span></span><span class="token punctuation">;</span> <span class="token comment">#单连接请求上限次数。</span>
        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">4545</span></span><span class="token punctuation">;</span>   <span class="token comment">#监听端口</span>
        <span class="token directive"><span class="token keyword">server_name</span>  127.0.0.1</span><span class="token punctuation">;</span>   <span class="token comment">#监听地址       </span>
        <span class="token directive"><span class="token keyword">location</span>  ~*^.+$</span> <span class="token punctuation">{</span>       <span class="token comment">#请求的 url 过滤，正则匹配，~为区分大小写，~*为不区分大小写。</span>
           <span class="token comment">#root path;  #根目录</span>
           <span class="token comment">#index vv.txt;  #设置默认页</span>
           <span class="token directive"><span class="token keyword">proxy_pass</span>  http://mysvr</span><span class="token punctuation">;</span>  <span class="token comment">#请求转向 mysvr 定义的服务器列表</span>
           <span class="token directive"><span class="token keyword">deny</span> 127.0.0.1</span><span class="token punctuation">;</span>  <span class="token comment">#拒绝的 ip</span>
           <span class="token directive"><span class="token keyword">allow</span> 172.18.5.54</span><span class="token punctuation">;</span> <span class="token comment">#允许的 ip           </span>
        <span class="token punctuation">}</span> 
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><details class="hint-container details"><summary>示例配置 2</summary><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># 全局参数</span>
<span class="token directive"><span class="token keyword">user</span> nginx</span><span class="token punctuation">;</span>              <span class="token comment"># Nginx 进程运行用户</span>
<span class="token directive"><span class="token keyword">worker_processes</span> auto</span><span class="token punctuation">;</span>   <span class="token comment"># Nginx 工作进程数，通常设置为 CPU 核数</span>
<span class="token directive"><span class="token keyword">error_log</span> /var/log/nginx/error.log warn</span><span class="token punctuation">;</span>    <span class="token comment"># 错误日志路径和日志级别</span>
<span class="token directive"><span class="token keyword">pid</span> /run/nginx.pid</span><span class="token punctuation">;</span>      <span class="token comment"># 进程 PID 保存路径</span>

<span class="token comment"># 定义事件模块</span>
<span class="token directive"><span class="token keyword">events</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">worker_connections</span> <span class="token number">1024</span></span><span class="token punctuation">;</span>    <span class="token comment"># 每个工作进程最大并发连接数</span>
    <span class="token directive"><span class="token keyword">use</span> epoll</span><span class="token punctuation">;</span>                  <span class="token comment"># 使用 epoll 网络模型，提高性能</span>
    <span class="token directive"><span class="token keyword">multi_accept</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>            <span class="token comment"># 开启支持多个连接同时建立</span>
<span class="token punctuation">}</span>

<span class="token comment"># 定义 HTTP 服务器模块</span>
<span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>
    <span class="token comment"># 缓存文件目录</span>
    <span class="token directive"><span class="token keyword">client_body_temp_path</span> /var/cache/nginx/client_temp</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">proxy_temp_path</span> /var/cache/nginx/proxy_temp</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">fastcgi_temp_path</span> /var/cache/nginx/fastcgi_temp</span><span class="token punctuation">;</span>

    <span class="token comment"># 定义日志格式，main 是默认的日志格式</span>
    <span class="token directive"><span class="token keyword">log_format</span> main <span class="token string">&#39;<span class="token variable">$remote_addr</span> - <span class="token variable">$remote_user</span> [<span class="token variable">$time_local]</span> &quot;<span class="token variable">$request</span>&quot; &#39;</span>
        <span class="token string">&#39;<span class="token variable">$status</span> <span class="token variable">$body_bytes_sent</span> &quot;<span class="token variable">$http_referer</span>&quot; &#39;</span>
        <span class="token string">&#39;&quot;<span class="token variable">$http_user_agent</span>&quot; &quot;<span class="token variable">$http_x_forwarded_for</span>&quot;&#39;</span></span><span class="token punctuation">;</span>

    <span class="token comment"># 默认访问日志保存路径和格式</span>
    <span class="token directive"><span class="token keyword">access_log</span> /var/log/nginx/access.log main</span><span class="token punctuation">;</span>

    <span class="token comment"># 定义 MIME 类型</span>
    <span class="token directive"><span class="token keyword">include</span> /etc/nginx/mime.types</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">default_type</span> application/octet-stream</span><span class="token punctuation">;</span>

    <span class="token comment"># 代理参数</span>
    <span class="token directive"><span class="token keyword">proxy_connect_timeout</span> <span class="token number">6s</span></span><span class="token punctuation">;</span>       <span class="token comment"># 连接超时时间</span>
    <span class="token directive"><span class="token keyword">proxy_send_timeout</span> <span class="token number">10s</span></span><span class="token punctuation">;</span>         <span class="token comment"># 发送超时时间</span>
    <span class="token directive"><span class="token keyword">proxy_read_timeout</span> <span class="token number">10s</span></span><span class="token punctuation">;</span>         <span class="token comment"># 接收超时时间</span>
    <span class="token directive"><span class="token keyword">proxy_buffer_size</span> <span class="token number">16k</span></span><span class="token punctuation">;</span>          <span class="token comment"># 缓冲区大小</span>
    <span class="token directive"><span class="token keyword">proxy_buffers</span> <span class="token number">4</span> <span class="token number">32k</span></span><span class="token punctuation">;</span>            <span class="token comment"># 缓冲区个数和大小</span>
    <span class="token directive"><span class="token keyword">proxy_busy_buffers_size</span> <span class="token number">64k</span></span><span class="token punctuation">;</span>    <span class="token comment"># 忙碌缓冲区大小</span>
    <span class="token directive"><span class="token keyword">proxy_temp_file_write_size</span> <span class="token number">64k</span></span><span class="token punctuation">;</span> <span class="token comment"># 代理临时文件写入大小</span>

    <span class="token comment"># 启用压缩，可以提高网站访问速度</span>
    <span class="token directive"><span class="token keyword">gzip</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">gzip_min_length</span> <span class="token number">1k</span></span><span class="token punctuation">;</span>                    <span class="token comment"># 最小压缩文件大小</span>
    <span class="token directive"><span class="token keyword">gzip_types</span> text/plain text/css application/json application/javascript application/xml</span><span class="token punctuation">;</span>

    <span class="token comment"># 定义 HTTP 服务器</span>
    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>              <span class="token comment"># 监听端口</span>

        <span class="token directive"><span class="token keyword">server_name</span> example.com</span><span class="token punctuation">;</span>    <span class="token comment"># 域名</span>

        <span class="token comment"># 重定向到 HTTPS，强制使用 HTTPS 访问</span>
        <span class="token directive"><span class="token keyword">if</span> (<span class="token variable">$scheme</span> != <span class="token string">&quot;https&quot;</span>)</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">return</span> <span class="token number">301</span> https://<span class="token variable">$server_name</span><span class="token variable">$request_uri</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment"># HTTPS 服务器配置</span>
        <span class="token directive"><span class="token keyword">ssl_certificate</span>      /etc/nginx/ssl/server.crt</span><span class="token punctuation">;</span>    <span class="token comment"># SSL 证书路径</span>
        <span class="token directive"><span class="token keyword">ssl_certificate_key</span>  /etc/nginx/ssl/server.key</span><span class="token punctuation">;</span>    <span class="token comment"># SSL 私钥路径</span>

        <span class="token comment"># SSL 会话缓存参数</span>
        <span class="token directive"><span class="token keyword">ssl_session_cache</span> shared:SSL:10m</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">ssl_session_timeout</span> <span class="token number">10m</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">ssl_protocols</span> TLSv1 TLSv1.1 TLSv1.2</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">ssl_prefer_server_ciphers</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">ssl_ciphers</span> ECDH+AESGCM:ECDH+AES256:ECDH+AES128:DH+3DES:!ADH:!AECDH:!MD5</span><span class="token punctuation">;</span>

        <span class="token comment"># 配置代理路径</span>
        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">proxy_pass</span> http://localhost:8080</span><span class="token punctuation">;</span>        <span class="token comment"># 转发请求的目标地址</span>
            <span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$host</span></span><span class="token punctuation">;</span>             <span class="token comment"># 设置请求头中的 Host 字段</span>
            <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span>
                            <span class="token comment"># 设置 HTTP 头中的 X-Forwarded-For 字段，表示客户端真实 IP，多个 IP 用逗号隔开</span>
            <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Real-IP <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span> <span class="token comment"># 设置请求头中的 X-Real-IP 字段，表示客户端真实 IP</span>
        <span class="token punctuation">}</span>

        <span class="token comment"># 配置静态文件访问路径</span>
        <span class="token directive"><span class="token keyword">location</span> /static/</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">alias</span> /path/to/static/files/</span><span class="token punctuation">;</span>   <span class="token comment"># 静态文件的目录</span>
            <span class="token directive"><span class="token keyword">expires</span> <span class="token number">7d</span></span><span class="token punctuation">;</span>                     <span class="token comment"># 静态文件缓存时间</span>
            <span class="token directive"><span class="token keyword">add_header</span> Pragma public</span><span class="token punctuation">;</span>       <span class="token comment"># 添加 HTTP 响应头</span>
            <span class="token directive"><span class="token keyword">add_header</span> Cache-Control <span class="token string">&quot;public, must-revalidate, proxy-revalidate&quot;</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment"># 配置错误页面</span>
        <span class="token directive"><span class="token keyword">error_page</span> <span class="token number">404</span> /404.html</span><span class="token punctuation">;</span>           <span class="token comment"># 404 错误页</span>
        <span class="token directive"><span class="token keyword">location</span> = /404.html</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">internal</span></span><span class="token punctuation">;</span>                       <span class="token comment"># 不接受外部访问</span>
            <span class="token directive"><span class="token keyword">root</span> /usr/share/nginx/html</span><span class="token punctuation">;</span>     <span class="token comment"># 404 错误页文件所在目录</span>
        <span class="token punctuation">}</span>

        <span class="token comment"># 配置重定向</span>
        <span class="token directive"><span class="token keyword">location</span> /old/</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">rewrite</span> ^/old/([^/]+) /new/<span class="token variable">$1</span> permanent</span><span class="token punctuation">;</span>   <span class="token comment"># 将/old/xxx 路径重定向为/new/xxx，返回 301 状态码</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment"># 其他服务配置</span>
    <span class="token comment"># server {</span>
    <span class="token comment">#     ...</span>
    <span class="token comment"># }</span>

    <span class="token comment"># 配置 TCP 负载均衡</span>
    <span class="token directive"><span class="token keyword">upstream</span> backends</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">server</span> backend1.example.com:8080 weight=5</span><span class="token punctuation">;</span>  <span class="token comment"># 后端服务器地址和权重</span>
        <span class="token directive"><span class="token keyword">server</span> backend2.example.com:8080</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server</span> backend3.example.com:8080 backup</span><span class="token punctuation">;</span>   <span class="token comment"># 备用服务器</span>
        <span class="token directive"><span class="token keyword">keepalive</span> <span class="token number">16</span></span><span class="token punctuation">;</span>                               <span class="token comment"># 连接池大小</span>
    <span class="token punctuation">}</span>

    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server_name</span> example.com</span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">proxy_pass</span> http://backends</span><span class="token punctuation">;</span>             <span class="token comment"># 负载均衡转发请求的目标地址</span>
            <span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$host</span></span><span class="token punctuation">;</span>            <span class="token comment"># 设置请求头中的 Host 字段</span>
            <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Real-IP <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span> <span class="token comment"># 设置请求头中的 X-Real-IP 字段，表示客户端真实 IP</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="nginx-https-配置" tabindex="-1"><a class="header-anchor" href="#nginx-https-配置" aria-hidden="true">#</a> Nginx HTTPS 配置</h3><h3 id="let-s-encrypt-免费-ssl" tabindex="-1"><a class="header-anchor" href="#let-s-encrypt-免费-ssl" aria-hidden="true">#</a> Let&#39;s Encrypt 免费 SSL</h3><p>Let&#39;s Encrypt 是一个由权威机构设置的计划，为网站用户提供免费的 SSL 证书。Let&#39;s Encrypt 证书是由非营利组织 Electronic Frontier Foundation（EFF）以及 Mozilla、Akamai、Cisco、IETF 等企业和组织提供支持，同时它也依托了 Linux 社区的合作。用户可以使用任何采用 Let&#39;s Encrypt 证书的网站而无需支付任何费用。Let&#39;s Encrypt 发行的数字证书有“DV SSL”和“OV SSL”两种类型。</p>`,10),F={href:"https://certbot.eff.org/instructions?ws=nginx&os=centosrhel8",target:"_blank",rel:"noopener noreferrer"},H=t(`<p>或者可以使用 https://github.com/kevinng77/nginx-certbot/tree/master 一键部署。</p><p>配置 <code>app.conf</code> 文件：</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> wujiawen.xyz</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_tokens</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">location</span> /.well-known/acme-challenge/</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">root</span> /var/www/certbot</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">return</span> <span class="token number">301</span> https://<span class="token variable">$host</span><span class="token variable">$request_uri</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">443</span> ssl</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> wujiawen.xyz</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_tokens</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">ssl_certificate</span> /etc/letsencrypt/live/wujiawen.xyz/fullchain.pem</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">ssl_certificate_key</span> /etc/letsencrypt/live/wujiawen.xyz/privkey.pem</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">include</span> /etc/letsencrypt/options-ssl-nginx.conf</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">ssl_dhparam</span> /etc/letsencrypt/ssl-dhparams.pem</span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">root</span> /home/blog</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">index</span>  index.html index.htm</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后启动服务：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> compose up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,5),q={href:"https://pentacent.medium.com/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71",target:"_blank",rel:"noopener noreferrer"},C=n("h3",{id:"其他免费-ssl-证书",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#其他免费-ssl-证书","aria-hidden":"true"},"#"),s(" 其他免费 ssl 证书")],-1),N=n("p",null,"Cloudflare",-1),I=n("p",null,"Cloudflare 是另一个可提供免费 SSL 证书的公司，他们是一家全球性的提供缓存和 DNS 技术的公司。Cloudflare 提供的 SSL 证书包括“Flexible SSL”、“Full SSL”、“Full SSL Strict”三种类型。CloudFlare 还提供“Always Use HTTPS”选项，将网站访问升级到 HTTPS。",-1),z=n("p",null,"SSLForFree",-1),D=n("p",null,"SSLForFree 是一个提供免费 SSL 证书的网站。用户可以在这里获取有效的数字证书。“SSLForFree”支持 RapidSSL, GeoTrust 和 Comodo 域名验证证书，用户只需要验证域名所有权，即可获得 SSL 证书的使用权。",-1),j=n("h2",{id:"资料",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#资料","aria-hidden":"true"},"#"),s(" 资料")],-1),A={href:"https://www.nginx-cn.net/",target:"_blank",rel:"noopener noreferrer"};function V(X,M){const a=i("ExternalLinkIcon");return c(),l("div",null,[r,d,k,u,v,m,n("figure",null,[n("a",b,[_,e(a)]),h]),n("ul",null,[n("li",null,[s("https 证书：nginx 配置更简单（"),n("a",y,[s("SSL 证书配置"),e(a)]),s("）；")]),w,x,g,f,S,L,$,T,P]),E,n("p",null,[s("如果可以通过命令行方式，以 root 权限进入你的服务器时，推荐使用功能 "),n("a",F,[s("certbot"),e(a)]),s("。根据官方指南操作即可。")]),H,n("p",null,[n("a",q,[s("参考文章"),e(a)])]),C,N,I,z,D,j,n("p",null,[n("a",A,[s("nginx 中文指南"),e(a)])])])}const B=p(o,[["render",V],["__file","笔记nginx.html.vue"]]);export{B as default};
