---
title: Docker基础笔记
date: 2021-05-29
author: Kevin 吴嘉文
categories:
- Notes|理论梳理
tags:
- Linux
mathjax: true
toc: true
comments: 
---

# Docker

看越来越多人使用docker来进行服务的交付了，在深度学习环境的配置上有了docker也节省了很多时间。于是记了一些笔记，接下来通过在docker上搭建 NVIDIA 深度学习环境来熟悉吧！

docker相对与虚拟机，占用空间更小，启动更快。它米有自己的内核且不会对操作系统和硬件进行模拟。

安装卸载指南 https://www.docker.com/

<!--more-->

docker类似一个linux虚拟机，占有一个端口

## 常用命令

```shell
docker version   
docker info       #显示docker的系统信息，包括镜像和容器的数量
docker 命令 --help 
```

#### 镜像命令

```shell
docker images 
docker search 镜像名称
docker pull tomcat:8
#如果不写tag，默认就是latest
```

```shell
docker rmi -f 镜像id #删除指定的镜像
docker rmi -f $(docker images -aq) #删除全部的镜像
```

#### 容器命令

创建容器需要创建镜像

`sudo docker pull ubuntu`

新建容器并启动

```shell
docker run [可选参数] image | docker container run [可选参数] image

--name="Name"		容器名字 tomcat01 tomcat02 用来区分容器
-d					后台方式运行
-it 				使用交互方式运行，进入容器查看内容
-p					指定容器的端口 -p 8080(宿主机):8080(容器)
		-p ip:主机端口:容器端口
		-p 主机端口:容器端口(常用)
		-p 容器端口
		容器端口
-P(大写) 				随机指定端口


exit #容器直接退出
ctrl +P +Q #容器不停止退出
```

```shell
docker ps #列出当前正在运行的容器
  -a, --all             Show all containers (default shows just running)
  -n, --last int        Show n last created containers (includes all states) (default -1)
  -q, --quiet           Only display numeric IDs
```

删除容器

```shell
docker rm 容器id   #删除指定的容器，不能删除正在运行的容器，如果要强制删除 rm -rf
docker rm -f $(docker ps -aq)  #删除指定的容器
docker ps -a -q|xargs docker rm  #删除所有的容器
```

启动和停止容器

```shell
docker start 容器id	
docker restart 容器id	
docker stop 容器id	
docker kill 容器id	# 强制停止当前容器
```

#### 常用其他命令

后台运行容器的时候，如果容器没有前台进程，docker就会自动停止他

```shell
docker run -d centos
# 如果让容器运行一个while循环那么就可以发现它了
```

显示日志

```shell
docker logs -t --tail n 容器id #查看n行日志
docker logs -ft 容器id #查看并实时输出全部日志
```

容器状态查看

`docker top 容器id` 查看容器进程信息

`docker inspect 容器id` 查看镜像的元数据

`docker stats 容器id` 查看docker容器使用内存情况

进入当前正在运行的容器

```shell
docker exec -it 容器id /bin/bash
docker attach 容器id # 进入容器正在执行的进程
```

从容器内拷贝文件到主机

```shell
docker cp 容器id:容器内路径 主机目的路径
```

![img](https://raw.githubusercontent.com/chengcodex/cloudimg/master/img/image-20200514214313962.png)

```shell
  attach      #当前shell下 attach连接指定运行的镜像
  build       Build an image from a Dockerfile 
  commit      Create a new image from a containers changes 
  cp          Copy files/folders between a container and the local filesystem 
  create      Create a new container 
  diff        #查看docker容器的变化
  events      Get real time events from the server 
  exec        Run a command in a running container 
  export      #导出容器文件系统作为一个tar归档文件[对应import]
  history     Show the history of an image 
  images      List images 
  import      # 从tar包中导入内容创建一个文件系统镜像
  info        Display system-wide information 
  inspect     Return low-level information on Docker objects 
  kill        Kill one or more running containers 
  load        Load an image from a tar archive or STDIN 
  login       Log in to a Docker registry 
  logout      Log out from a Docker registry
  logs        Fetch the logs of a container
  pause       Pause all processes within one or more containers
  port        List port mappings or a specific mapping for the container
  ps          List containers
  pull        Pull an image or a repository from a registry
  push        Push an image or a repository to a registry
  rename      Rename a container
  restart     Restart one or more containers
  rm          Remove one or more containers
  rmi         Remove one or more images
  run         Run a command in a new container
  save        Save one or more images to a tar archive (streamed to STDOUT by default)
  search      Search the Docker Hub for images
  start       Start one or more stopped containers
  stats       Display a live stream of container(s) resource usage statistics
  stop        Stop one or more running containers
  tag         Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
  top         Display the running processes of a container
  unpause     Unpause all processes within one or more containers
  update      Update configuration of one or more containers
  version     Show the Docker version information
  wait        Block until one or more containers stop, then print their exit codes
```

### 容器开启时的配置

先参考一个深度学习容器开启的命令

`docker run -i -d -v /export/username/:/export/username/ --name=tf_img_cls --net=host --runtime=nvidia -e NVIDIA_VISIBLE_DEVICE=0 ai-image.jdcloud.com`

不同镜像开启需要的配置不同，一般通过 -e 传递。

`-p` 建立容器与宿主机的端口映射，可以同时配置多个端口。如下，我们在宿主机上通过访问666端口来访问容器上部署的nginx。

```shell
# -p 配置容器的端口，可以同时配置多个端口
docker run -d --name nginx01 -p 666:80 nginx
curl localhost:666
```

`-e` 容器环境配置，不同容器环境配置不同。如下es的环境配置为内存限制。NVIDIA容器 -e 可以配置指定显卡。**具体的 -e 传参应该参考容器发布者提供的信息。**

```shell
docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e ES_JAVA_OPTS="-Xms64m -Xmx512m" elasticsearch:7.6.2
```

`-v` 挂载数据卷，具体参考[下方](# 容器数据卷)

`--net` 容器网络，具体参考[下方](# docker网络) 



portainer可视化面板可以玩玩

## 镜像讲解

镜像获得途径：

+ docker pull
+ 通过朋友给你的dockerfile构建

### 镜像加载原理

**UnionFs（联合文件系统）**：Union文件系统（UnionFs）是一种分层、轻量级并且高性能的文件系统，他支持对文件系统的修改作为一次提交来一层层的叠加，同时可以将不同目录挂载到同一个虚拟文件系统下（ unite several directories into a single virtual filesystem)。Union文件系统是 Docker镜像的基础。镜像可以通过分层来进行继承，基于基础镜像（没有父镜像），可以制作各种具体的应用镜像。

**docker的镜像** 实际上由一层一层的文件系统组成，这种层级的文件系统UnionFS。
boots(boot file system）主要包含 bootloader和 Kernel, bootloader主要是引导加 kernel, Linux刚启动时会加bootfs文件系统，在 Docker镜像的最底层是 boots。这一层与我们典型的Linux/Unix系统是一样的，包含boot加載器和内核。当boot加载完成之后整个内核就都在内存中了，此时内存的使用权已由 bootfs转交给内核，此时系统也会卸载bootfs。
rootfs（root file system),在 bootfs之上。包含的就是典型 Linux系统中的/dev,/proc,/bin,/etc等标准目录和文件。 rootfs就是各种不同的操作系统发行版，比如 Ubuntu, Centos等等。

Docker 镜像都是只读的，当容器启动（run）时，一个新的可写层加载到镜像的顶部！这一层就是我们通常说的容器层，容器之下的都叫镜像层！因此我们所做的操作都是基于容器层的。

#### commit镜像

docker commit 来保存当前容器的状态。下词可以直接通过加载对应的镜像来开启保存的容器

```shell
docker commit -m="描述信息" -a="作者" 容器id 目标镜像名:[TAG]
```

## 容器数据卷

docker将应用和环境打包成环境，但是并不用于保存数据。将数据存储与本地，也可以实现容器间的数据共享。

### 使用数据卷

将主机上的文件挂在到容器上，两个文件的内容会自动同步。在创建容器时候制定 -v ，后续开启容器就不需要 -v 操作了。

`docker run -it -v 主机目录：容器内目录`

#### Mysql案例

```shell
# 参考官网hub 
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag

docker run -d -p 3306:3306 -v /home/mysql/conf:/etc/mysql/conf.d -v /home/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name mysql01 mysql:5.7
```

### 挂载卷的不同方式

```shell
-v 容器内路径			 # 方式一：没有提供容器外路径
-v 卷名：容器内路径		   # 方式二：挂载时候提供了名称，没有提供路径
-v 宿主机路径：容器内路径   # 方式三
```

方式一：

```shell
docker run -d -P --name nginx01 -v /etc/nginx nginx

# 查看所有的volume的情况，可以查看到容器外路径为随即分配的16进制数
docker volume ls    
DRIVER              VOLUME NAME
local               33ae588fae6d34f511a769948f0d3d123c9d45c442ac7728cb85599c2657e50d
```

方式二：

```shell
docker run -d -P --name nginx02 -v juming-nginx:/etc/nginx nginx
docker volume ls                  
DRIVER              VOLUME NAME
local               juming-nginx

# 通过 -v 卷名：容器内路径
# 查看一下这个卷
docker volume inspect 卷名
```

大多数情况都使用方式二， 所有的docker容器内的卷，没有指定目录的情况下都是在 `/var/lib/docker/volumes/xxxx/_data `下

方式三：

```shell
docker run -d -P --name nginx03 -v /etc/nginx:/etc/nginx nginx
# 通过docker volume ls 查看不到卷信息
```

设置卷的读写权限

```shell
docker run -d -P --name nginx05 -v juming:/etc/nginx:ro nginx
# ro只能通过宿主机改变卷数据
docker run -d -P --name nginx05 -v juming:/etc/nginx:rw nginx
```

### 数据卷容器

容器二使用与容器一相同的数据卷

```shell
docker run -it --name docker02 --volumes-from docker-1 image_name
```

## 构建Dockerfile

Dockerfile是用来构建docker镜像的构建文件。

构建步骤：

1、 编写一个dockerfile文件

2、 docker build 构建称为一个镜像

3、 docker run运行镜像

4、 docker push发布镜像（DockerHub 、阿里云仓库)

### 编写 dockerfile

dockerfile 命令

> FROM				# 基础镜像，一切从这里开始构建
> MAINTAINER			# 镜像是谁写的， 姓名+邮箱
> RUN					# 镜像构建的时候需要运行的命令
> ADD					# 步骤，tomcat镜像，这个tomcat压缩包！添加内容 添加同目录
> WORKDIR				# 镜像的工作目录
> VOLUME				# 挂载的目录
> EXPOSE				# 保留端口配置
> CMD					# 指定这个容器启动的时候要运行的命令，只有最后一个会生效，可被替代。
> ENTRYPOINT			# 指定这个容器启动的时候要运行的命令，可以追加命令
> ONBUILD				# 当构建一个被继承 DockerFile 这个时候就会运行ONBUILD的指令，触发指令。
> COPY				# 类似ADD，将我们文件拷贝到镜像中
> ENV					# 构建的时候设置环境变量！

编写dockerfile示例

```shell
FROM centos
MAINTAINER myname<myemail>

ENV MYPATH /usr/local
WORKDIR $MYPATH

VOLUME ["volume01","volume02"]
# 生成镜像时候自动挂载的数据卷，匿名挂载
# 如果创建的时候没有挂载，那么后续需要手动挂载

RUN yum -y install vim
RUN yum -y install net-tools

EXPOSE 80

CMD echo $MYPATH
CMD echo "-----end----"
CMD /bin/bash
```

CMD 与 ENTRYPOINT 区别

```shell
# dockerfile
FROM centos
CMD ["ls","-a"]
```

### 构建镜像

```shell
# 如果传入了tag参数，那么打开时也需要使用tag参数
docker build -f dockerfile1 -t image_name:tag path

docker build -f dockerfile1 -t cmd-test:1.0 . 
```

构建成功后运行：

```shell
docker run cmd-test:1.0  # 输出 ls -a
docker run cmd-test:1.0 -l  # 报错 -l不是命令
docker run cmd-test:1.0 ls -l  # 原先的ls -a会被替换为 ls -l
```

以上为 `CMD` 指令的特点，相对的 `ENTRYPOINT` 就不会被覆盖

```shell
# dockerfile中编写以下内容
FROM centos
ENTRYPOINT ["ls","-a"]
```

建立后测试 `ENTRYPOINT` ：

```shell
docker build -f dockerfile1 -t ep-test:1.0 .

docker run ep-test:1.0  # 输出 ls -a
docker run ep-test:1.0 -l  # 输出ls -al
```

编写dockerfile案例二

```shell
FROM centos #
MAINTAINER name<mail@qq.com>
COPY README /usr/local/README #复制文件
ADD jdk-8u231-linux-x64.tar.gz /usr/local/ #复制后自动解压
ADD apache-tomcat-9.0.35.tar.gz /usr/local/ #复制解压
RUN yum -y install vim
ENV MYPATH /usr/local #设置环境变量
WORKDIR $MYPATH #设置工作目录
ENV JAVA_HOME /usr/local/jdk1.8.0_231 #设置环境变量
ENV CATALINA_HOME /usr/local/apache-tomcat-9.0.35 #设置环境变量
ENV PATH $PATH:$JAVA_HOME/bin:$CATALINA_HOME/lib #设置环境变量 分隔符是：
EXPOSE 8080 #设置暴露的端口
CMD /usr/local/apache-tomcat-9.0.35/bin/startup.sh && tail -F /usr/local/apache-tomcat-9.0.35/logs/catalina.out # 设置默认命令
```

### 发布自己的镜像

首先登陆

```
docker login -u kevinng77
```

制作镜像

```
docker build -t kevin/mytomcat:0.1
```

提交push镜像

```
docker push kevin/mytomcat:0.1
```

## docker网络

代补充

### docker 其他问题

jupyter notebook再使用的时候需要配置：

```python
jupyter notebook --generate-config

#docker中使用ipython生成密码
In [1]: from notebook.auth import passwd
In [2]: passwd()
Enter password:  # 这个密码再后来宿主机登陆时候需要
Verify password:   # 宿主机登陆localhost:8888
Out[2]: 'sha1:38a5ecdf288b:c82dace8d3c7a212ec0bd49bbb99c9af3bae076e'

#去配置文件.jupyter/jupyter_notebook_config.py中修改以下参数
c.NotebookApp.ip='*'                          #绑定所有地址
c.NotebookApp.password = u'刚才生成的密码'
c.NotebookApp.open_browser = False            #启动后是否在浏览器中自动打开
c.NotebookApp.port =8888  
```

## 其他参考

https://blog.csdn.net/xiaozecheng/article/details/106145593

https://bbs.huaweicloud.com/blogs/133713

[nvidia docker](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#docker)

[nvidia docker及训练环境配置文档](https://bluesmilery.github.io/blogs/252e6902/)

