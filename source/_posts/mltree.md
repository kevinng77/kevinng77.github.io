---
title: Ensemble Learning(二)|重要的树相关算法
date: 2021-08-15
author: Kevin 吴嘉文
categories:
- Notes|理论梳理
tags:
- Machine Learning
mathjax: true
toc: true
comments: 
---

# 回归提升树，XGBoost, LightGBM

> 在 Ensemble Learning(一) 介绍了 random forest，decision tree，bagging等基础概念，但他们相关的应用缺比较少。相对而言，以下介绍的这几种算法在面试、竞赛中的出现频率高了许多。本文主要为算法梳理，可以保证一点细节都没有。

<!--more-->

## 决策树相关基础

信息增益 - 特征A对数据集D的信息增益
$$
g(D, A)=H(D)-H(D \mid A)
$$
也就是 D 的熵与 特征A对数据集D的经验条件熵的差。
$$
H(D)=-\sum_{k=1}^{K} \frac{\left|C_{k}\right|}{|D|} \log _{2} \frac{\left|C_{k}\right|}{|D|}
$$

$$
H(D \mid A)=\sum_{i=1}^{n} \frac{\left|D_{i}\right|}{|D|} H\left(D_{i}\right)=-\sum_{i=1}^{n} \frac{\left|D_{i}\right|}{|D|} \sum_{k=1}^{K} \frac{\left|D_{i k}\right|}{\left|D_{i}\right|} \log _{2} \frac{\left|D_{i k}\right|}{\left|D_{i}\right|}
$$

#### 决策树 ID3

算法 $$\mathbf{5 . 2}(\mathbf{I D} 3$$ 算法）
输入：训练数据集 $$D$$, 特征集 $$A$$ 阈值 $$\varepsilon ;$$ 输出：决策树 $$T$$ 。
(1) 若 $$D$$ 中所有实例属于同一类 $$C_{k}$$, 则 $$T$$ 为单结点树, 并将类 $$C_{k}$$ 作为该结点 的类标记, 返回 $$T$$;
(2) 若 $$A=\varnothing$$, 则 $$T$$ 为单结点树, 并将 $$D$$ 中实例数最大的类 $$C_{k}$$ 作为该结点的类 标记, 返回 $$T$$;
(3)否则, 计算 $$A$$ 中各特征对 $$D$$ 的信息增益, 选择信息增益最大的特 征 $$A_{g}$$;
(4) 如果 $$A_{g}$$ 的信息增益小于阈值 $$\varepsilon$$, 则置 $$T$$ 为单结点树, 并将 $$D$$ 中实例数最大的类 $$C_{k}$$ 作为该结点的类标记, 返回 $$T$$;
(5)否则, 对 $$A_{g}$$ 的每一可能值 $$a_{i}$$, 依 $$A_{g}=a_{i}$$ 将 $$D$$ 分割为若干非空子集 $$D_{i}$$, 将$$D_{i}$$ 中实例数最大的类作为标记, 构建子结点, 由结点及其子结点构成树 $$T$$, 返回 $$T$$;
(6) 对第 $$i$$ 个子结点, 以 $$D_{i}$$ 为训练集, 以 $$A-\left\{A_{g}\right\}$$ 为特征集, 递归地调用步 $$(1) \sim$$ 步 (5), 得到子树 $$T_{i}$$, 返回 $$T_{i}$$​ 。

#### 决策树CART

决策树的生成就是递归地构建二叉决策树的过程。对回归树用平方误差最小化准
则，对分类树用基尼指数(Gini index) 最小化准则，进行特征选择，生成二叉树。

对二分类问题，使用 基尼指数最小化。对回归问题使用平方误差最小化。
$$
\operatorname{Gini}(p)=\sum_{k=1}^{K} p_{k}\left(1-p_{k}\right)=1-\sum_{k=1}^{K} p_{k}^{2}
$$


#### adaboost

> adaboost 的概念很好，但似乎他被使用的频率不高。他的主要思想是：在学习的过程中，根据误差率不断调整对每个样本的权重，来学习出不同的基本分类器。最后讲这些基本分类器进行ensemble。

算法 $$8.1$$​ ( AdaBoost)
输入: 训练数据集 $$T=\left\{\left(x_{1}, y_{1}\right),\left(x_{2}, y_{2}\right), \cdots,\left(x_{N}, y_{N}\right)\right\}$$​, 其中 $$x_{i} \in \mathcal{X} \subseteq \mathbf{R}^{n}, y_{i} \in \mathcal{Y}=\{-1,+1\} ;$$ 弱学习算法;
输出: 最终分类器 $$G(x)$$​ 。
(1) 初始化训练数据的权值分布
$$
D_{1}=\left(w_{11}, \cdots, w_{1 i}, \cdots, w_{1 N}\right), \quad w_{1 i}=\frac{1}{N}, \quad i=1,2, \cdots, N
$$
(2) 对 $$m=1,2, \cdots, M$$
（a）使用具有权值分布 $$D_{m}$$ 的训练数据集学习，得到基本分类器
$$
G_{m}(x): \mathcal{X} \rightarrow\{-1,+1\}
$$
（b）计算 $$G_{m}(x)$$ 在训练数据集上的分类误差率
$$
e_{m}=\sum_{i=1}^{N} P\left(G_{m}\left(x_{i}\right) \neq y_{i}\right)=\sum_{i=1}^{N} w_{m i} I\left(G_{m}\left(x_{i}\right) \neq y_{i}\right)
$$
(c) 计算 $$G_{m}(x)$$ 的系数
$$
\alpha_{m}=\frac{1}{2} \log \frac{1-e_{m}}{e_{m}}
$$
这里的对数是自然对数。
(d) 更新训练数据集的权值分布
$$
\begin{array}{c}
D_{m+1}=\left(w_{m+1,1}, \cdots, w_{m+1, i}, \cdots, w_{m+1, N}\right) \\
w_{m+1, i}=\frac{w_{m i}}{Z_{m}} \exp \left(-\alpha_{m} y_{i} G_{m}\left(x_{i}\right)\right), \quad i=1,2, \cdots, N
\end{array}
$$
最后我们得到的模型就是：$$\hat y = \sum_{m\in M}\alpha_m G_{m}(x)$$

#### 回归提升树

> 回归提升树，针对y之间的误差值来建立新的树

已知一个训练数据集 $$T=\left\{\left(x_{1}, y_{1}\right),\left(x_{2}, y_{2}\right), \cdots,\left(x_{N}, y_{N}\right)\right\}, x_{i} \in \mathcal{X} \subseteq \mathbf{R}^{n}, \mathcal{X}$$ 为
输入空间, $$y_{i} \in \mathcal{Y} \subseteq \mathbf{R}, \mathcal{Y}$$ 为输出空间。在 $$5.5$$ 节中已经讨论了回归树的问题。如果将 输入空间 $$\mathcal{X}$$ 划分为 $$J$$ 个互不相交的区域 $$R_{1}, R_{2}, \cdots, R_{J}$$, 并且在每个区域上确定输 出的常量 $$c_{j}$$, 那么树可表示为
$$
T(x ; \Theta)=\sum_{j=1}^{J} c_{j} I\left(x \in R_{j}\right)
$$
其中, 参数 $$\Theta=\left\{\left(R_{1}, c_{1}\right),\left(R_{2}, c_{2}\right), \cdots,\left(R_{J}, c_{J}\right)\right\}$$ 表示树的区域划分和各区域上的常数。 $$J$$ 是回归树的复杂度即叶结点个数。

回归问题提升树使用以下前向分步算法:
$$
\begin{array}{l}
f_{0}(x)=0 \\
f_{m}(x)=f_{m-1}(x)+T\left(x ; \Theta_{m}\right), \quad m=1,2, \cdots, M \\
f_{M}(x)=\sum_{m=1}^{M} T\left(x ; \Theta_{m}\right)
\end{array}
$$
在前向分步算法的第 $$m$$ 步, 给定当前模型 $$f_{m-1}(x)$$, 需求解
$$
\hat{\Theta}_{m}=\arg \min _{\Theta_{m}} \sum_{i=1}^{N} L\left(y_{i}, f_{m-1}\left(x_{i}\right)+T\left(x_{i} ; \Theta_{m}\right)\right)
$$
得到 $$\hat{\Theta}_{m}$$, 即第 $$m$$ 棵树的参数。

#### 梯度提升树

> 针对梯度的大小来建立新的树，损失函数一般为sigmoid或者exp

输入: 训练数据集 $$T=\left\{\left(x_{1}, y_{1}\right),\left(x_{2}, y_{2}\right), \cdots,\left(x_{N}, y_{N}\right)\right\}, x_{i} \in \mathcal{X} \subseteq \mathbf{R}^{n}, y_{i} \in \mathcal{Y} \subseteq \mathbf{R} ;$$
损失函数 $$L(y, f(x))$$; 输出：回归树 $$\hat{f}(x)$$ 。
(1) 初始化
$$
f_{0}(x)=\arg \min _{c} \sum_{i=1}^{N} L\left(y_{i}, c\right)
$$
(2) 对 $$m=1,2, \cdots, M$$
(a) 对 $$i=1,2, \cdots, N$$​, 计算
$$
r_{m i}=-\left[\frac{\partial L\left(y_{i}, f\left(x_{i}\right)\right)}{\partial f\left(x_{i}\right)}\right]_{f(x)=f_{m-1}(x)}
$$
(b) 对 $$r_{m i}$$ 拟合一个回归树, 得到第 $$m$$ 棵树的叶结点区域 $$R_{m j}, j=1,2, \cdots, J$$ 。
(c) 对 $$j=1,2, \cdots, J$$, 计算
$$
c_{m j}=\arg \min _{c} \sum_{x_{i} \in R_{m j}} L\left(y_{i}, f_{m-1}\left(x_{i}\right)+c\right)
$$
(d) 更新 $$f_{m}(x)=f_{m-1}(x)+\sum_{j=1}^{J} c_{m j} I\left(x \in R_{m j}\right)$$
（3）得到回归树
$$
\hat{f}(x)=f_{M}(x)=\sum_{m=1}^{M} \sum_{i=1}^{J} c_{m j} I\left(x \in R_{m j}\right)
$$

#### XGBoost 

算法可并行，训练效率高，实际效率好，可控参数多，可以灵活调整 

整体的算法可以考虑为让第K个树的目标函数最小。

定义一棵树： $$f_t(x)=w_{q(x)}$$ 树由叶子的权重 $$w$$ 和实例到叶子节点的映射关系 $$q(x)$$ 决定，映射关系即在第几个叶子上。

树的复杂度由节点数量，和叶子树 T 和所有叶子的总权重 $$w$$ 决定

**目标函数：**

损失项：$$\mathcal{L}^{(t)} \simeq \sum_{i=1}^{n}\left[l\left(y_{i}, \hat{y}^{(t-1)}\right)+g_{i} f_{t}\left(\mathbf{x}_{i}\right)+\frac{1}{2} h_{i} f_{t}^{2}\left(\mathbf{x}_{i}\right)\right]$$

惩罚项：$$\Omega(f)=\gamma T+\frac{1}{2} \lambda\|w\|^{2}$$

总的损失为：
$$
\begin{aligned}
\tilde{\mathcal{L}}^{(t)} &=\sum_{i=1}^{n}\left[g_{i} f_{t}\left(\mathbf{x}_{i}\right)+\frac{1}{2} h_{i} f_{t}^{2}\left(\mathbf{x}_{i}\right)\right]+\gamma T+\frac{1}{2} \lambda \sum_{j=1}^{T} w_{j}^{2} \\
&=\sum_{j=1}^{T}\left[\left(\sum_{i \in I_{j}} g_{i}\right) w_{j}+\frac{1}{2}\left(\sum_{i \in I_{j}} h_{i}+\lambda\right) w_{j}^{2}\right]+\gamma T
\end{aligned}
$$
大括号内为二元方程，所以可以求得在树结构已知情况下的最优损失为：
$$
\tilde{\mathcal{L}}^{(t)}(q)=-\frac{1}{2} \sum_{j=1}^{T} \frac{\left(\sum_{i \in I_{j}} g_{i}\right)^{2}}{\sum_{i \in I_{j}} h_{i}+\lambda}+\gamma T
$$
**贪婪算法：**

在每个树选择分支的时候，选择使**目标函数减小幅度最大**的节点拓展方案。

这个方案需要

遍历所有的特征，遍历所有特征的分裂点，选最优的样本和对应分裂点。

循环知道条件终止

**近似算法:**

解决数据太大无法读入内存进行计算。

在计算最优分裂点前，先筛选出一些候选分裂点。筛选方式为：
$$
r_{k}(z)=\frac{1}{\sum_{(x, h) \in \mathcal{D}_{k}} h} \sum_{(x, h) \in \mathcal{D}_{k}, x<z} h\\
\left|r_{k}\left(s_{k, j}\right)-r_{k}\left(s_{k, j+1}\right)\right|<\epsilon, \quad s_{k 1}=\min _{i} \mathbf{x}_{i k}, s_{k l}=\max _{i} \mathbf{x}_{i k}
$$
可以采用global方式（每个树初始化时候选一次候选分裂点。）或local方式（每次分裂的时候选一次）

 **稀疏感知算法**

在稀疏数据中，对于缺少的数值，每个节点都有一个默认的分配稀疏值方向。这个方向通过算法可以计算得到。具体算法看原文。

这样所需要遍历样本量大大减小。

**XGBOOT 的优点：**

精度高 - 对比GBDT，优化函数考虑了泰勒二阶展开式

正则化 - 有助于防止过拟合，这个比GBDT好

列抽样 - 减少计算量

缺失值处理

可并行算法

#### Lightgbm

**histogram optimization** - 将连续性数据通过bin映射到离散型数据上

**leaf-wise learning** - 在其他树中，大部分都是每一层选择一个特征，然后对所有节点都进行分裂（level-wise learning）而在lightgbm中是选择一个叶节点进行分裂，因此lightgb增加了最大深度限制，防止过拟合。

参数分析

```python
boosting_type (string, optional (default='gbdt')) # ‘gbdt’,
num_leaves (int, optional (default=31)) # 叶子总数量，用于控制树的复杂度,2^max_depth
max_depth (int, optional (default=-1)) # 防止leaf-wise过拟合
learning_rate (float, optional (default=0.1)) – # callbacks parameter of fit method to shrink/adapt learning rate in training using reset_parameter callback.
subsample_for_bin (int, optional (default=200000)) # 用多少sample来构建我们histogram optimization的bins.越少算越快。
objective (string, callable or None, optional (default=None)) # binary 或者 multiclass
class_weight (dict, 'balanced' or None, optional (default=None)) # multiclass的不同权重
min_split_gain (float, optional (default=0.))
min_child_weight (float, optional (default=1e-3))
min_child_samples (int, optional (default=20)) # 一个叶子上最少的样本数，防止过拟合
subsample (float, optional (default=1.)) # 随机抽取多少作为样本
subsample_freq (int, optional (default=0)) # 表示每训练n次就进行一次bagging, <=0 表示禁用bagging.
colsample_bytree (float, optional (default=1.)) # 类似与随机森林，开局选一些比例的特征来训练
reg_alpha (float, optional (default=0.)) # L1 regularization term on weights.
reg_lambda (float, optional (default=0.)) # L2 regularization term on weights.
importance_type (string, optional (default='split')) # The type of feature importance to be filled into feature_importances_. If ‘split’, result contains numbers of times the feature is used in a model. If ‘gain’, result contains total gains of splits which use the feature.
```

