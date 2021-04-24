---
title: 基于Arduino MKR 1010 WIFI|IoT药盒
date: 2021-04-26
author: Kevin 吴嘉文
categories:
- Project|项目
tags:
- IoT
mathjax: true
toc: true
comments: 
---

## IoT智能药盒

> 历时一周，一个很马虎的基于 Arduino MKR 1010 WIFI的项目，主要针对忙碌的上班组。药盒可以在他们忘记吃药的时候发送消息提示，同时他们的用药情况也将会被告知他们的家人/监护人。
>
> 文章为产品功能介绍，技术实现与环境搭载经验分享。服务器搭建的步骤建议在 虚拟机上尝试。
>
> 本文中代码均为截取，具体源码请移步 [我的 github](https://github.com/kevinng77/iot_pill_box)

<!--more-->

## 产品功能

药盒初始化

+ 用户链接药盒的WIFI pill_box_setting，通过浏览器登录 IP 地址： 192.168.4.1 进行配置。

<img src="/img/iot_pre操作汇总/c05740d9d7f86a18b706357469e9cef.png" alt="c05740d9d7f86a18b706357469e9cef" style="zoom:50%;" />

+ 用户设置 username，家庭网络的WIFI SSID 和 KEY 并提交。药盒实现联网。
+ 第一次使用产品时，用户需要登陆官网 http://ngkaman.nat300.top/ 进行注册，填写药盒的username，密码，监护人邮箱，个人邮箱，三次用药的提示时间，以及晚上填充药时间。

![image-20210419224627230](/img/iot_pre操作汇总/image-20210419224627230.png)

*（图：产品官网截图）*

+ 系统自动初始化用药时间为8点，12点，18点，用户可以在产品官网登陆账号进行用药时间的重置。
+ 用可以通过官网修改邮箱的联系方式

用户使用产品期间：

+ 用药提醒：

  + 用药时间点，药盒进行第一次判断，若对应的药槽还有残留药物，则药盒判定为用户没有用药，用户将会接收到用药提醒邮件。

    <img src="/img/iot_pre操作汇总/image-20210423125225426.png" alt="image-20210423125225426" style="zoom:67%;" />

    *（图：未吃药邮件通知）*

  + 若第一次判断用户没有吃药，药盒会再10分钟后进行第二次判断，若对应的药槽还有残留药物，则该用药用户将会接收到用药第二次提醒邮件。

  + 若第二次判断用户没有吃药，药盒会再10分钟后进行第三次判断，若对应的药槽还有残留药物，则**患者监护人**将会接收到用药提醒邮件。后续药盒将不再通知患者进行用药。

+ 每晚填药提醒：夜晚填药时间，若存在药槽未填充药物，用户联系人将会收到填药提醒。

+ 每月用户会收到文字版月度用药记录

## 信息传输细节

所有的消息都是通过MQTT协议进行发布与订阅，本项目中对传输的消息并没有加密，容易造成他人的恶意数据改造。

![image-20210424181229871](/img/iot_pre操作汇总/image-20210424181229871.png)

## 设计与考虑

监护人/亲属必须使用网络获取用药者用药记录，因此IoT是产品实现的必须选择。

**为什么不用手机APP？**

通过 Androd APP 编写MQTT实现消息的接收同样可以实现绝大部分的产品功能，而且相对的通过手机APP可以更好的控制各种消息的接法，无需考虑由于使用邮件传输或者Whatsapp等其他主流通讯传输手段的成本，设计开发起来也更加容易，然而Androd APP存在部分考虑：

1. 后台运行或消息发送被屏蔽。相对于通过专属APP进行消息推送，用户更经常检查 whatsapp 推送的消息，因此避免了因手机系统屏蔽问题而产生的消息遗漏。
2. 安装软件会是用户考虑使用该产品的因素，用户需要时间去熟悉app界面与操作，接受APP的隐私协议，这些都是用户流失的潜在隐患，对于本产品而言，并没有太多使用app的必要。
3. 项目开始使用的是Whatsapp通知，Whatsapp的成本会比Androd App高，起初的尝试是使用Selenium控制google drive进行消息推送。如果需要使用稳定的whatsapp推送，需要申请使用Whatsapp Business，申请的成本或许会比写一个APP要高很多。但是由于网页的源代码的变化Selenium控制的 Whatsapp 并不稳定，所以最后使用SMTP邮箱通知代替。如果可以使用Whatsapp Business API，那么效果肯定是最好的。

**Arduino MRK 1010的替代品**：

理论上ESP8266或者ESP32实现的WIFI 设备都可以实现这些功能。

**为什么使用IR sensor（红外避障传感器）对药物进行检测？**

不同于大多数的智能药盒，通过药盒槽门的开关来判断用户是否吃药，使用IR 传感器对药物直接进行判断可以避免了用户开了盒子却又忘了吃药的情况。IR 传感器的成本相对较低，对近距离的物体检测较为准确。为了避免误报，部分药盒面也被设计处理成反射红外量少的黑色。

<img src="/img/iot_pre操作汇总/a076f85fd0c7dfcf28250040a995b8d.jpg" alt="a076f85fd0c7dfcf28250040a995b8d" style="zoom:67%;" />*（药盒半成品，为了演示并没有放上盖子）*	

传感器部分使用了 IR sensor（红外避障传感器）对药物进行简单的检测。然而传感器的准确度也影响了药盒的准确度。为了减小因为传感器的失误而发送的 fakenews，程序只有再进入了用户设定的用药时间段才会进行药物检测。

# 环境配置

服务器系统为 Ubuntu 20.04

### 配置MQTT 

MQTT由IBM公司开发的，90年代的产物，IBM为了解决是由公司管道检测问题，当时卫星数量不够，卫星通信比基站通信费用更高，管道几百公里，每隔几百米就会安插采集点。

解决问题：
1、服务器必须要实现成千上万客户端的接入
2、单次数据数据量小，但不能出错 
3、必须能够适应高延迟、偶尔断网等通信不可靠的风险
4、根据数据的重要程度和特性，设置不同等级的服务质量(session)

以下使用 mosquitto，用其他的也行。

### mosquitto在ubuntu20.04环境安装：

[mosquitto 官网](https://mosquitto.org/)

先尝试是否可以直接动过 `apt-get install`安装

```shell
sudo apt-add-repository ppa:mosquitto-dev/mosquitto-ppa
sudo apt-get update
sudo apt-get install mosquitto -y
sudo apt-get install mosquitto-clients
```

若遇到`apt-add command not found`

```shell
sudo apt-get install python-software-properties
sudo apt-get update
sudo apt install software-properties-common 
sudo apt-get update
```

**开放防火墙1883/tcp**

检查防火墙情况 `sudo ufw status`

```shell
sudo ufw enable
sudo ufw allow 80
sudo ufw allow 1883
# 或使用sudo ufw allow 1883/tcp
ufw reload
```

```shell
sudo iptables -I INPUT -p tcp --dport 1883 -j ACCEPT
sudo iptables-save
sudo apt-get install iptables-persistent
sudo netfilter-persistent save
sudo netfilter-persistent reload
```

然后把`/etc/mosquitto/mosquitto.conf`中注释掉下面这两行

```shell
# persistence_location /var/lib/mosquitto/
# log_dest file /var/log/mosquitto/mosquitto.log
```

<img src="/img/iot_pre操作汇总/image-20210414170432612.png" alt="image-20210414170432612" style="zoom:67%;" />

配置工作到这里就完成了

### mosquitto基本操作：

**启动服务器， 指定配置文件位置** 

```shell
mosquitto -c /etc/mosquitto/mosquitto.conf -p 1883 -d
```

在本机中测试更多参数选择操作:

```shell
mosquitto_sub -d -v -t temp -h 192.168.235.130 -p 1883 -q 2 //-h指定主机 -p指定端口 -q 指定通讯质量
mosquitto_pub -d -t temp -h 192.168.235.130 -p 1883 -m hello -q 2 //对于public也一样可以指定主机和端口
```

完成本机测试后，在一个终端下订阅是可以接收到另一个终端发布的内容的，要实现不同ip间的通讯，需要设置非匿名登录。Mosquitto最新版本默认不允许匿名外网访问。

### mosquitto非匿名登录配置：

修改配置 `/etc/mosquitto/mosquitto.conf`

添加：

`allow_anonymous false`

`password_file /etc/mosquitto/passwd.conf`

`listener 1883`

**服务端创建用户** 

+ 隐藏密码创建

`sudo mosquitto_passwd -c
/etc/mosquitto/passwd.conf username` 

+ 明文创建

`sudo mosquitto_passwd -b /etc/mosquitto/passwd.conf username pwd`  

**配置好后测试一下，先启动服务器**

`mosquitto -c /etc/mosquitto/mosquitto.conf`

在计算机A上订阅：`mosquitto_sub -t "temp" -u username -P 111111` 

在计算机B上发布：`mosquitto_pub -t "temp" -m "hello" -u username -P 111111`

A 收到消息表示成功

以上的方式中，传输的信息是明文，并不安全，真实使用中应该在进行TLS加密，具体请查看[我的博客], 若无法通过apt-get 安装，那么就需要手动移植。

### API

[MQTT C API](https://mosquitto.org/api/files/mosquitto-h.html)

注意编译时使用：

```shell
gcc mosquito.c -o mosquito -lmosquitto
```

**Python API**

```shell
sudo apt update
sudo apt full-upgrade -y
sudo apt install python3.9 python3.9-venv
```

使用搭建安全的虚拟环境:

```shell
mkdir ~/apps
cd ~/apps
rm -rf ~/apps/env

python3.9 -m venv ~/apps/env
. ~/apps/env/bin/activate
pip3.9 install wheel
pip3.9 install pyserial paho-mqtt requests dweepy
```

安装好之后就可以用了，本次项目的主要 mqtt 通信也是通过python API完成 [案例链接](https://github.com/kevinng77/iot_pill_box/tree/main/mqtt_py)，使用python主要因为本人对于python更了解，C与python的孰优孰劣并不晓得。python API还是很方便的查看 paho-mqtt 的 documentation了解到更多的操作。

## 配置 natapp 内网穿透

[natapp网站](https://natapp.cn/tunnel/buy/free)

具体的配置过程[这篇博客](https://blog.csdn.net/hyh17808770899/article/details/108936090)有了详细的介绍，因为免费的natapp只提供一个端口的内网穿透，因此本项目中申请了两个隧道，分别对应1883/tcp与80，获得两个authtoken后配置sh文件分别执行两次natapp就行了

实现后台运行可以运行命令`nohup ./natapp -authtoken=xxxx -log=stdout &`实现，但是这样的话我们就无法看到运行后随机域名是多少，所以需要进行如下配置：

编写脚本natapp.sh

```shell
vi natapp.sh
```

添加下面的语句，然后保存退出

```shell
#!/bin/bash
rm /home/kevin/Desktop/iot/natapp/nohup.out
touch nohup.out
service mosquitto stop
mosquitto -c /etc/mosquitto/mosquitto.conf -d
/home/kevin/share/myboa/boa/boa
cd /home/kevin/Desktop/iot/natapp
nohup /usr/local/natapp/natapp &
nohup /usr/local/natappweb/natapp &
```

对该脚本进行授权

```java
chmod 777 natapp.sh
```

在 `/usr/local/natapp/natapp` 和 `/usr/local/natappweb/natapp`目录下添加 config.ini 文件，当然你也可以使用 `natapp -authtoken=xxx`来执行natapp，在运行时传入配置参数，那么就不需要配置这边的文件。

```ini
#将本文件放置于natapp同级目录 程序将读取 [default] 段
#在命令行参数模式如 natapp -authtoken=xxx 等相同参数将会覆盖掉此配置
#命令行参数 -config= 可以指定任意config.ini文件
[default]
authtoken=77fa4653298558f9                      #对应一条隧道的authtoken
clienttoken=         #对应客户端的clienttoken,将会忽略authtoken,若无
请留空,
log=stdout             #log 日志文件,可指定本地文件, none=不做记录,stdout=直接屏幕输出 ,默认为none
loglevel=INFO                  #日志等级 DEBUG, INFO, WARNING, ERROR 默认为 DEBUG
http_proxy=                     #代理设置 如 http://10.123.10.10:3128 非代理上>网用户请务必留空
```

**如果多次执行natapp.sh 文件的话，请关掉多余的进程** `ps -ef|grep natapp`  `kill -9 2777`

配置完成antapp后，我们可以通过mosquitto订阅，其中 ip 地址设置如下：

`mosquitto_sub -t record -h server.natappfree.cc -u user22 -P 111111 -p 35444`

端口也需要指定到natapp的端口

为免费的内网穿透服务搞个 ip 与web名称抓取，抓取后就可以自动开启mqtt服务了。如果是付费用户就不用了：

```python
def run_main(ip,port):
    client = mqtt.Client()
    client.reinitialise()
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect(ip, port, 60)
    client.loop_forever()

def get_server_ip():
    with open('../natapp/nohup.out', 'r') as fp:
        a = fp.readlines()
        ip = "192.168.235.131" 
        port = "1883"
        web_add = ""
        for i in a:
            web = re.findall('http://.+\.natappfree\.cc', i)
            if web:
                web_add = web[0]
            ip_port = re.findall('tcp://.+\.natappfree\.cc:[\d]+', i)
            if ip_port:
                ip = ip_port[0][6:-6]
                port = ip_port[0][-5:]
    return ip, int(port), web_add

if __name__ == '__main__':
    ip,port,web_add = get_server_ip()
    print(f"ip:{ip},port:{port},web:{web_add}")
    run_main(ip, port)
```

## Whatsapp 控制

在许久的查阅后，通过服务器实现发送whatsapp通知的方法有两种，一是通过whatsapp Business API，使用需要有公司进行注册，好吧那只好为了我的小project去注册一个公司了doge.jpg。

另一种方式也是本项目中采用的，使用 selenium来控制浏览器实现消息发送。网上有人发布了一个python whatsapp-web 的库，但是并不实用，也是通过selenium来实现，然鹅whatsapp的xpath随着时间和地区改变，那个包自然也会出现很多bug。读者可以尝试一下，不行的话不必太执着，自己写效率也很高。[whatsapp-web 链接](https://pypi.org/project/whatsapp-web/)

本项目的Selenium driver使用了Chrome，首先需要安装Chrome，网上经验丰富这边不在阐述，可以参考这篇[Ubuntu16.04 安装chromedriver、chrome 及 运行selenium](https://long97.blog.csdn.net/article/details/103619926?utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control&dist_request_id=&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control)

安装后在 python 中导入

```python
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
```

建立链接

```python
driver = webdriver.Chrome('/usr/local/share/chromedriver')
driver.get("https://web.whatsapp.com/")
wait = WebDriverWait(driver, 5)
```

发送消息

```python
whatsapp_account = "+65 1234 1234"
message = f"nihao 666"
user_xpath = f'//span[@title="{whatsapp_account}"]'
group_title = wait.until(EC.presence_of_element_located((By.XPATH,user_xpath)))
group_title.click()
inp_xpath = '//div[@class="_2A8P4"]'
input_box = wait.until(EC.presence_of_element_located((By.XPATH, inp_xpath)))
input_box.send_keys(message + Keys.ENTER)
time.sleep(2)
```

其中`user_xpath` 与 `inp_xpath` 分别为用户名称和输入框的Xpath地址，建议使用Chrome Xpath helper 拓展插件查看。



## Web 服务器搭建

本项目使用的是BOA服务器，具体的搭建教程网上很丰富，这边不展开讨论。

### web设计

web主要为用户提供 注册账户，修改whatsapp，修改药盒提示时间功能。本次项目的HTML设计主要改动与 [Day 001 login form](https://codepen.io/khadkamhn/pen/ZGvPLo) 仅学习，非商用。源码也放在了 [我的github](https://github.com/kevinng77/iot_pill_box/tree/main/www) 上。

### 实现原理：

配置 `update.js`文件，通过CGI运行C程序。从表单中提取对应的信息，通过sqlite3 API与mosquitto API，将用户修改的时间发送到 主题 setting/+ 下。设备端订阅该主题，接收到后充值时间变量，从而实现通过网页端改变设备上的时间。




