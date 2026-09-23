import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as a,f as l}from"./app-2bfff5ab.js";const e={},p=l(`<h1 id="codex-multi-agent" tabindex="-1"><a class="header-anchor" href="#codex-multi-agent" aria-hidden="true">#</a> Codex Multi-Agent</h1><p>它本质上是在原有的 <strong>Codex Thread / Session / Agent Loop</strong> 之上，加了一层 <strong>Agent orchestration / control plane</strong> ，让一个 Agent 可以创建和控制其他独立的 Codex Thread。</p><p>从 Parent Agent 看，Subagent 首先表现为一个 Tool</p><p>Codex 给模型暴露了 multi-agent tools，例如当前代码中的：</p><ul><li><code>spawn_agent</code></li><li><code>send_input</code> / V2 的 <code>send_message</code></li><li><code>wait_agent</code></li><li><code>list_agents</code></li><li><code>close_agent</code></li><li><code>resume_agent</code></li><li>以及 V2 的 follow-up / interrupt 等能力</li></ul><hr><h2 id="agent-相关工具" tabindex="-1"><a class="header-anchor" href="#agent-相关工具" aria-hidden="true">#</a> Agent 相关工具</h2><h3 id="spawnagent" tabindex="-1"><a class="header-anchor" href="#spawnagent" aria-hidden="true">#</a> SpawnAgent</h3><p>spawn agent tool 对应的 description 和 参数（Options）：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#6A737D;"># \`spawn_agent_tool\` 使用的 description</span></span>
<span class="line"><span style="color:#D73A49;">f</span><span style="color:#032F62;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">        </span><span style="color:#005CC5;">{</span><span style="color:#24292E;">agent_role_guidance</span><span style="color:#005CC5;">}</span></span>
<span class="line"><span style="color:#032F62;">        Spawns an agent to work on the specified task. If your current task is \`/root/task1\` and you spawn_agent with task_name &quot;task_3&quot; the agent will have canonical task name \`/root/task1/task_3\`.</span></span>
<span class="line"><span style="color:#032F62;">You are then able to refer to this agent as \`task_3\` or \`/root/task1/task_3\` interchangeably. However an agent \`/root/task2/task_3\` would only be able to communicate with this agent via its canonical name \`/root/task1/task_3\`.</span></span>
<span class="line"><span style="color:#032F62;">The spawned agent will have the same tools as you and the ability to spawn its own subagents.</span></span>
<span class="line"><span style="color:#005CC5;">{</span><span style="color:#24292E;">inherited_model_guidance</span><span style="color:#005CC5;">}</span></span>
<span class="line"><span style="color:#032F62;">Only call this tool for a concrete, bounded subtask that can run independently alongside useful local work; otherwise continue locally.</span></span>
<span class="line"><span style="color:#032F62;">It will be able to send you and other running agents messages, and its final answer will be provided to you when it finishes.</span></span>
<span class="line"><span style="color:#032F62;">The new agent&#39;s canonical task name will be provided to it along with the message.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">Note that passing \`fork_turns=&quot;none&quot;\` will not pass any surrounding context to the spawned subagent, which may cause the agent to lack the context it needs to complete its task, whereas \`fork_turns=&quot;all&quot;\` will provide the subagent with all surrounding context.&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要提供一下参数：</p><div class="language-rust line-numbers-mode" data-ext="rs"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#D73A49;">pub</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SpawnAgentToolOptions</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">pub</span><span style="color:#24292E;"> available_models</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Vec</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">ModelPreset</span><span style="color:#24292E;">&gt;,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">pub</span><span style="color:#24292E;"> agent_type_description</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">String</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">pub</span><span style="color:#24292E;"> expose_agent_type</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">bool</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">pub</span><span style="color:#24292E;"> hide_agent_type_model_reasoning</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">bool</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">pub</span><span style="color:#24292E;"> expose_spawn_agent_model_overrides</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">bool</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">pub</span><span style="color:#24292E;"> multi_agent_version</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MultiAgentVersion</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">pub</span><span style="color:#24292E;"> usage_hint_text</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Option</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">String</span><span style="color:#24292E;">&gt;,</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>available_models 类似：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#24292E;">Available model overrides (optional; inherited parent model is preferred):</span></span>
<span class="line"><span style="color:#E36209;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\`gpt-5.6\`</span><span style="color:#24292E;">: Best model for complex coding and reasoning. Reasoning efforts: low, medium (default), high. Service tiers: default, fast.</span></span>
<span class="line"><span style="color:#E36209;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\`gpt-5.6-mini\`</span><span style="color:#24292E;">: Fast model for lightweight tasks. Reasoning efforts: low (default), medium. Service tiers: default.</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>agent_type_description 类似：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#24292E;">Available roles:</span></span>
<span class="line"><span style="color:#24292E;">default: {</span></span>
<span class="line"><span style="color:#24292E;">Default agent.</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">explorer: {</span></span>
<span class="line"><span style="color:#24292E;">Use </span><span style="color:#005CC5;">\`explorer\`</span><span style="color:#24292E;"> for specific codebase questions.</span></span>
<span class="line"><span style="color:#24292E;">Explorers are fast and authoritative.</span></span>
<span class="line"><span style="color:#24292E;">They must be used to ask specific, well-scoped questions on the codebase.</span></span>
<span class="line"><span style="color:#24292E;">Rules:</span></span>
<span class="line"><span style="color:#E36209;">-</span><span style="color:#24292E;"> In order to avoid redundant work, you should avoid exploring the same problem that explorers have already covered.</span></span>
<span class="line"><span style="color:#E36209;">-</span><span style="color:#24292E;"> You are encouraged to spawn up multiple explorers in parallel when you have multiple distinct questions to ask about the codebase that can be answered independently.</span></span>
<span class="line"><span style="color:#E36209;">-</span><span style="color:#24292E;"> Reuse existing explorers for related questions.</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">worker: {</span></span>
<span class="line"><span style="color:#24292E;">Use for execution and production work.</span></span>
<span class="line"><span style="color:#24292E;">Typical tasks:</span></span>
<span class="line"><span style="color:#E36209;">-</span><span style="color:#24292E;"> Implement part of a feature</span></span>
<span class="line"><span style="color:#E36209;">-</span><span style="color:#24292E;"> Fix tests or bugs</span></span>
<span class="line"><span style="color:#E36209;">-</span><span style="color:#24292E;"> Split large refactors into independent chunks</span></span>
<span class="line"><span style="color:#24292E;">Rules:</span></span>
<span class="line"><span style="color:#E36209;">-</span><span style="color:#24292E;"> Explicitly assign ownership of the task (files / responsibility).</span></span>
<span class="line"><span style="color:#E36209;">-</span><span style="color:#24292E;"> Always tell workers they are not alone in the codebase, and they should not revert the edits made by others.</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>usage_hint_text 类似：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#24292E;">usage_hint_text </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">Prefer spawning agents for independent research tasks.</span></span>
<span class="line"><span style="color:#032F62;">Avoid spawning agents for trivial sequential work.</span></span>
<span class="line"><span style="color:#032F62;">&quot;&quot;&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="sendmessage" tabindex="-1"><a class="header-anchor" href="#sendmessage" aria-hidden="true">#</a> SendMessage</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#032F62;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">Send a message to an existing agent.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">The message is queued and delivered to the target agent promptly.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">Important:</span></span>
<span class="line"><span style="color:#032F62;">- This is normal inter-agent communication.</span></span>
<span class="line"><span style="color:#032F62;">- It does NOT start a new turn for an idle target agent.</span></span>
<span class="line"><span style="color:#032F62;">- Use a relative task name when the target is addressable from the</span></span>
<span class="line"><span style="color:#032F62;">  current agent, otherwise use its canonical task path.</span></span>
<span class="line"><span style="color:#032F62;">&quot;&quot;&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参数</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#24292e;">send_message(</span></span>
<span class="line"><span style="color:#24292e;">    target: str,</span></span>
<span class="line"><span style="color:#24292e;">    message: str,</span></span>
<span class="line"><span style="color:#24292e;">)</span></span>
<span class="line"><span style="color:#24292e;"></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="followuptask" tabindex="-1"><a class="header-anchor" href="#followuptask" aria-hidden="true">#</a> FollowupTask</h3><p>send_message 发送到 queue 中，但这个 tool 会直接 trigger 一个 task。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#032F62;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">Send a follow-up task to an existing non-root agent.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">If the target agent is idle:</span></span>
<span class="line"><span style="color:#032F62;">    start a new turn.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">If the target agent is currently running:</span></span>
<span class="line"><span style="color:#032F62;">    deliver the task at an appropriate message boundary,</span></span>
<span class="line"><span style="color:#032F62;">    or after its pending tool call finishes.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">Use this when the message represents additional work,</span></span>
<span class="line"><span style="color:#032F62;">rather than ordinary communication.</span></span>
<span class="line"><span style="color:#032F62;">&quot;&quot;&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参数</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#24292e;">followup_task(</span></span>
<span class="line"><span style="color:#24292e;">    target: str,</span></span>
<span class="line"><span style="color:#24292e;">    message: str,</span></span>
<span class="line"><span style="color:#24292e;">)</span></span>
<span class="line"><span style="color:#24292e;"></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="waitagent" tabindex="-1"><a class="header-anchor" href="#waitagent" aria-hidden="true">#</a> WaitAgent</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#032F62;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">Wait for activity in the multi-agent mailbox.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">The wait may finish when:</span></span>
<span class="line"><span style="color:#032F62;">- an agent sends a message;</span></span>
<span class="line"><span style="color:#032F62;">- an agent produces a final-status notification;</span></span>
<span class="line"><span style="color:#032F62;">- new user input is steered into the current turn;</span></span>
<span class="line"><span style="color:#032F62;">- the timeout expires.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">The tool does NOT return the actual agent message content.</span></span>
<span class="line"><span style="color:#032F62;">It only reports that relevant activity occurred.</span></span>
<span class="line"><span style="color:#032F62;">&quot;&quot;&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参数：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#24292E;">wait_agent(</span></span>
<span class="line"><span style="color:#24292E;">    timeout_ms: </span><span style="color:#005CC5;">int</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#E36209;">None</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">None</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="waitagenttooloptions" tabindex="-1"><a class="header-anchor" href="#waitagenttooloptions" aria-hidden="true">#</a> WaitAgentToolOptions</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#032F62;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">Wait for a mailbox update from any live agent, including queued messages</span></span>
<span class="line"><span style="color:#032F62;">and final-status notifications.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">The wait also ends early when new user input is steered into the active turn.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">Does not return the content; returns either:</span></span>
<span class="line"><span style="color:#032F62;">- a summary of which agents have updates,</span></span>
<span class="line"><span style="color:#032F62;">- an interruption summary for steered input,</span></span>
<span class="line"><span style="color:#032F62;">- or a timeout summary if no activity arrives before the deadline.</span></span>
<span class="line"><span style="color:#032F62;">&quot;&quot;&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>multi-agent 的额外 usage guidance 里还有专门针对 <code>wait_agent</code> 的指令：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#24292E;">Call wait_agent very sparingly.</span></span>
<span class="line"><span style="color:#24292E;">Only call wait_agent when you need the result immediately for the next</span></span>
<span class="line"><span style="color:#24292E;">critical-path step and you are blocked until it returns.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">Do not redo delegated subagent tasks yourself...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">While the subagent is running in the background,</span></span>
<span class="line"><span style="color:#24292E;">do meaningful non-overlapping work immediately.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">Do not repeatedly wait by reflex.</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>等待的机制类似消息队列：</p><div class="language-rust line-numbers-mode" data-ext="rs"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">fn</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">wait_for_activity</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    activity_rx,</span></span>
<span class="line"><span style="color:#24292E;">    pending_activity,</span></span>
<span class="line"><span style="color:#24292E;">    deadline,</span></span>
<span class="line"><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#6A737D;">    // 已经有未处理事件就立即返回</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Some</span><span style="color:#24292E;">(activity) </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> pending_activity {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">match</span><span style="color:#24292E;"> activity {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">Mailbox</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MailboxActivity</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">Steer</span><span style="color:#24292E;">   </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Steered</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        };</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // 没有事件时异步挂起</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">match</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">timeout_at</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">        deadline,</span></span>
<span class="line"><span style="color:#24292E;">        activity_rx</span><span style="color:#D73A49;">.</span><span style="color:#6F42C1;">changed</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    )</span><span style="color:#D73A49;">.await</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        activity </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        timeout  </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">TimedOut</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="listagents" tabindex="-1"><a class="header-anchor" href="#listagents" aria-hidden="true">#</a> ListAgents</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#032F62;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">List live agents belonging to the current root agent tree.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">Optionally restrict results to agents whose canonical</span></span>
<span class="line"><span style="color:#032F62;">task path starts with a specified path prefix.</span></span>
<span class="line"><span style="color:#032F62;">&quot;&quot;&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参数</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#24292E;">list_agents(</span></span>
<span class="line"><span style="color:#24292E;">    path_prefix: str | None = None,</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="interruptagent" tabindex="-1"><a class="header-anchor" href="#interruptagent" aria-hidden="true">#</a> InterruptAgent</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#032F62;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">Interrupt the target agent&#39;s current turn.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">If the agent is currently working, stop that turn.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">The agent itself is not destroyed or closed:</span></span>
<span class="line"><span style="color:#032F62;">it remains available for future messages and follow-up tasks.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">Return the status that the agent had before interruption.</span></span>
<span class="line"><span style="color:#032F62;">&quot;&quot;&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参数</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#24292e;">interrupt_agent(</span></span>
<span class="line"><span style="color:#24292e;">    target: str,</span></span>
<span class="line"><span style="color:#24292e;">)</span></span>
<span class="line"><span style="color:#24292e;"></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="agentcontrol" tabindex="-1"><a class="header-anchor" href="#agentcontrol" aria-hidden="true">#</a> AgentControl</h2><ul><li></li><li>多个 agent 之间实时通信实现方式，通过本地文件状态共享？</li><li>一个 agent 使用一个 thread 有局限性，explore 是否有其他优雅的方式。</li></ul><blockquote><p>AgentControl 管理所有 Agent，如共享信息给所有 subagent</p></blockquote><hr><p>spawn_agent_tool 等工具已经在输入的 tools 列表中</p><p>模型返回 tool call，Toolrouter 找到 <code>handle_spawn_agent</code>，任务交到 <code>SpawnHandler</code>。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#6A737D;"># 流程伪代码</span></span>
<span class="line"><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">handle_spawn_agent</span><span style="color:#24292E;">(parent, args):</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 1. Parse intent</span></span>
<span class="line"><span style="color:#24292E;">    fork_mode </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> parse_fork_mode(args.fork_turns)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 2. Derive child runtime configuration</span></span>
<span class="line"><span style="color:#24292E;">    config </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> build_child_config(parent)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    apply_role(config, args.agent_type)</span></span>
<span class="line"><span style="color:#24292E;">    apply_model(config, args.model)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 3. Build identity / topology</span></span>
<span class="line"><span style="color:#24292E;">    source </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ThreadSpawnSource(</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#E36209;">parent_thread_id</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">parent.thread_id,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#E36209;">depth</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">parent.depth </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#E36209;">task_name</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">args.task_name,</span></span>
<span class="line"><span style="color:#24292E;">    )</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    child_path </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> source.agent_path</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 4. Build agent-to-agent task message</span></span>
<span class="line"><span style="color:#24292E;">    message </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> InterAgentCommunication(</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#E36209;">sender</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">parent.agent_path,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#E36209;">receiver</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">child_path,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#E36209;">content</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">args.message,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#E36209;">trigger_turn</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">True</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    )</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 5. Runtime control plane</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> agent_control.spawn(</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#E36209;">config</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">config,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#E36209;">source</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">source,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#E36209;">initial_message</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">message,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#E36209;">fork_mode</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">fork_mode,</span></span>
<span class="line"><span style="color:#24292E;">    )</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#6A737D;"># 伪代码</span></span>
<span class="line"><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">spawn</span><span style="color:#24292E;">(...):</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    check_execution_capacity()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    reservation </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> reserve_spawn_slot()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    inheritance </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> derive_runtime_inheritance(parent)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> fork_mode:</span></span>
<span class="line"><span style="color:#24292E;">        child </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> spawn_forked_thread(</span><span style="color:#005CC5;">...</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">else</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        child </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> spawn_new_thread(</span><span style="color:#005CC5;">...</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    reservation.commit(child.id)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    register_agent(child)</span></span>
<span class="line"><span style="color:#24292E;">    persist_spawn_edge(parent, child)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> send_initial_message(</span></span>
<span class="line"><span style="color:#24292E;">        child,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#E36209;">trigger_turn</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">True</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    )</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> child</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>config 的内容大致为：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="shiki github-light" style="background-color:#fff;" tabindex="0"><code><span class="line"><span style="color:#24292E;">Config(</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># ----- Model -----</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">model</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;gpt-5.6-codex&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">model_provider_id</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;openai&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">model_provider</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">ModelProviderInfo(</span><span style="color:#005CC5;">...</span><span style="color:#24292E;">),</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">model_context_window</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">200_000</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">model_auto_compact_token_limit</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">160_000</span><span style="color:#24292E;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">model_reasoning_effort</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;high&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">model_reasoning_summary</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;auto&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">service_tier</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;default&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">personality</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">None</span><span style="color:#24292E;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># ----- Instructions -----</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">base_instructions</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">        You are Codex...</span></span>
<span class="line"><span style="color:#032F62;">        ...</span></span>
<span class="line"><span style="color:#032F62;">    &quot;&quot;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">developer_instructions</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">        You are a subagent...</span></span>
<span class="line"><span style="color:#032F62;">        ...</span></span>
<span class="line"><span style="color:#032F62;">    &quot;&quot;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">include_permissions_instructions</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">True</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">include_apps_instructions</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">True</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">include_collaboration_mode_instructions</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">True</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">include_skill_instructions</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">True</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">include_environment_context</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">True</span><span style="color:#24292E;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># ----- Execution -----</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">cwd</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/repo/project&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">workspace_roots</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">[</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;/repo/project&quot;</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># ----- Permissions -----</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">permissions</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">Permissions(</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#E36209;">approval_policy</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;on-request&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#E36209;">permission_profile</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">...</span></span>
<span class="line"><span style="color:#24292E;">    ),</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">approvals_reviewer</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">...</span><span style="color:#24292E;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># ----- MCP -----</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">mcp_servers</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;github&quot;</span><span style="color:#24292E;">: McpServerConfig(</span><span style="color:#005CC5;">...</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;database&quot;</span><span style="color:#24292E;">: McpServerConfig(</span><span style="color:#005CC5;">...</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># ----- Skills / Orchestration -----</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">orchestrator_skills_enabled</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">True</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">orchestrator_mcp_enabled</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">True</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">skill_max_context_tokens</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">...</span><span style="color:#24292E;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># ----- Multi-agent -----</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">agents_enabled</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">True</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">agent_max_threads</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">6</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">agent_default_subagent_reasoning_effort</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;medium&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">agent_roles</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;explorer&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">...</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;worker&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">...</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;reviewer&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">...</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># ----- Persistence / context management -----</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">history</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">...</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">ephemeral</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">False</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">tool_output_token_limit</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">...</span><span style="color:#24292E;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># ----- Other global/runtime config -----</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">config_layer_stack</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">...</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">codex_home</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;~/.codex&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">...</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,63),o=[p];function i(t,c){return n(),a("div",null,o)}const u=s(e,[["render",i],["__file","笔记codex_multi_agent.html.vue"]]);export{u as default};
