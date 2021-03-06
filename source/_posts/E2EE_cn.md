---
title: WhatsApp E2EE|端到端加密 [中文篇]
date: 2020-11-10
author: Kevin 吴嘉文
subtitle: ''
description: ''
keywords: 
language: cn
timezone: ''
categories:
- Notes|理论梳理
tags:
- Cybersecurity|网络安全
mathjax: true
toc: true
comments: 基础加密算法分析
---

# E2EE

> WhatsApp的端到端加密为用户传输消息提供了一种安全传输信息的方法。 通过基于ECDH实现的协议，再whasApp中Alice和Bob可以生成一个共享的密钥以加密他们彼此发送的消息。 本文介绍了WhatsApp端到端加密的工作方式。也对ECDH 和 DH 进行了简单的介绍。
>
> 因WhatsApp加密大部分材料为英文，特作此中文篇，希望能够给英文不够自信的朋友提供一点信息。
>

<!--more-->



## Diffie-Hellman 

![DH](/img/E2EE_cn/DH.jpg)

*(图片来源: blog.csdn.net/sudochen)*

首先让我们定义一个运算:

$$f(m,x) = m^x \mod d$$ 

这是一个简单的幂取模运算，它具有交换律与结合律，如下：

$$f(f(m,x),y) = m^{x^y} = m^{y^x} = f(f(m,y),x)$$ 

假设Alice和Bob共享了公共的消息：质数：17，生成器：3


在生成共享密钥之前，Alice和Bob拥有自己的私钥，该私钥是随机生成的。假设Alice的私钥 $$ A= 15 $$，Bob的私钥 $$ B= 13 $$
之后，他们执行以下步骤


  + Alice生成了她的公钥$$ A'= f（3，A）= 3 ^ {15} \ mod 17 = 6 $$，并将其发送给Bob 

  +  Bob生成了他的公钥$$ B'= f（3，B）= 3 ^ {13} \ mod 17 = 12 $$，并将其发送给Alice

  + Alice通过$$ 12 ^ {15} \ mod 17 = 10 $$来获取秘密，即10。

  + Bob去通过$$ 6 ^ {13} \ mod17 = 10 $$来获得秘密。

  + Alice和Bob可以共享一个相同的秘密，即$$ 12 ^ {15} \ mod 17 = 10 = 6 ^ {13} \ mod17 $$ 

所以我们可以总结，存在某些运算，满足以下特性：

+ 这个运算是单向的。比如在上诉情况下，$$ m ^ x \ mod d = 3 ^ {15} \ mod 17 = 6 $$，如果我们知道m，x和d，我们将很容易获得结果，即公钥。但是，如果我们知道公钥，还有m和d。我们很难得出x。因此，Alice的私钥是安全的。
+ 这个运算存在结合律与交换律，使得双方可以通过公钥协商机制来协商出一个相同的，安全的密钥



## 椭圆曲线 ECC

目前我国`居民二代身份证`正在使用 256 位的椭圆曲线密码，虚拟货币`比特币`也选择ECC作为加密算法。

于RSA不同的是，ECC的陷门是椭圆曲线离散对数问题，而RSA是基于大数的质因数分解。对于相同大小的密钥空间，ECC可以打到更高的安全性。



![servlet](/img/E2EE_cn/servlet-1605585881601.jpg)

*（图片：椭圆曲线长这样）*



因篇幅太长，我另外做了ECC专属博客。想深入了解ECC的朋友移步至[我的ECC博客](http://wujiawen.xyz/2020/11/24/ECC/)



## ECDH 

ECC是建立在基于椭圆曲线的离散对数问题上的密码体制，给定椭圆曲线上的一个点P，一个整数k，求解Q=kP很容易；给定一个点P、Q，知道Q=kP，求整数k确是一个难题。ECDH即建立在此数学难题之上。



+ ### ECDH 流程简介

  假设密钥交换双方为Alice、Bob，其有共享曲线参数:

  + 椭圆曲线 $y^2 = x^3 -4x + 4$

  + 共享素数 $13$，即域的阶

  + 基点 $(1,1)$

  + 基点的阶 $7$

  + 余因子 $$h = \#E(F_q)/n $$

    
  
  1) Alice生成随机整数$$a = 3$$，计算$$A=3G=(0,2)$$。 
  
  2) Bob生成随机整数 $$b=4$$，计算 $$B=4G = (0,11)$$, 即生产Bob公钥
  
  3) Alice将 $$A$$ 传递给Bob。传递可以公开。
  
  4) Bob将 $$B$$ 传递给Alice。
  
  5) Bob收到Alice传递的A，计算共同秘密 $$Q =b*A = 4*(0,2) = (8,4)$$ 
  
  6) Alice收到Bob传递的B，计算 $$Q=a*B = 3*(0,11) = (8,4)$$  
  
  Alice、Bob双方即得 $$Q=b*A=b*(a*G)=(b*a)*G=(a*b)*G=a*(b*G)=a*B=Q'$$即双方得到一致的密钥 $$Q$$。 

## Curve25519

Curve25519是一种可供ECDH使用的椭圆曲线，可用作提供256位元的安全金钥。它是不被任何已知专利覆盖的最快ECC曲线之一。

+ 曲线= $$y^2 = x^3 + 486662x^2 + x$$，

+ 素数 = $$2^{255} − 19$$ 

+ 基点 $$x = 9$$

+ 基点的阶数是 $$(2^{252}+27742317777372353535851937790883648493) $$ 





## WhatsApp端到端加密协议 

![timg](/img/E2EE_cn/timg.jpg)

*（图片来源：百度图片搜索，whatsApp E2EE）*



### 软件安装 

安装软件时候,下面三种密钥对会被自动生成

+ **Identity Key Pair** – 身份密钥对, 主要用于生成等下要讲的master secret (共享密钥)
  + 它是**Curve25519** 密钥对 $$(Alice_s, curve25519(Alice_s,basepoint))$$ 
+ **Signed Pre Key** – 也是Curve25519, 他与身份密钥对用法大致相同
+ **One-Time Pre Keys** – 一些一次性使用的 **Curve25519** 密钥对.



### 用户注册阶段

应用会发送 **public Identity Key 身份密钥对**, **public Signed Pre Key (with its signature)签名密钥对**,还有一系列 **public One-Time Pre Keys一次性密钥对** 到服务器.

Whatsapp服务器会把这3中公钥和顾客的ID储存在一起



### 创建并配置新对话 

对话创建者生成一个暂时的 Curve25519 密钥对, 记为 $$(E_{initiator},E’_{initiator})$$, 为方便阐述, 所有的公钥我都会加右上标 $$K^{'}$$. 

根据以上对ECDH的讨论我们知道他有我们小学就学过的交换律和结合律,真是神奇呢:
$$
\text {Define }ECDH(X,Y)\text{ as operation } X * Y\\
K * G = K'\\
A*B' = A*(B*G) = (A*G)*B = A' * B
$$

然后利用这种特性, 协商出相同的master secret
$$
master\_secret = ECDH(I_{initiator}, S'_{recipient})\\ || ECDH(E_{initiator}, I'_{recipient})\\ || ECDH(E_{initiator}, S'_{recipient})\\ || ECDH(E_{initiator}, O'_{recipient})\\
\\ = master\_secret = ECDH(I'_{initiator}, S_{recipient})\\ || ECDH(E'_{initiator}, I_{recipient})\\ || ECDH(E'_{initiator}, S_{recipient})\\ || ECDH(E'_{initiator}, O_{recipient}).
$$

当邮件发送给收件人时，$$ E'_{initiator} $$ 将一起发送。对于创建的每个通信会话，将生成随机的不同Curve25519密钥对。




总结一下：

Bob私下使用Alice的每个公钥执行ECDH操作。 （记住初始化时，Alice有3种公钥，这些公钥都是Curve25519类型的

一旦Alice和Bob拥有彼此的公用密钥，他们将始s终获得相同的共享密钥,即master secret。



### 初始化信息传递通道

第一次有人发送消息时，收件人会收到一条包含会话设置信息的消息.



以下步骤在该阶段被执行：

+ 接收者使用其自己的私钥和传入消息的标头中公告的公钥来计算相应的master_secret。 **Alice可以根据ECDH的属性，生成与Bob发起者相同的共享master_secret **
+ 收件人删除发起方使用的一次性密钥。
+ 发起方使用 **HKDF **从master_secret导出相应的**Root Key **和**Chain Keys **。



### 信息交换加密 

#### 计算 Chain key - (32-byte)

**每次发送消息**，发送者都会临时生成一个Curve25519公钥。收件方收到信息后，**计算新的“Chain key”和“root key” **为：

$$Ephemeral\_secret =
ECDH(E_{sender}, E'_{recipient})$$ 

$$Chain Key, Root Key =
HKDF(Root Key, ephemeral\_secret)$$



#### 计算Message key 


Message Key为80字节，其中AES-256密钥为32字节，HMAC-SHA256密钥为32字节，IV为16字节。

$$Message Key = HMAC-SHA256(Chain Key, 0x01)$$

Chain Key 计算如下

$$Chain Key =
HMAC-SHA256(Chain Key, 0x02)$$


因此消息密钥每次都会更改，并且他们总是共享相同的Message Key

 **存储Message Key不能用于推导出Chain Key的当前或过去值。**



#### 加密信息

在**CBC **模式下使用**AES-256 **加密信息,并用 **HMAC-SHA256 **进行信息认证

文章没有提到信息来源验证的方法,但我猜系统发送了下面这个信息对:

$$(C,S),\ where\ (C,S) = (E(HMAC(M,k_2)||M,k_1),HMAC(M,k_2))$$ 



### 附件加密

Alice想将文件发送给Bob：

  + Alice生成一个临时的32字节AES-256密钥和一个临时的32字节的HMAC-SHA256密钥
    
  + Alice在CBC模式下使用随机IV用AES-256加密文件，然后使用HMAC-SHA256附加密文MAC

+ Alice向Bob发送一条正常消息，该临时密钥将一起发送给Bob。

+ Bob下载文件，验证SHA256哈希，验证MAC，然后解密文件

  


### 团队信息加密


WhatsApp组成员第一次向组发送消息：

+ 发件人生成一个随机的32字节链密钥

+ 发送者生成一个随机的Curve25519签名密钥密钥对。

+ 发送者将32字节的Chain Key和Signature Key中的公钥组合为Sender Key消息。

+ 发件人“分别”对每个发件人密钥进行加密组成员，使用先前说明的消息传递协议。

对于所有后续发送给该组的消息：

+ 发送者从“Chain Key”计算消息密钥，并更新“Chain Key”。

+ 发送方在CBC模式下使用AES-256加密消息。

+ 发件人使用Signature Key对密文进行签名。

+ 发送方将单个密文消息发送到服务器，该服务器将向所有组参与者进行服务器端扇出


