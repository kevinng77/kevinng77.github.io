import{_ as i,E as r,S as t,W as d,$ as a,a3 as e,Z as l,aS as s}from"./framework-d5c0d2cb.js";const c={},o=s(`<p>本文围绕 RASA + K8S 部署方案展开，对 RASA 集群性能等进行分享。</p><p>RASA 采用 sanic 搭建 API 服务，NLU 和 Dialog 模块分别由两个 API 服务组成（Kore.ai, Nuance 等平台也是采用该方案）。其中 NLU 模块涉及到 Transformer 模型的推理，属于 CPU Bound。Dialog 中大部分需要基于 NLU 模块进行逻辑推理，属于 I/O Bound。</p><p>因此实际部署过程中，我们可能会希望采用 1 个 RASA ACTION 进程，配合多个 RASA NLU 模块来进行服务。</p><h2 id="rasa-k8s" tabindex="-1"><a class="header-anchor" href="#rasa-k8s" aria-hidden="true">#</a> RASA K8S</h2><p>https://github.com/kevinng77/rasa_example/tree/master/examples/9_k8s_rasa</p><p>基于示例目的，我们采用 helm 来快速构建 RASA 集群。</p><h3 id="_1-创建-k8s-环境" tabindex="-1"><a class="header-anchor" href="#_1-创建-k8s-环境" aria-hidden="true">#</a> 1. 创建 K8S 环境</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl create namespace rasa
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>需要添加对应的 helm chart 源</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>helm repo add rasa https://helm.rasa.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-制作对应的-docker-image" tabindex="-1"><a class="header-anchor" href="#_2-制作对应的-docker-image" aria-hidden="true">#</a> 2. 制作对应的 Docker Image</h3><p>将 actionss 文件放在 <code>actions/actions.py</code> 中，执行：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> build ./action_docker <span class="token parameter variable">-t</span> <span class="token operator">&lt;</span>account_username<span class="token operator">&gt;</span>/<span class="token operator">&lt;</span>repository_name<span class="token operator">&gt;</span>:<span class="token operator">&lt;</span>custom_image_tag<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>保存后，上传到 docker 的某个 registry。本案例使用 dockerhub</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker login
docker push kevinng77/myaction
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-配置-action-helm-文件" tabindex="-1"><a class="header-anchor" href="#_3-配置-action-helm-文件" aria-hidden="true">#</a> 3. 配置 Action helm 文件</h3><p>主要修改 <code>action_values.yml</code> 其中的 image 路径:</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">image</span><span class="token punctuation">:</span>
  <span class="token comment"># -- Action Server image name to use (relative to \`registry\`)</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kevinng77/myaction

  <span class="token comment"># -- Action Server image tag to use</span>
  <span class="token key atrule">tag</span><span class="token punctuation">:</span> <span class="token string">&quot;latest&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>把 <code>kevinng77/myaction</code> 改成你 dockerhub 对应的镜像 ID 就行。</p>`,19),v={href:"https://github.com/RasaHQ/helm-charts/tree/main/charts",target:"_blank",rel:"noopener noreferrer"},u=s(`<ul><li>调整 auto scaling 方案。</li><li>Service 方案采用 ClusterIP，因为我们会将 RASA server 和 Action server 部署在同一个集群中。如果要分开部署，可以设置其他服务方式。</li></ul><h3 id="_4-安装-action-server-service" tabindex="-1"><a class="header-anchor" href="#_4-安装-action-server-service" aria-hidden="true">#</a> 4. 安装 Action server service</h3><p>参考官方提供的 helm，一键安装即可，我们将 action server 部署 release_name 为 <code>rasa-action-server</code> ：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>helm install --namespace rasa \\
  --values action_values.yml rasa-action-server rasa/rasa-action-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>更新的话使用：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>helm upgrade --namespace rasa  --reuse-values  \\
  --values action_values.yml rasa-action-server rasa/rasa-action-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-制作-rasa-image" tabindex="-1"><a class="header-anchor" href="#_5-制作-rasa-image" aria-hidden="true">#</a> 5. 制作 RASA Image</h3><p>默认的 RASA image 当中，时没有 spacy 等包的，如果你的 rasa 架构使用了 torch，paddle，spacy 等依赖，可以自行打包：</p><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token comment"># rasa_docker/Dockerfile</span>
<span class="token instruction"><span class="token keyword">FROM</span> rasa/rasa:3.4.4</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span>
<span class="token instruction"><span class="token keyword">USER</span> root</span>

<span class="token instruction"><span class="token keyword">RUN</span> pip install spacy</span>
<span class="token instruction"><span class="token keyword">RUN</span> python -m spacy download zh_core_web_trf</span>

<span class="token comment"># By best practices, don&#39;t run the code with root user</span>
<span class="token instruction"><span class="token keyword">USER</span> 1001</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>构建镜像并推送到 dockerhub：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker build ./rasa_docker -t kevinng77/rasa:3.4.4
docker push kevinng77/rasa:3.4.4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>将本地上用 <code>rasa train</code> 训练出来的模型推到 github 上（也可以是其他你可以通过 wget 下载到的地方），比如该案例中，将模型推到了： <code>https://github.com/kevinng77/rasa_model/zh_model.tar.gz</code></p><h3 id="_6-配置-rasa-helm-文件" tabindex="-1"><a class="header-anchor" href="#_6-配置-rasa-helm-文件" aria-hidden="true">#</a> 6. 配置 RASA helm 文件</h3><p>修改 rasa_values.yml, 完整文件可以参考 rasa_values.yml 文件。比较值得注意的是：</p><ul><li>rasa server 和 action server 的通信，通过 helm 配置方式为：</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## Settings for Rasa Action Server</span>
<span class="token comment">## See: https://github.com/RasaHQ/helm-charts/tree/main/charts/rasa-action-server</span>
rasa-action-server:
  <span class="token comment"># -- Install Rasa Action Server</span>
  install: <span class="token boolean">false</span>

  external:
    <span class="token comment"># -- Determine if external URL is used</span>
    enabled: <span class="token boolean">true</span>
    <span class="token comment"># -- External URL to Rasa Action Server</span>
    url: <span class="token string">&quot;http://rasa-action-server/webhook&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 URL 用的 <code>http://rasa-action-server/webhook</code> 表示 action server 在同 K8S 集群上的 resource name: <code>rasa-action-server</code> 运行。因此通过 ClusterIP 的方式就能访问到。</p><ul><li>我们设置让 rasa server（同名的 pod） 不要分布在同一个 label 中，设置 pod label 为 <code>app: rasa-server</code>，而后配置：</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>podLabels:
  app: rasa-server
affinity: 
  podAntiAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
    - labelSelector:
        matchExpressions:
        - key: app
          operator: In
          values:
          - rasa-server
      topologyKey: &quot;kubernetes.io/hostname&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中的 topologyKey 可以通过 <code>kubectl get node --show-labels</code> 查看。</p><ol><li>配置模型路径和 credentials，支持 restAPI 以及 socketio 通信。</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>applicationSettings:
	# 该路径应该是一个下载路径，对应 https://github.com/kevinng77/rasa_model/zh_model.tar.gz
	# 上的内容
  initialModel: &quot;https://github.com/kevinng77/rasa_model/blob/master/zh_model.tar.gz?raw=true&quot;
  credentials:
    # 
    enabled: true
    additionalChannelCredentials:
      rest: {}
      socketio:
        user_message_evt: user_uttered
        bot_message_evt: bot_uttered
        session_persistence: true
        # 其它 credentials 配置
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>修改 Image source 为你推送到 dockerhub 的镜像</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>image:
  name: rasa
  tag: &quot;3.4.4&quot;
  # -- Override default registry + image.name for Rasa Open Source
  repository: &quot;kevinng77/rasa&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>针对 AZURE 进行特殊服务配置</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>service:
  type: LoadBalancer
  port: 5005
  # Azure 专用 LoadBalancer 申请域名方法
  annotations: {
    service.beta.kubernetes.io/azure-dns-label-name: acrasa
  }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-启动-rasa-服务" tabindex="-1"><a class="header-anchor" href="#_7-启动-rasa-服务" aria-hidden="true">#</a> 7. 启动 RASA 服务</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>helm install \\
    --namespace rasa \\
    --values rasa_values.yml \\
    myrasa \\
    rasa/rasa
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>更新 helm 用</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>helm upgrade -f rasa_values.yml --reuse-values  \\
    --namespace rasa \\
        myrasa rasa/rasa
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-访问-rasa" tabindex="-1"><a class="header-anchor" href="#_8-访问-rasa" aria-hidden="true">#</a> 8. 访问 RASA</h3><p>可以通过 LoadBalancer 对应的 IP 地址进行方案。其中我们基于 Azure 配置，可以直接访问 IP:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http://acrasa.eastasia.cloudapp.azure.com/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>前端通过 restAPI 发送请求，或者通过 RASA 提供的 chat Widget，具体查看 RASA 官网:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;div id=&quot;rasa-chat-widget&quot; data-websocket-url=&quot;http://your_ip:5005/socket.io&quot;&gt;&lt;/div&gt;
&lt;script src=&quot;https://unpkg.com/@rasahq/rasa-chat&quot; type=&quot;application/javascript&quot;&gt;&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>通过 gevent 和 requests 在 python 上模拟了一下高峰访问：</p><p>node 配置：2 核 8G 内存。NLU 模型：SPACE ZH(400M)</p><h3 id="_9-性能测试" tabindex="-1"><a class="header-anchor" href="#_9-性能测试" aria-hidden="true">#</a> 9. 性能测试</h3><p>列名（1,10,50,100）表示 1 秒内，连续给 RASA 服务器发送请求的数量。1/2/4/10 node，表示 K8S 集群的 node 数量。数据表示每个请求从发送，到接受到第一次回复的耗时范围。</p><table><thead><tr><th>1 秒内访问数量/耗时（秒）</th><th>1</th><th>10</th><th>50</th><th>100</th></tr></thead><tbody><tr><td>1 node</td><td>0.5-0.7</td><td>2.5-3.4</td><td>12.5-14.2</td><td>27-29</td></tr><tr><td>2 node</td><td>0.5-0.7</td><td>0.5-1.4</td><td>3.9-6</td><td>8-11.2</td></tr><tr><td>4 node</td><td>0.5-0.7</td><td>0.5-0.8</td><td>1.1-3.5</td><td>2.3-5.8</td></tr><tr><td>10 node</td><td>0.5-0.7</td><td>0.5-0.7</td><td>0.5-3</td><td>0.5-3</td></tr></tbody></table><p>单台机器配置不能太低，否则轮询策略对耗时影响大。建议 4 核 16+GB 内存节点。NLU 部分对模型进行推理优化后，2 - 3 台 4 核 16+GB 内存节点就能应付好每秒钟 100 次的请求了。</p>`,41);function m(p,b){const n=r("ExternalLinkIcon");return t(),d("div",null,[o,a("p",null,[e("其他配置可以参考 "),a("a",v,[e("rasa chart"),l(n)]),e(" ，其中你可能会考虑：")]),u])}const g=i(c,[["render",m],["__file","笔记rasa3.html.vue"]]);export{g as default};
