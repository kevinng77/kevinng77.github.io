---
title: 最短路径算法（一）|Dijkstra
date: 2020-11-14
author: Kevin 吴嘉文
subtitle: '建立在贪婪算法上的一种最短路径算法原理分析，算法优化'
description: ''
keywords: 
language: cn
timezone: ''
categories:
- Notes|理论梳理
tags:
- algorithm|算法
mathjax: true
toc: true
comments: 建立在贪婪算法上的一种最短路径算法原理分析，算法优化，偏向理论
---

# Dijkstra

![image-20201114225526432](/img/Dijaska/image-20201114225526432.png)

*(图片来源 : CLRS p659 24.3)*

<!--more-->

## 原版算法

先来看看代码

```python
import math, heapq

for u in vertex:  # 这边对所有点都进行了一次Dijkstra
    heap = []
    for v in vertex:
        if v != u:
            heapq.heappush(heap, [adj[u][v] if v in adj[u] else math.inf, v])  #提取到达距离最小的节点
    dist = {u: 0}
    while len(heap) > 0:
        mindist, v = heapq.heappop(heap)
        dist[v] = mindist
        for i in range(len(heap)):
            if heap[i][1] in adj[v]:
                heap[i][0] = min(heap[i][0], mindist + adj[v][heap[i][1]])
        heapq.heapify(heap)
        
```


伪代码：

> Dijkstra(G,w,s):
>     初始化，标记所有点距离为正无穷
> 	S = $$\varnothing$$
> 	Q = V- S
> 	while Q $$\ne \varnothing：$$
>     	u = Extract-Min(Q)
>     	S = S $$\cup $$ {u} 
> 		对所有u的邻接点v:
> 			Relax(u,v,w)



```python
def Relax(u,v,w):
	if d[v] > d[u] + w:
        d[v] = d[u] + w
```




## 正确性分析

**辅助定理1:** $$d[v] \ge \delta(s,v),\ \delta(s,v) 为s到v的最短路径$$ 

无论怎么relax，对于所有目的地终点，我们都不可能得到一个比最短路径还小的答案，可以用数学归纳法证明：



初始化阶段，$$d[s]=0,d[v]= \inf $$ ，成立

**假设：**直到第 j 次relax，定理仍然成立，则 $$d[j] \ge \delta(s,j)$$。

**假设：**第一次违背定理出现在第 i 次relax，使得 $$d[i]<\delta(s,i)$$, 那么在第i次relax时候：
$$
d[i] = d[j] + w(j,i) < \delta(s,i)\\
但 d[j] + w(j,i) \ge \delta(s,j) + w(j,i)\\
\ge \delta(s,j) + \delta(j,i)\\
\ge \delta(s,i) \ 违背！！
$$
得证。





**定理2:** 当Dijkstra结束的时候，所有点都满足：$$d[v] = \delta(s,v)$$  

要证明以上定理，可以先证明当v被加进到S集合后，$$d[v] = \delta(s,v)$$  ， 且 d[v] 不会改变。

同样我们利用反正法：

**假设：** 当 u 被加入到 S 中后，定理2 第一次被违背。

当 u 将要被加入到 S 中时，$$ d[u] \ne \delta(s,u) \because 定理1 \therefore d[u] > \delta(s,u)$$  

见下图，**假设** P 为 S 到 u 的最短路径， 从起始点 s 出发沿 P 行走， $$X \rightarrow Y$$ 是第一条走出S集合的路径，及P路径上 x前的所有点都在S集合内，y之后的所有点都在S集合外。

所以在定理2 第一次被违背前，最后一个被加入到S集合的点为x, $$d[x] = \delta(s,x)$$ （因为我们假设第一次违背定理2在u）。

X被加入S后我们对x的所有邻接点relax， 包括 y。 

1. 如果在relax前 $$d[y] = \delta(s,y)$$， 那么relax后   $$d[y] = \delta(s,y)$$ .
2. 如果在relax前$$d[y] > \delta(s,y)$$, 那么 relax后 $$d[y] = d[x] + w(x,y) = \delta(s,y)$$

所以 relax后，$$d[y] = \delta(s,y)$$ 一直成立。

我们有 $$d[y] = \delta(s,y) < \delta(s,u)$$，但我们没有选择加入y到S而是加入了u，说明 $$d[u] < d[y] < \delta(s,u)$$，违反了 **辅助定理1**.

得证。

![image-20201115113459433](/img/Dijaska/image-20201115113459433.png)

​																		*（图片来源：CLRS：p660）*

## 时间复杂度

```python
for u in vertex:  ## 对所有点都进行了一次Dijkstra
    heap = [] 
    for v in vertex:  # 建一个heap O(V)
        if v != u:
            heapq.heappush(heap, [adj[u][v] if v in adj[u] else math.inf, v])  
    dist = {u: 0}
    while len(heap) > 0:  # V次
        mindist, v = heapq.heappop(heap) # O(lgV)
        dist[v] = mindist
        for i in range(len(heap)): # 总的讲，我们要做E次relax
            if heap[i][1] in adj[v]:  # 每次判断最坏用 V  
                heap[i][0] = min(heap[i][0], mindist + adj[v][heap[i][1]])  
                # O（1）如果relax完之后不马上进行heapify
                # O（lgV）如果relax完之后马上进行heapify
        heapq.heapify(heap)    #这里的heapify是对整个heap进行重新排序，不是对一个点。你也可以选择在relax之后马上对相应的点进行heapify，总消耗O(Elgv)
```

所以上面这种方法，时间复杂度为：$$O(V lgV + E lgV + EV)$$ ，当然我们可以对他进行优化，在用字典的方式记录每个v在heap中的位置以节省relax前搜索字典位置的时间，用Fibonacci Heap 来优化每次relax中修改heap值的时间，最终时间复杂度可以提高为： $$O(V lgV + E)$$ 

## 异想天开的应用

#### 逃离病毒计划 

(修改自SMU CS602 Assignment，引用请注明)

新冠来袭而你依旧深处国外，担心安危的你下定决心要用最短的时间回到中国。然而当你打开某机票网站却发现一张直达机票都没有了，现在唯一可行的方案就是从别的地方转机：

+ 很悲剧的告诉你你可能要转好几次机。

+ 健康码分为绿，橙，红三种，有些航空公司要求你拿到**当地政府**的绿码才能够登机，有些只会要求你橙了就可以登机，**但是你不能拿着前一个城市给的健康码去另一个城市登机。**

+ 当你拿着绿码抵达某个转机城市，该城市可能给你绿码，也可能会给你提升危险登记变为橙码。这取决于对乘客来源地的信任。同理橙码能够变成红码。

+ 可以通过隔离来提升自己的安全等级，每个城市有不同的隔离政策，对提升健康码等级的隔离天数也有不同要求。

你手中拥有如下数据：

+ qrtn: 每个城市升级健康码所需的隔离天数：[红到橙，橙到绿]
+ roadmap_raw: 城市航班信息："城市id1:城市id2:所需天数  城市3:城市4:所需天数"
+ target_city_list: 你要的目的地的代码

详细请参考下面这个例子：

+ 例子中 qrtn 包含7个元素，第一个0占位用请忽略。第1个元素及qrtn[1] 表示在城市1，讲橙码升级到绿码要7天，讲红码升级到橙码要14天。
+ 例子中roadmap_raw包含6个城市信息，用空格分开。1:2:10表示id为1的城市到id为2的城市需要10天。其中所需天数10为正表示两个城市之间互相信任，为负表示城市不信任，你的安全码要被降一级。
+ 例子中target_city_list 说明你最终要到达 id 为 3 或 id 为 1 的城市。
+ 在这里我们假设所有城市都要求需要橙码才能登机。

```python
qrtn = [0，[14,7],[14,7],[21,7],[13,10],[21,2],[7,14]]
roadmap_raw = "1:2:10 1:4:-15 2:4:10 2:5:45 3:4:-10 3:6:20"
target_city_list = [3,1]
```



基于这个例题，我给出几个应用Dijkstra的要点如下：

+ 虽说Dijkstra为单点对端路径优化(single source)的方案，他计算了一个点到其他所有点的最短路径。然而当你的最终目的地有多个可选项时可以却可以采用Dijkstra，只需要反向计算，从目的地出发计算每个城市到目的地的最短路径。本案例中讲所有的最终目的地点当成一个整体来计算，使得这个问题从一个多点出发最短路径问题，变成了单点出发最短路径问题。

  总结关键词：**反向计算路径**，**节点合并**

+ Dijkstra虽然快，但是局限性也大，排序要求使得他不能够再分布式系统中计算，所以相对的应用没有其他一些最短路径算法那么多，如Bellman

最后为本案例一个较为优化的算法：


```python
import math
import heapq

def come_back_soon(n, adjlist, qrtn, target_city_list):
    city_days = [math.inf for _ in range(n+1)]
    heap = []
    dist = [[math.inf for _ in range(n+1)],[math.inf for _ in range(n+1)],[math.inf for _ in range(n+1)]]
    for u in target_city_list:
        heapq.heappush(heap, [0, u, 0])
    count = 0

    while count < n:
        mindist, v, Arrive_code = heapq.heappop(heap)
        if dist[Arrive_code][v] == math.inf:
            if Arrive_code == 0:
                count += 1
                city_days[v] = mindist
                dist[0][v] = mindist
                R2O, O2G = qrtn[v]
                for i, w in adjlist[v]:

                    if w > 0:
                        if mindist + w < dist[0][i]:
                            heapq.heappush(heap, [mindist + w, i, 0])
                heapq.heappush(heap, [mindist + O2G, v, 1])

            elif Arrive_code == 1:
                dist[1][v] = mindist
                R2O, O2G = qrtn[v]

                for i, w in adjlist[v]:
                    if w < 0:
                        if mindist - w < dist[0][i]:
                            heapq.heappush(heap, [mindist - w, i, 0])
                    else:
                        if mindist + w < dist[1][i]:
                            heapq.heappush(heap, [mindist + w, i, 1])
                heapq.heappush(heap, [mindist + R2O, v, 2])

            else:
                dist[2][v] = mindist
                for i, w in adjlist[v]:
                    if dist[1][i] == math.inf:
                        if w < 0:
                            if mindist - w < dist[1][i]:
                                heapq.heappush(heap, [mindist - w, i, 1])
    return city_days[1:]
    
if __name__ == "__main__":
    n = len(qrtn)
	roadmap = [[] for i in range(n + 1)]
	s = roadmap_raw.split()
    for t in s:
        u = t.split(':')
        roadmap[int(u[0])].append((int(u[1]), int(u[2])))
        roadmap[int(u[1])].append((int(u[0]), int(u[2])))
        
    come_back_soon(n, roadmap, qrtn, target_city_list)
```



