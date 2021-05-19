---
title: 嵌入式学习之（五）|Linux 命令
date: 2020-07-03
author: Kevin 吴嘉文
keywords: 
language: cn
categories:
- Notes|理论梳理
tags:
- 计算机语言
- 嵌入式学习
mathjax: true
toc: true
comments: 

---

# Linux 命令笔记

> 嵌入式自学开始一个月啦~ 为了自己的贾维斯！！
>
> Linux 笔记比较少，入门级笔记。用多了就记住了。
>
> 笔记总结 课程链接：[千峰嵌入式教程](https://www.bilibili.com/video/BV1FA411v7YW?p=530&spm_id_from=pageDriver)

<!-- more-->

## 命令

+ ctrl + shift + "+"
+ user@主机名: + [ ~家目录；/根目录|] $ 普通用户权限，#管理员权限
+ 命令 选项 参数，之间用空格隔开
+ 一次tab补全，两次tab查看全部相关命令


```shell
命令 + --helpls
ls, more, man,cat
cat 
```

```shell
man 章节 查找命令，reshuffle文件信息
可以用man man查询man的信息
```

```shell
命令 > file 先清空，后输入
命令 >> file 追加
ls --help | more more(ls --help)
ls | wc -w
```

**ls**

```shell
ls / -a -l -al -hl
```

+ drwxr-xr-x 2 youtiaowenzi youtiaowenzi 4096 Sep 28 21:43 Downloads
+ d: 文件类型(bcd-lsp)
  + b：块设备 c：字符设备 d目录文件 -普通文件 l软连接文件 s套接字 p管道文件
+ rwxr-xr-x：文件权限，三个为一组
  + r w x -读，写，可执行，无权限
+ 2： 链接文件个数
+ 用户名 用户组名
+ 4096 文件大小（bytes）
+ 文件最后修改时间

+ tree (apt-get install tree) 
  
  + tree -L 3  只显示3层
+ **clear** 清屏 或 ctrl + L
+ **cd pwd**
  + cd / 根目录 直接cd 或 ~进入home
  + cd .. 上级目录 . 当前目录 - 返回上一次的路径
  + pwd 当前绝对路径

+ **cat** 显示文本文件内容
+ **rm -rf** 删除目录
+ **cp file_name dir** 复制 **cp dir1 dir2 -a** 复制dir1到dir2 ， **cp file file2** 复制file副本file2，覆盖原先file2
+ **mv file dir/** 移动文件  mv file1 file2 如果file2不存在，则为重命名
+ **mkdir/ touch**
  
  + mkdir -p dir1/dir2/dir3/dir4 创建嵌套文件
+ touch 会更新更新时间戳
+ **find path -name filename**
  
+ find . - name dir2
  
+ **grep** 查找信息 file 参数-n (-n 返回行号)
  
  + grep 信息 * -R -n 对所有文件*查询，-R对嵌套的文件进行查询
+ **ln** 创建链接文件
  
  + ln 源文件 链接文件名 -s 

## tar 

+ tar zcvf 压缩包.tar.gz file1 file2 file3 压缩
+ tar zxvf 压缩包.tar.gz 解压
+ tar zxvf 压缩包.tar.gz  -C 目的路径
+ tar jcvf name.tar.bz2
+ tar jxvf name.tar.bz2 -C 目的路径

## vi

+ vi +n filename 打开文件，光标置于n行行首
+ 命令模式或插入模式 进入 编辑模式 ESC
+ 搜索，命令模式下输入/加上要搜索内容
+ 编辑 进入 插入 按 a i o；进入命令模式按：
  + 命令w，wq,x 保存并推出, q! 不保存，w filename 另存为
  + 编辑模式
    + u 撤销
    + nx删除光标后n字符
    + nX删除光标前
    + ndd 剪切 p粘贴 4yy 复制当前开始的n行
    + shift + zz 保存并退出
    + nG移动光标到n行
    + /字符串 从光标开始向后查询
      + n 下一个 N 前一个

## 编译器 gcc

+ 一步到位
  + gcc hello.c  自动生成a.out 可执行文件
  + gcc hello.c -o hello 生成hello可执行文件
  + 运行： ./a.out
+ 分布
  + gcc -E hello.c -o hello.i 预处理 （头文件展开）
  + gcc -S hello.i -o hello.s 编译 
  + gcc -c hello.s -o hello.o 汇编
  + gcc hello.o -o filename 链接

## makefile

+ 只会重新编译修改过时间戳的文件


```shell
目标（最终生成文件）：依赖文件列表
<TAB>命令列表
makefile:
main:main.c main.h
	gcc main.c -o main
clean:
	rm main
```

make

```shell
[-f file] 默认找GNUmakefile，makefile, Makefile作为输入文件
[targets] 默认实现makefile 文件内第一个目标

一般使用直接make
make [-f file] [targets]
```

多文件编译

```shell
main:main.o sub.o sum.o
	gcc main.o sub.o sum.o -o main
main.o:main.c
	gcc -c main.c -o main.o
sub.o:sub.c
	gcc -c sub.c -o sub.o
sum.o:sum.c
	gcc -c sum.c -o sum.o
clean:
	rm *.o main a.out -rf
	
make
make clean
```

makefile 变量

```shell
cc = gcc
#cc = arm-linux-gcc 指定编译器
obj = main.o printf1.0
target=main
cflags=-Wall -g

$(target):$(obj)
	$(cc) $(obj) -o $(obj)  #用变量替换上一步的程序


```

系统环境变量

```shell
#export test=10 定义环境变量
```

预定义变量

```shell
$@ 目标名
$<	依赖文件中的第一个文件
$^ 	所有依赖文件
CC	C编译器名称
CFLAGS		C编译器选项


CC = gcc
obj = main
obj1 = sub
obj2 = sum
OBJ = main.o sub.o sum.o
CFLAGS = -Wall -g

$(obj):$(OBJ)
	$(CC) $^ -o $@
$(obj).o:$(obj).c
	$(CC) $(CFLAGS) -c $< -o $@
$(obj1).o:$(obj1).c
	$(CC) $(CFLAGS) -c $< -o $@
$(obj2).o:$(obj2).c
	$(CC) $(CFLAGS) -c $< -o $@
clean:
	rm *.o $(obj) a.out -rf
```

进阶版

```shell
CC = gcc
obj = main
OBJ = main.o sub.o sum.o
CFLAGS = -Wall -g

$(obj):$(OBJ)
	$(CC) $^ -o $@
$*.o:$*.c
	$(CC) $(CFLAGS) -c $< -o $@
clean:
	rm *.o $(obj) a.out -rf
```



