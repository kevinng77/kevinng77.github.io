import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as i,c as p,a as s,b as n,d as c,e as o,f as d}from"./app-3910e477.js";const t="/assets/img/shell/image-20210224141934571.png",r={},u=s("h1",{id:"shell-笔记",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#shell-笔记","aria-hidden":"true"},"#"),n(" shell 笔记")],-1),v=s("p",null,"嵌入式自学开始四个月啦~ 为了自己的贾维斯 ？！！！",-1),h=s("p",null,"shell 学了就没用过，要找个时间试试！",-1),b={href:"https://www.bilibili.com/video/BV1FA411v7YW?p=530&spm_id_from=pageDriver",target:"_blank",rel:"noopener noreferrer"},m=d(`<h2 id="shell-脚本" tabindex="-1"><a class="header-anchor" href="#shell-脚本" aria-hidden="true">#</a> shell 脚本</h2><ul><li><p>定义以开头: #!/bin/bash</p><ul><li>声明脚本由 shell 解释</li></ul></li><li><p>.sh</p></li><li><p>执行</p></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#24292e;">chmod +x test.sh ./test.sh # 增加可执行权限后执行</span></span>
<span class="line"><span style="color:#24292e;"># 或者使用：（不需要修改权限）</span></span>
<span class="line"><span style="color:#24292e;">bash test.sh</span></span>
<span class="line"><span style="color:#24292e;">. test.sh # 使用当前 shell 读取解释</span></span>
<span class="line"><span style="color:#24292e;"></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果使用 <code>bash test.sh</code>那么将明确指定 bash 解释器去执行脚本，脚本中的#!指定的解释器不起作用。第一种首先检测#!，如果没有则使用默认的 shell</p><p>例</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#24292e;">#!/bin/bash</span></span>
<span class="line"><span style="color:#24292e;"># shell 脚本是 shell 命令的有序集合</span></span>
<span class="line"><span style="color:#24292e;">ls</span></span>
<span class="line"><span style="color:#24292e;">pwd</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;hello world&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="自定义变量" tabindex="-1"><a class="header-anchor" href="#自定义变量" aria-hidden="true">#</a> 自定义变量</h3><ul><li><p>shell 无数据类型</p></li><li><p><strong>赋值等号两边不能加空格</strong></p></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#24292e;">num=10 </span></span>
<span class="line"><span style="color:#24292e;">i=$num</span></span>
<span class="line"><span style="color:#24292e;">echo $num</span></span>
<span class="line"><span style="color:#24292e;">unset varname #清楚变量值</span></span>
<span class="line"><span style="color:#24292e;"></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#24292e;"># 使用 read 终端读取数据</span></span>
<span class="line"><span style="color:#24292e;">read str</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;str = $str&quot;</span></span>
<span class="line"><span style="color:#24292e;"># readonly 只读变量</span></span>
<span class="line"><span style="color:#24292e;">readonly n=999</span></span>
<span class="line"><span style="color:#24292e;"></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="环境变量-规范使用大写" tabindex="-1"><a class="header-anchor" href="#环境变量-规范使用大写" aria-hidden="true">#</a> 环境变量（规范使用大写）</h4><p>env 命令查看环境变量</p><p>unset 清除环境变量</p><p>在终端执行命令，临时设置变量</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#24292e;">MYVAL=999</span></span>
<span class="line"><span style="color:#24292e;">export MYVAL</span></span>
<span class="line"><span style="color:#24292e;"></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>永久设置，需要在配置文件（~/.bashrc 或/etc/profile）中进行设置即可，设置完毕后需要通过<code>source ~/.bashrc</code> 命令配置文件立即生效，否认需要重启终端来生效</p><h4 id="预设变量" tabindex="-1"><a class="header-anchor" href="#预设变量" aria-hidden="true">#</a> 预设变量</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#24292e;">$#：传给 shell 脚本参数的数量</span></span>
<span class="line"><span style="color:#24292e;">$*：传给 shell 脚本参数的内容</span></span>
<span class="line"><span style="color:#24292e;">$1、$2、$3、...、$9,\${10}：运行脚本时传递给其的参数，用空格隔开</span></span>
<span class="line"><span style="color:#24292e;">$?：命令执行后返回的状态</span></span>
<span class="line"><span style="color:#24292e;">&quot;$?&quot;用于检查上一个命令执行是否正确(在 Linux 中，命令退出状态为 0 表示该命令正确执</span></span>
<span class="line"><span style="color:#24292e;">行，任何非 0 值表示命令出错)。</span></span>
<span class="line"><span style="color:#24292e;">$0：当前执行的进程名</span></span>
<span class="line"><span style="color:#24292e;">$$：当前进程的进程号</span></span>
<span class="line"><span style="color:#24292e;">&quot;$$&quot;变量最常见的用途是用作临时文件的名字以保证临时文件不会重复</span></span>
<span class="line"><span style="color:#24292e;"></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="脚本变量的特殊用法" tabindex="-1"><a class="header-anchor" href="#脚本变量的特殊用法" aria-hidden="true">#</a> 脚本变量的特殊用法</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#24292e;">&quot;&quot;（双引号）：包含的变量会被解释</span></span>
<span class="line"><span style="color:#24292e;">&#39;&#39;（单引号）：包含的变量会当做字符串解释</span></span>
<span class="line"><span style="color:#24292e;">\`\`(数字键 1 左面的反引号)：反引号中的内容作为系统命令，并执行其内容，可以替换输出为</span></span>
<span class="line"><span style="color:#24292e;">一个变量，和$()的结果一样</span></span>
<span class="line"><span style="color:#24292e;">$ echo &quot;today is \`date\` &quot;</span></span>
<span class="line"><span style="color:#24292e;">today is 2012 年 07 月 29 日星期日 12:55:21 CST</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">\\ 转义字符：</span></span>
<span class="line"><span style="color:#24292e;">同 c 语言 \\n \\t \\r \\a 等 echo 命令需加-e 转义</span></span>
<span class="line"><span style="color:#24292e;">echo ‐e &quot;this \\n is\\ta\\ntest&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">(命令序列)：</span></span>
<span class="line"><span style="color:#24292e;">由子 shell 来完成,不影响当前 shell 中的变量</span></span>
<span class="line"><span style="color:#24292e;">( num=999;echo &quot;1 $num&quot; )</span></span>
<span class="line"><span style="color:#24292e;">echo 1:$num</span></span>
<span class="line"><span style="color:#24292e;">{ 命令序列 }：</span></span>
<span class="line"><span style="color:#24292e;">在当前 shell 中执行，会影响当前变量</span></span>
<span class="line"><span style="color:#24292e;">{ num=666; echo &quot;2 $num&quot;; }</span></span>
<span class="line"><span style="color:#24292e;">echo 2:$num</span></span>
<span class="line"><span style="color:#24292e;"></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="条件测试语句" tabindex="-1"><a class="header-anchor" href="#条件测试语句" aria-hidden="true">#</a> 条件测试语句</h4><p>test 命令：用于测试字符串、文件状态和数字 test 命令有两种格式: <code>test condition</code> 或 <code>[ condition ]</code><strong>使用方括号时，要注意在条件两边加上空格</strong> shell 脚本中的条件测试如下： 文件测试、字符串测试、数字测试、复合测试 测试语句一般与后面讲的条件语句联合使用</p><h5 id="文件测试" tabindex="-1"><a class="header-anchor" href="#文件测试" aria-hidden="true">#</a> 文件测试</h5><p><strong>1）按照文件类型</strong> -e 文件名 文件是否存在 -s 文件名 是否为非空 -b 文件名 块设备文件 -c 文件名 字符设备文件 -d 文件名 目录文件 -f 文件名 普通文件 -L 文件名 软链接文件 -S 文件名 套接字文件 -p 文件名 管道文件</p><p><strong>2）按照文件权限</strong> -r 文件名 可读 -w 文件名 可写 -x 文件名 可执行</p><p><strong>3）两个文件之间的比较</strong> 文件 1 -nt 文件 2 文件 1 的修改时间是否比文件 2 新 文件 1 -ot 文件 2 文件 1 的修改时间是否比文件 2 旧 文件 1 -ef 文件 2 两个文件的 inode 节点号是否一样，用于判断是否是硬链接</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#24292e;">#! /bin/bash</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">echo &quot;please input a filename &gt;&gt;&gt; &quot;</span></span>
<span class="line"><span style="color:#24292e;">read FILE</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">test ‐e $FILE</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;存在？$?&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="字符串测试" tabindex="-1"><a class="header-anchor" href="#字符串测试" aria-hidden="true">#</a> 字符串测试</h5><p>s1 = s2 测试两个字符串的内容是否完全一样 s1 != s2 测试两个字符串的内容是否有差异 -z s1 测试 s1 字符串的长度是否为 0</p><p>-n s1 测试 s1 字符串的长度是否不为 0</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#24292e;">test &quot;hello&quot; = &quot;hello&quot;</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;相等？$?&quot;</span></span>
<span class="line"><span style="color:#24292e;">test ‐z &quot;hello&quot;</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;长度是否为 0？$?&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="数字测试" tabindex="-1"><a class="header-anchor" href="#数字测试" aria-hidden="true">#</a> 数字测试</h5><p>a -eq b 测试 a 与 b 是否相等 a -ne b 测试 a 与 b 是否不相等 a -gt b 测试 a 是否大于 b a -ge b 测试 a 是否大于等于 b a -lt b 测试 a 是否小于 b a -le b 测试 a 是否小于等于 b</p><h5 id="复合测试" tabindex="-1"><a class="header-anchor" href="#复合测试" aria-hidden="true">#</a> 复合测试</h5><p>第一种形式：命令执行控制 (两边需要完整的命令) &amp;&amp;： command1 &amp;&amp; command2 &amp;&amp;左边命令（command1）执行成功(即返回 0）shell 才执行&amp;&amp;右边的命令 （command2）</p><p>|| command1 || command2 ||左边的命令（command1）未执行成功(即返回非 0）shell 才执行||右边的命令 （command2）</p><p>第二种形式：多重条件判定</p><p>-a : test -r file -a -x file</p><p>-o : test -r file -o -x file</p><p>! : test ! -x file</p><h3 id="控制语句" tabindex="-1"><a class="header-anchor" href="#控制语句" aria-hidden="true">#</a> 控制语句</h3><h4 id="if" tabindex="-1"><a class="header-anchor" href="#if" aria-hidden="true">#</a> if</h4><h4 id="格式一" tabindex="-1"><a class="header-anchor" href="#格式一" aria-hidden="true">#</a> 格式一</h4><blockquote><p>if [ 条件 1 ]; then 执行第一段程序 else 执行第二段程序</p><p>fi</p></blockquote><p><strong>中括号的空格一定要</strong></p><h4 id="格式二" tabindex="-1"><a class="header-anchor" href="#格式二" aria-hidden="true">#</a> 格式二：</h4><blockquote><p>if [ 条件 1 ]; then 执行第一段程序 elif [ 条件 2 ]；then 执行第二段程序 else 执行第三段程序 fi</p></blockquote><h4 id="case" tabindex="-1"><a class="header-anchor" href="#case" aria-hidden="true">#</a> case</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#24292e;">case &quot;$1&quot; in</span></span>
<span class="line"><span style="color:#24292e;">	&quot;one&quot; | n*)  # n* 星可以匹配任意多个字符</span></span>
<span class="line"><span style="color:#24292e;">		echo &quot;your choice is one&quot;</span></span>
<span class="line"><span style="color:#24292e;">		;;</span></span>
<span class="line"><span style="color:#24292e;">	&quot;two&quot;)</span></span>
<span class="line"><span style="color:#24292e;">		echo &quot;your choice is two&quot;</span></span>
<span class="line"><span style="color:#24292e;">		;;</span></span>
<span class="line"><span style="color:#24292e;">	&quot;three&quot;)</span></span>
<span class="line"><span style="color:#24292e;">		echo &quot;Your choice is three&quot;</span></span>
<span class="line"><span style="color:#24292e;">		;;</span></span>
<span class="line"><span style="color:#24292e;">	*)</span></span>
<span class="line"><span style="color:#24292e;">		echo &quot;Error Please try again!&quot;</span></span>
<span class="line"><span style="color:#24292e;">		exit 1  # 推出整个程序，后面的都不会执行</span></span>
<span class="line"><span style="color:#24292e;">		;;</span></span>
<span class="line"><span style="color:#24292e;">esac</span></span>
<span class="line"><span style="color:#24292e;"></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="for" tabindex="-1"><a class="header-anchor" href="#for" aria-hidden="true">#</a> for</h4><p>我们可以讲命令的输出放在 for 循环后面，来进行骚操作</p><figure><img src="`+t+`" alt="image-20210224141934571" tabindex="0" loading="lazy"><figcaption>image-20210224141934571</figcaption></figure><p>形式一：</p><p>可以声明整数类型变量<code>declare -i sum</code> 需要声明 sum 才可以进行加法运算</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#24292e;">declare -i sum</span></span>
<span class="line"><span style="color:#24292e;">for (( i=1; i&lt;=100; i++ ))</span></span>
<span class="line"><span style="color:#24292e;">do</span></span>
<span class="line"><span style="color:#24292e;">	sum=sum+i</span></span>
<span class="line"><span style="color:#24292e;">done</span></span>
<span class="line"><span style="color:#24292e;"></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>形式二：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#24292e;">for i in 1 2 3 4 5 6 7 8 9</span></span>
<span class="line"><span style="color:#24292e;">do</span></span>
<span class="line"><span style="color:#24292e;">	echo $i</span></span>
<span class="line"><span style="color:#24292e;">done</span></span>
<span class="line"><span style="color:#24292e;"></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="while" tabindex="-1"><a class="header-anchor" href="#while" aria-hidden="true">#</a> while</h4><p><strong>中括号两边要加空格</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#24292e;">while [ &quot;$i&quot; != &quot;101&quot; ] </span></span>
<span class="line"><span style="color:#24292e;">do</span></span>
<span class="line"><span style="color:#24292e;">	s+=i;</span></span>
<span class="line"><span style="color:#24292e;">	i=i+1;</span></span>
<span class="line"><span style="color:#24292e;">done</span></span>
<span class="line"><span style="color:#24292e;"></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="until" tabindex="-1"><a class="header-anchor" href="#until" aria-hidden="true">#</a> until</h4><p>条件成立后中断</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#24292e;">until [ &quot;$i&quot; = &quot;101&quot; ]</span></span>
<span class="line"><span style="color:#24292e;">do</span></span>
<span class="line"><span style="color:#24292e;">s+=i;</span></span>
<span class="line"><span style="color:#24292e;">i=i+1;</span></span>
<span class="line"><span style="color:#24292e;">done</span></span>
<span class="line"><span style="color:#24292e;"></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="break-continue" tabindex="-1"><a class="header-anchor" href="#break-continue" aria-hidden="true">#</a> break, continue</h4><p>与 C 中一样</p><h3 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h3><ul><li><strong>shell 中，出了括号里定义的变量，函数中定义的变量不加修饰的话，都可以认为是全局变量</strong></li></ul><p>格式二： function 函数名（） { 命令 ... }</p><p>return 从函数中返回，用最后状态命令决定返回值。 return 0 无错误返回 return 1 有错误返回</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#24292e;">myadd()</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">        A=$1</span></span>
<span class="line"><span style="color:#24292e;">        B=$2</span></span>
<span class="line"><span style="color:#24292e;">        SUM=\`expr $A + $B\`</span></span>
<span class="line"><span style="color:#24292e;">        echo &quot;$A + $B = $SUM&quot;</span></span>
<span class="line"><span style="color:#24292e;">        return $SUM</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">myadd 33 33</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;$?&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#函数的返回值一般通过$?可以获取到，但是$?获取到的最大值是 255，如果超过这个值，会出错</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,70);function y(g,f){const e=l("ExternalLinkIcon");return i(),p("div",null,[u,s("blockquote",null,[v,h,s("p",null,[n("笔记总结 课程链接："),s("a",b,[n("千峰嵌入式教程"),c(e)])])]),o(" more"),m])}const k=a(r,[["render",y],["__file","笔记shell.html.vue"]]);export{k as default};
