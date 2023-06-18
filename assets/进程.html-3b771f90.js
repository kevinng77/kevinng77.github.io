import{_ as e,Q as t,V as p,Z as n,ag as s,Y as i,af as c,aQ as o,H as l}from"./framework-bcd5cf65.js";const u="/assets/img/进程/image-20210225131736591.png",r={},d=n("h1",{id:"进程-待续",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#进程-待续","aria-hidden":"true"},"#"),s(" 进程 (待续)")],-1),k=n("p",null,"嵌入式自学开始 n 个月啦~ 为了自己的贾维斯 ？！！！",-1),v=n("p",null,"进程是程序的执行实例，进程是动态的。进程在内存中运行",-1),m=n("p",null,"程序是一些指令的有序集合，而进程是程序执行的过程，进程是程序的一次执行过程。",-1),b=n("p",null,"进程的状态是变化的，其包括进程的创建、调度和消亡。",-1),h={href:"https://www.bilibili.com/video/BV1FA411v7YW?p=530&spm_id_from=pageDriver",target:"_blank",rel:"noopener noreferrer"},g=o('<h3 id="进程的状态及转换" tabindex="-1"><a class="header-anchor" href="#进程的状态及转换" aria-hidden="true">#</a> 进程的状态及转换</h3><p>进程整个生命周期可以简单划分为三种状态： <strong>就绪态：</strong> 进程已经具备执行的一切条件，正在等待分配 CPU 的处理时间。 <strong>执行态：</strong> 该进程正在占用 CPU 运行。 <strong>等待态：</strong> 进程因不具备某些执行条件而暂时无法继续执行的状态。</p><h3 id="进程的调度进制" tabindex="-1"><a class="header-anchor" href="#进程的调度进制" aria-hidden="true">#</a> 进程的调度进制：</h3><p><strong>时间片轮转，上下文切换</strong> 多进程不是说一个进程执行完再执行另一个进程，而是 <strong>交替执行</strong> 的，一个进程执行一段时间，然后下一个进程在执行一段时间，依次类推，所有进程执行完之后再回到第一个今年初继续执行以此类推</p><figure><img src="'+u+`" alt="image-20210225131736591" tabindex="0" loading="lazy"><figcaption>image-20210225131736591</figcaption></figure><h3 id="进程控制块" tabindex="-1"><a class="header-anchor" href="#进程控制块" aria-hidden="true">#</a> 进程控制块</h3><p>进程控制块就是用于 <strong>保存一个进程信息的结构体</strong> ，又称之为 PCB OS 是根据 PCB 来对并发执行的进程进行控制和管理的。系统在创建一个进程的时候会开辟一段内存空间存放与此进程相关的 PCB 数据结构。 PCB 是操作系统中最重要的记录型数据结构。PCB 中记录了用于描述进程进展情况及控制进程运行所需的全部信息。 PCB 是进程存在的唯一标志，在 Linux 中 PCB 存放在 task_struct 结构体中。 task_struct 结构体保存在 <code>/usr/src/linux-headers-4.4.0-176-generic/include/linux/sched.h</code> 一般在 1500 或者 1300 行左右，可以使用 <code>vim -t</code> 搜索</p><p>PCB 结构体中的部分数据</p><ul><li>调度数据 进程的状态、标志、优先级、调度策略等。</li><li>时间数据 创建该进程的时间、在用户态的运行时间、在内核态的运行时间等。</li><li>文件系统数据 umask 掩码、文件描述符表等。 内存数据、进程上下文、进程标识（进程号）</li></ul><h2 id="进程控制" tabindex="-1"><a class="header-anchor" href="#进程控制" aria-hidden="true">#</a> 进程控制</h2><h3 id="进程号" tabindex="-1"><a class="header-anchor" href="#进程号" aria-hidden="true">#</a> 进程号</h3><p>每个进程都由一个进程号来标识，其类型为 pid_t，进程号的范围：0～32767</p><p>ubuntu 中查看系统中所有开启的进程</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>ps ajx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>进程号(PID)</strong> 标识进程的一个非负整型数。 <strong>父进程号(PPID)</strong> 任何进程(除 init 进程)都是由另一个进程创建，该进程称为被创建进程的父进程，对应的进程 c 号称为父进程号(PPID)。 <strong>进程组号(PGID)</strong> 进程组是一个或多个进程的集合。他们之间相互关联，进程组可以接收同一终端的各信号，关联的进程有一个进程组号(PGID) 。</p><p>Linux 操作系统提供了三个获得进程号的函数 getpid()、getppid()、getpgid()。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/types.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h&gt;</span></span>
<span class="token class-name">pid_t</span> <span class="token function">getpid</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
功能：获取当前进程的进程号
<span class="token class-name">pid_t</span> <span class="token function">getppid</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
功能：获取当前进程的父进程的进程号
<span class="token class-name">pid_t</span> <span class="token function">getpgid</span><span class="token punctuation">(</span><span class="token class-name">pid_t</span> pid<span class="token punctuation">)</span><span class="token punctuation">;</span>
功能：获取当前进程所在进程组的 id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建进程-fork" tabindex="-1"><a class="header-anchor" href="#创建进程-fork" aria-hidden="true">#</a> 创建进程 fork</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h&gt;</span></span>
<span class="token class-name">pid_t</span> <span class="token function">fork</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
功能：在已有的进程基础上有创建一个子进程
参数：无
返回值：成功：
<span class="token operator">&gt;</span><span class="token number">0</span> 子进程的进程号，标识父进程的代码区
<span class="token number">0</span> 子进程的代码区
失败：
‐<span class="token number">1</span> 返回给父进程，子进程不会创建
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 fork 函数得到的子进程是父进程的一个复制品，它从父进程处继承了整个进程的地址空间 <strong>地址空间:</strong> 包括进程上下文、进程堆栈、打开的文件描述符、信号控制设定、进程优先级、进程组号 等。 子进程所独有的只有它的进程号，计时器等。因此，使用 fork 函数的代价是很大的。 fork 函数执行完毕后父子进程的空间示意图：</p><h4 id="创建子进程" tabindex="-1"><a class="header-anchor" href="#创建子进程" aria-hidden="true">#</a> 创建子进程</h4><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdlib.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h&gt;</span></span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span>argv<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token comment">//通过 fork 函数创建一个子进程</span>
<span class="token comment">//不推荐不区分创建子进程</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">if</span> <span class="token expression"><span class="token number">0</span></span></span>
<span class="token comment">//注意：主要执行一次 fork，就会在原有的进程基础上创建一个新的子进程</span>
<span class="token comment">//而且如果 fork 之后不区分父子进程的代码区，则后面所有的代码都会执行</span>
<span class="token function">fork</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;hello world\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> \\\\会打印两遍

<span class="token keyword">while</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>

<span class="token comment">//区分进程的写法</span>
<span class="token comment">//通过 fork 函数的返回值来区分父子进程的独立的代码区</span>
<span class="token class-name">pid_t</span> pid<span class="token punctuation">;</span>
pid <span class="token operator">=</span> <span class="token function">fork</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>pid <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token function">perror</span><span class="token punctuation">(</span><span class="token string">&quot;fail to fork&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">return</span> ‐<span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>pid <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token comment">//此处 pid 是子进程的进程号，父进程的代码区（在父进程中运行）</span>
<span class="token punctuation">{</span>
<span class="token keyword">while</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;parent: pid = %d, ppid = %d\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">getpid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">getppid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;pid = %d\\n&quot;</span><span class="token punctuation">,</span> pid<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;this is a parent process\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;****************\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token keyword">else</span> <span class="token comment">//子进程的代码区</span>
<span class="token punctuation">{</span><span class="token keyword">while</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;son: pid = %d, ppid = %d\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">getpid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">getppid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;this is a son process\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">}</span> 
<span class="token punctuation">}</span>
<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>父子进程是来回交替执行的，谁先运行，谁后运行是不确定的，不要认为父进程执行完之后才会执行子进程</strong></p><ul><li><p>子进程会复制父进程 fork 之前的所有内容</p></li><li><p>但是 fork 之后，父子进程完全独立，所以不管双方怎么改变（堆区、栈区、数据区等），都不会收对方影响</p></li><li><p>子进程会继承父进程的一些公有的区域，不如磁盘空间，内核空间</p></li><li><p>文件描述符的偏移量保存在内核空间中，所以父进程改变偏移量，则子进程获取的偏移量是改变之后的</p></li></ul><h4 id="进程挂起" tabindex="-1"><a class="header-anchor" href="#进程挂起" aria-hidden="true">#</a> 进程挂起</h4><p><code>sleep(2);</code></p><h4 id="进程的等待" tabindex="-1"><a class="header-anchor" href="#进程的等待" aria-hidden="true">#</a> 进程的等待</h4><p><strong>取出子进程的退出信息</strong> WIFEXITED(status) 如果子进程是正常终止的，取出的字段值非零。 WEXITSTATUS(status) 返回子进程的退出状态，退出状态保存在 status 变量的 8~16 位。在用此宏前应先用宏 WIFEXITED 判断子进程是否正常退出，正常退出才可以使用此宏。 注意： 此 status 是个 wait 的参数指向的整型变量。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code> <span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/types.h&gt;</span></span>
 <span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/wait.h&gt;</span></span>
 <span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span>argv<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
 <span class="token punctuation">{</span>
 <span class="token class-name">pid_t</span> pid<span class="token punctuation">;</span>

pid<span class="token operator">=</span><span class="token function">fork</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token keyword">if</span><span class="token punctuation">(</span>pid<span class="token operator">&lt;</span><span class="token number">0</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
 <span class="token function">perror</span><span class="token punctuation">(</span><span class="token string">&quot;fail to fork&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token keyword">return</span> ‐<span class="token number">1</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
 <span class="token keyword">if</span><span class="token punctuation">(</span>pid <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
 <span class="token punctuation">{</span>
 <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
 <span class="token keyword">for</span><span class="token punctuation">(</span>i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span><span class="token number">5</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span>
 <span class="token punctuation">{</span>
 <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;this is son process\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
 <span class="token comment">//使用 exit 退出当前进程并设置退出状态</span>
 <span class="token function">exit</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
 <span class="token keyword">else</span>
 <span class="token punctuation">{</span>
 <span class="token comment">//使用 wait(NULL)在父进程中阻塞等待子进程的退出</span>
 <span class="token comment">//不接收子进程的退出状态</span>
 <span class="token comment">//wait(NULL);</span>

 <span class="token comment">//接收子进程的退出状态，子进程中必须使用 exit 或者_exit 函数退出进程是发送退出状态</span>
 <span class="token keyword">int</span> status <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
 <span class="token function">wait</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>status<span class="token punctuation">)</span><span class="token punctuation">;</span>

 <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">WIFEXITED</span><span class="token punctuation">(</span>status<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
 <span class="token punctuation">{</span>
 <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;The son process return status: %d\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">WEXITSTATUS</span><span class="token punctuation">(</span>st
atus<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
 <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;this is father process\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">}</span>
 <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>waitpid</li></ul><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/types.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/wait.h&gt;</span></span>
<span class="token class-name">pid_t</span> <span class="token function">waitpid</span><span class="token punctuation">(</span><span class="token class-name">pid_t</span> pid<span class="token punctuation">,</span> <span class="token keyword">int</span> <span class="token operator">*</span>status<span class="token punctuation">,</span><span class="token keyword">int</span> options<span class="token punctuation">)</span>
参数：
pid：指定的进程或者进程组
pid<span class="token operator">&gt;</span><span class="token number">0</span>：等待进程 ID 等于 pid 的子进程。
pid<span class="token operator">=</span><span class="token number">0</span>：等待同一个进程组中的任何子进程，如果子进程已经加入了别的进程组，waitpid
不会等待它。
pid<span class="token operator">=</span>‐<span class="token number">1</span>：等待任一子进程，此时 waitpid 和 wait 作用一样。
pid<span class="token operator">&lt;</span>‐<span class="token number">1</span>：等待指定进程组中的任何子进程，这个进程组的 ID 等于 pid 的绝对值

status：保存子进程退出时的状态信息
options：选项
<span class="token number">0</span>：同 wait，阻塞父进程，等待子进程退出。
WNOHANG：没有任何已经结束的子进程，则立即返回。
WUNTRACED：如果子进程暂停了则此函数马上返回，并且不予以理会子进程的结束状态。
（跟踪调试，很少用到）
返回值：
成功：返回状态改变了的子进程的进程号；如果设置了选项 WNOHANG 并且 pid 指定的进程存
在则返回 <span class="token number">0</span>。
失败：返回‐<span class="token number">1</span>。当 pid 所指示的子进程不存在，或此进程存在，但不是调用进程的子进
程，waitpid 就会出错返回，这时 errno 被设置为 ECHILD
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token function">waitpid</span><span class="token punctuation">(</span>pid<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;this is father process\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="进程的终止" tabindex="-1"><a class="header-anchor" href="#进程的终止" aria-hidden="true">#</a> 进程的终止</h4><p>进程的终止</p><p><strong>使用 return</strong> return 除了可以返回值以外，在主函数中使用可以退出进程，但是在子函数中使用 只能退出当前函数</p><p><strong>使用 exit</strong> exit 可以退出一个进程并且可以刷新缓冲区.exit 为库函数，而_exit 为系统调用。在子函数中出错后使用来推出整个进程。</p><p><strong>使用、_exit</strong> _exit 可以退出一个进程，但是不会刷新缓冲区</p><h5 id="exit-函数" tabindex="-1"><a class="header-anchor" href="#exit-函数" aria-hidden="true">#</a> exit 函数</h5><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token number">1</span> #include <span class="token operator">&lt;</span>unistd<span class="token punctuation">.</span>h<span class="token operator">&gt;</span>
<span class="token number">2</span> <span class="token keyword">void</span> <span class="token function">_exit</span><span class="token punctuation">(</span><span class="token keyword">int</span> status<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token number">3</span> 功能：退出当前进程
<span class="token number">4</span> 参数：
<span class="token number">5</span> status：退出状态，由父进程通过 wait 函数接收这个状态
<span class="token number">6</span> 一般失败退出设置为非 <span class="token number">0</span>
<span class="token number">7</span> 一般成功退出设置为 <span class="token number">0</span>
<span class="token number">8</span> 返回值：
<span class="token number">9</span> 无
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="exit-函数-1" tabindex="-1"><a class="header-anchor" href="#exit-函数-1" aria-hidden="true">#</a> _exit 函数</h5><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token number">1</span> #include <span class="token operator">&lt;</span>stdlib<span class="token punctuation">.</span>h<span class="token operator">&gt;</span>
<span class="token number">2</span> <span class="token keyword">void</span> <span class="token function">exit</span><span class="token punctuation">(</span><span class="token keyword">int</span> status<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token number">3</span> 功能：退出当前进程
<span class="token number">4</span> 参数：
<span class="token number">5</span> status：退出状态，由父进程通过 wait 函数接收这个状态
<span class="token number">6</span> 一般失败退出设置为非 <span class="token number">0</span>
<span class="token number">7</span> 一般成功退出设置为 <span class="token number">0</span>
<span class="token number">8</span> 返回值：
<span class="token number">9</span> 无
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="进程退出清理" tabindex="-1"><a class="header-anchor" href="#进程退出清理" aria-hidden="true">#</a> 进程退出清理</h4><ul><li>atexit 函数在进程结束时才会去执行参数对应的回调函数</li><li>atexit 多次调用后，执行顺序与调用顺序相反</li></ul><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdlib.h&gt;</span></span>
<span class="token keyword">int</span> <span class="token function">atexit</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token punctuation">(</span><span class="token operator">*</span>function<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\\
功能：注册进程正常结束前调用的函数，进程退出执行注册函数
参数：
function：进程结束前，调用函数的入口地址。
一个进程中可以多次调用 atexit 函数注册清理函数，
正常结束前调用函数的顺序和注册时的顺序相反 c
返回值：
成功：<span class="token number">0</span>
失败：非 <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span>argv<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token function">atexit</span><span class="token punctuation">(</span>clear_fun1<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">atexit</span><span class="token punctuation">(</span>clear_fun2<span class="token punctuation">)</span><span class="token punctuation">;</span>c
<span class="token function">atexit</span><span class="token punctuation">(</span>clear_fun3<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;process exit 3 sec later!!!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="vfork" tabindex="-1"><a class="header-anchor" href="#vfork" aria-hidden="true">#</a> vfork</h4><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/types.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h&gt;</span></span>
<span class="token class-name">pid_t</span> <span class="token function">vfork</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
功能：vfork 函数和 fork 函数一样都是在已有的进程中创建一个新的进程，但它们创建的子
进程是有区别的。
返回值<span class="token operator">:</span>
成功：子进程中返回 <span class="token number">0</span><span class="token punctuation">,</span>父进程中返回子进程 ID
失败：‐<span class="token number">1</span>。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>fork 和 vfork 函数的区别：</strong></p><ul><li><p><strong>vfork 保证子进程先运行</strong> ，在它调用 exec 或 exit 之后，父进程才可能被调度运行。</p></li><li><p>vfork 和 fork 一样都创建一个子进程，但它并不将父进程的地址空间完全复制到子进程中，因为子进程会立即调用 exec(或 exit)，于是也就不访问该地址空间。</p></li><li><p>相反，在子进程中调用 exec 或 exit 之前，它在父进程的地址空间中运行，在 exec 之后子进程会有自己的进程空间。</p></li><li><p>使用 vfork 创建完子进程，在子进程执行 exit 或者 exec 之前，父子进程共有同一块地址空间</p></li></ul><p>未完待续...</p>`,50);function f(y,w){const a=l("ExternalLinkIcon");return t(),p("div",null,[d,n("blockquote",null,[k,v,m,b,n("p",null,[s("笔记总结 课程链接："),n("a",h,[s("千峰嵌入式教程"),i(a)])])]),c(" more"),g])}const _=e(r,[["render",f],["__file","进程.html.vue"]]);export{_ as default};
