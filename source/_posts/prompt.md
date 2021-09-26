---
title: Prompt范式（一）
date: 2021-09-26
author: Kevin 吴嘉文
categories:
- Notes|理论梳理
tags:
- NLP
- Prompt
mathjax: true
toc: true
comments: 笔记
---

# Prompt范式 （一）

<img src="/img/prompt/image-20210923203741995.png" alt="image-20210923203741995" style="zoom: 33%;" />

> 《Pre-train, Prompt, and Predict: A Systematic Survey of Prompting Methods in Natural Language Processing》 这篇prompt综述中，详细地对NLP进展与目前prompt的作品进行了充分的分析与总结。同时作者在 [github上](https://github.com/thunlp/PromptPapers) 对prompt论文进行了总结。Prompt 这个系列将根据这些 prompt paper 进行笔记总结与梳理。
>
> 本文中将包括 PET, Prefix-Tuning, P-Tuning三个模型对应的论文笔记。

<!--more-->

## Prompt综述

> 论文：Pre-train, Prompt, and Predict: A Systematic Survey of Prompting Methods in Natural Language Processing **极力推荐下载并阅读这篇长达46的论文 ！** 
>
> 笔者第一次阅读该综述时仍对某些部分（如Continuous prompt）感到十分困惑。于是便决定先深入理解和阅读相关prompt论文与模型。相信之后再次浏览该综述时，会有更多的收货。
>
> 相关网文：[近代自然语言处理技术发展的“第四范式”](https://zhuanlan.zhihu.com/p/395115779) 

NLP 发展经过了四个阶段，可以通过四个关键词来分别概括：

+ **feature engineering** - 注重特征工程的机械学习（完全监督学习）。
+ **architecture engineering** - 注重模型架构的机械学习、深度学习。
+ **pre-train and fine-tune (objective engineering)** - 基于预训练、微调
+ **pre-train, prompt, and predict (prompt engineering)** - 基于预训练，提示（prompt）和预测

而目前，我们似乎正在从第三阶段迈向第四阶段。

#### prompt的基础

![image-20210923200315332](/img/prompt/image-20210923200315332.png)

什么是Prompt呢？我们先来看一种基础的prompt方法。如上，prompt方程将一个输入进行拓展与延伸，有点类似于小学语文老师教书时用到的举一反三。对于一个样本（<u>我爱看这部电影</u>， 正面），通过prompt范式方程，我们可以从输入语句联系到其他相关的知识点（符合语言逻辑的知识点），如：<u>这是一部很**棒**的电影</u>。（或<u>**电影**是一个实体</u>等）。然后我们对原输入与拓展部分进行拼接，得到了新的模型输入：<u>我爱看这部电影。这是一部很**棒**的电影。</u>

#### **Prompt的直觉**

引用文章 -[近代自然语言处理技术发展的“第四范式”](https://zhuanlan.zhihu.com/p/395115779) 中的表述：解决任务时，**大家都是希望让 预训练语言模型和下游任务靠的更近，只是实现的方式不一样**。

**Fine-tuning中：是预训练语言模型“迁就“各种下游任务。**具体体现就是上面提到的通过引入各种辅助任务loss，将其添加到预训练模型中，然后继续pre-training，以便让其更加适配下游任务。总之，这个过程中，预训练语言模型做出了更多的牺牲。
**Prompting中，是各种下游任务“迁就“预训练语言模型。**具体体现也是上面介绍的，我们需要对不同任务进行重构，使得它达到适配预训练语言模型的效果。总之，这个过程中，是下游任务做出了更多的牺牲。

<img src="/img/prompt/image-20210926210554255.png" alt="image-20210926210554255" style="zoom:33%;" />

*(来源：知乎 [近代自然语言处理技术发展的“第四范式”](https://zhuanlan.zhihu.com/p/395115779) )*

由上面的对比，不难看出我们希望尽可能保留预训练模型在大预料库中学习到的知识，这一点体现在大部分Prompt的方式都会冻结预训练模型权重，尽可能保留模型的架构。同时通过提示的方式来引导模型完成下游任务。

#### Prompt 工程

近些年来prompt的形式可以总结为两种 - 离散型 与 连续型：

个人理解的离散型有几个关键词：需要更多**人工**，**可解码**（大部分离散型的prompt都会对应一些单词）它可以分为 cloze prompts 完形填空 和 prefix prompts 续写两种形式。（具体案例可以参考后续 PET 的介绍。）

除了人工生成prompt，还有其他几种自动生成prompt的方式。包括从大语料库中检索包含输入与输出的高频率语句；根据现有的prompt进行修改，生成更多prompt，单词替换等。

既然prompt生成的是一个句子，那么我们也可以通过改变这个句子的复杂度来控制模型的学习。对于语言，我们可以用不同方式表达一句话，对一句话进行拓展，将多句话拼接，将一句话分解成多句话。对于prompt，我们也可以定义

+ **ensembling** 聚合 - 通过加权来更多的去学习优秀的prompt
+ **augmentation** - 对prompt进行筛选或者排序
+ **decomposition** - 将一个复杂的prompt分解成多个简单的， 反之为 **composition**。

## Pet - Prompt 开山

> 论文：Exploiting Cloze Questions for Few Shot Text Classification and Natural Language Inference
>
> 相关网文： [ZHOU-JC - Pattern Exploiting Training（PET）范式](https://zhuanlan.zhihu.com/p/375934846)

由 PET这个模型来开启 Prompt 之旅再合适不过了。

PET 的主要思想为：我们在小数据集上构造额外的完型填空任务，试图让预训练模型通过这些任务来提高对小数据集的学习效率。

<img src="/img/prompt/image-20210925105112636.png" alt="image-20210925105112636" style="zoom:33%;" />

整体流程如上图：

+ 根据(1)，首先构造出完型填空任务"Best pizza ever! It was __"，每个空格有他独特的答案（参考下文）。将PLM在构造好的数据集上训练，训练中模型将：一、预测挖空部分单词（属于分类任务），二、完成一个MLM任务（类似bert预训练，需要对其他单词进行额外mask）。于是损失函数为: 

$$
L=(1-\alpha) \cdot L_{\mathrm{CE}}+\alpha \cdot L_{\mathrm{MLM}}
$$

+ 根据 (2)，由于数据量小，哪种prompt形式好不得而知，因此PET针对不同prompt训练多个模型；分别对这些模型将他们在小数据集上进行下游任务的finetune。而后通过ensemble加权投票的方式对未标注数据进行soft-label；
+ 根据(3)，我们使用PLM+classification head 对(2)中的soft-label进行finetune。这两步有点类似知识蒸馏。

PET作者认为，这样做的话各种prompt训练出来的模型之间无法互相学习。因此设计了iPET：

+ 与PET相同的，我们针对不同的prompt训练不同模型。而后随机选择几个模型进行soft-label，由此获得几份数据集。
+ 类似PET的(3)，通过这几份数据集分别训练出新的模型。
+ 迭代以上两个步骤多次后，将所有数据集整合并训练出最终的模型。

<img src="/img/prompt/image-20210925161247566.png" alt="image-20210925161247566" style="zoom: 33%;" />

（图：PET(1,2,3)与IPET(a,b,c)算法大致流程）

#### Prompt 设计

PET通过完形填空方式构造prompt，对于不同的数据集，prompt的模版也不同。比如，对于原输入语句 a, b：

+ 对 Yelp reviews数据集可以采用：

<img src="/img/prompt/image-20210925104758875.png" alt="image-20210925104758875" style="zoom:33%;" />

其中填空的答案将从 

<img src="/img/prompt/image-20210925104850426.png" alt="image-20210925104850426" style="zoom:33%;" />

五个类别里面选

#### 实验结果

不出所料的，经过更多训练的PET效果明显由于普通的监督学习，毕竟我们可是花了人力构造了额外的数据的。因此有不少网友认为 这样的对比不公平，不能说明prompt这个方法有效果（要是把同样的人工构造prompt时间拿去标注更多的数据，说不定也能达到同样的效果）。

![image-20210926215557023](/img/prompt/image-20210926215557023.png)

个人看完PET也是这种观点，PET的prompt为离散型prompt，需要额外的人工数据处理，并不能完全体现prompt的优点。

## Prefix-Tuning

> 论文：Prefix-tuning- Optimizing continuous prompts for generation
>
> 官方代码：https://github.com/XiangLi1999/PrefixTuning
>
> 不同与PET， Prefix-Tuning 使用了参数化的 prompt来引导模型解决不同的下游任务。这种参数化的prompt也被称为 continous prompt。不同于PET 的离散型 Discrete Prompt，连续型 prompt 由非字符的参数组成。

<img src="/img/prompt/image-20210925223050338.png" alt="image-20210925223050338" style="zoom:50%;" />

#### Prefix-tuning的直觉

对于原先的GPT2模型，我们在不同任务上finetune的时候经常需要对所有的参数进行微调，然后保存不同模型的权重。因此，如上图，论文作者提出在模型前加入可学习的prefix参数来引导整个模型的注意力机制，在区分不同下游任务的同时提高模型的学习能力，尽可能多得保留原预训练模型的知识。

![image-20210925223213369](/img/prompt/image-20210925223213369.png)

（图：添加prefix实例）

参考以上例图，原输入序列 $$[X_{idx},Y_{idx}]$$ 添加prefix id后变成了 $$[P_{idx},X_{idx},Y_{idx}]$$ 。在传统的GPT2中计算隐状态的方式为：
$$
h_i = LM_{\phi}(z_i,h_{<i})
$$
不同于LM模型，prefix部分隐状态的计算方式为取索引，因此对于添加prefix之后的模型，隐状态计算方式为：
$$
h_{i}=\left\{\begin{array}{ll}
P_{\theta}[i,:], & \text { if } i \in \mathrm{P}_{\mathrm{idx}} \\
\mathrm{LM}_{\phi}\left(z_{i}, h_{<i}\right), & \text { otherwise }
\end{array}\right.
$$
其中 $$i$$ 为对应prefix的index。

作者发现若直接对prefix参数进行更新会出现学习不稳定，模型表现变差等问题。于是添加了一个临时的MLP层与更小的临时参数矩阵来计算prefix参数，即：
$$
P_{\theta}[i,:]=\operatorname{MLP}_{\theta}\left(P_{\theta}^{\prime}[i,:]\right)
$$
当训练完成后，只保留 $$P_\theta$$ 。同时在训练过程中**其他模型参数将会被冻结**。

从作者的实验结果看出，prefix-tuning在数据量小的时候，能够用更少的参数实现更好的效果。

![image-20210926221531444](/img/prompt/image-20210926221531444.png)

## P-Tuning

> 论文：P-tuning-GPT Understands, Too
>
> 相关网文：[P-tuning：自动构建模版，释放语言模型潜能](https://zhuanlan.zhihu.com/p/364141928)

![image-20210926165212251](/img/prompt/image-20210926165212251.png)

（图：P-tuning与Discrete Prompt差别）

P-Tuning 采用的也是参数化的Prompt，先来看他与Discrete Prompt的区别：

假设原输入为：$$T=\left\{\left[\mathrm{P}_{0: i}\right], \mathbf{x},\left[\mathrm{P}_{i+1: m}\right], \mathbf{y}\right\}$$ 。Discrete Prompt使用PLM的embedding层 $$e(.)$$ 将原输入编码成 $$\left\{\mathbf{e}\left(\left[\mathrm{P}_{0: i}\right]\right), \mathbf{e}(\mathbf{x}), \mathbf{e}\left(\left[\mathrm{P}_{i+1: m}\right]\right), \mathbf{e}(\mathbf{y})\right\}$$， 此处的每个P对应一个token，如（a）所示；而P-Tuning则使用可学习的参数替代，将原输入编码为 $$\left\{h_{0}, \ldots, h_{i}, \mathbf{e}(\mathbf{x}), h_{i+1}, \ldots, h_{m}, \mathbf{e}(\mathbf{y})\right\}$$ ，**此处P为pseudo token，并没有实际指向的token。**(prompt重要的是放在哪，和能不能引导模型解决任务，而非表现形式。)

#### P-tuning 的设计

为了使得prompt的编码之间存在相关性，并解决embedding 分布离散 （Discreteness）的问题（PLM中的embedding高度离散导致使用SGD会很容易陷入局部最优），作者使用BiLSTM计算prompt的hidden state。

根据[网友的咨询与解析](https://zhuanlan.zhihu.com/p/364141928) 论文作者认为此处一种更自然的做法对下游任务目标与其他任务（如LM或者MLM）一起优化，类似PET的优化方案。

此外作者还发现加入一下小标志符号有助于NLU，如“[PRE]\[prompt tokens][HYP]?[prompt tokens]\[MASK]”中的问号。

作者对比了以下四种训练方式：（MP代表Manual Prompt）

![image-20210926171640874](/img/prompt/image-20210926171640874.png)

<img src="/img/prompt/image-20210926171006482.png" alt="image-20210926171006482" style="zoom:50%;" />

结果是GPT2在大部分数据集上优胜。

几个关注点：

+ 当标注数据较少的时候，我们只学习新添加模版的权重，冻结原PLM的权重；当标注数据充足时，对所有权重进行微调（有点类似经典的bert微调，但是这种形式效果更好点。）
+ 在标注数据比较少的时候，人工来选定适当的目标token效果往往更好些；在标注数据很充足的情况下，目标token用[unused*]效果更好些，因为这时候模型的优化空间更大一些。



## 参考

[PromptPapers](https://github.com/thunlp/PromptPapers)

[rumor - Prompt范式第二阶段：参数化](https://zhuanlan.zhihu.com/p/400790006)

[刘腾飞 - 近代自然语言处理技术发展的“第四范式”](https://zhuanlan.zhihu.com/p/395115779)

[ZHOU-JC - Pattern Exploiting Training（PET）范式](https://zhuanlan.zhihu.com/p/375934846)

[P-tuning：自动构建模版，释放语言模型潜能](https://zhuanlan.zhihu.com/p/364141928)

## 论文

1. Pre-train, Prompt, and Predict: A Systematic Survey of Prompting Methods in Natural Language Processing
2. Exploiting Cloze Questions for Few Shot Text Classification and Natural Language Inference
3. Prefix-tuning- Optimizing continuous prompts for generation
4. P-tuning-GPT Understands, Too

