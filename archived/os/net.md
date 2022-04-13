OSI七层模型

TCP/IP四层模型

物理层  设备之间的比特流的传输
数据链路层  成帧
网路层  选路
传输层  传输前的错误检测，流量监控
会话层  会话管理同步
表示层  数据的表现形式
应用层  用户接口

### Linux配置IP地址

- ifconfig

    ```
    ifconfig eth0 192.168.1.130 netmask 255.255.255.0
    ```

- setup

    ```
    yum install -y setuptool
    ```

- 配置文件

```
#网卡信息文件
/etc/sysconfig/network-scripts/ifcfg-eth0

#主机名文件
/etc/sysconfig/network
NETWORKING=yes
HOSTNAME=test

hostname test

#dns
/etc/resolv.conf

name服务器 114.114.114.114
search localhost        # 自动补全
```

# linux网络命令

### 

- ifconfig

- ifup,ifdown

- netstat

    ```
    -t  tcp
    -u  udp
    -n  不使用域名服务名
    -l  listen
    -a  all
    -r  route
    ```

- route

- nslookup

yum install bind-utils

### 网络测试

- ping 探测网络

- telnet 远程管理与端口探测

- traceroute 路由跟踪

- wget

- tcpdump
    -i  指定网卡
    -nn 将数据包中的域名与服务转为ip和端口
    -X  以16进制和ASCII码显示数据包内容
    -port 指定端口

- ssh
- scp

## 其它

- 三次握手

首先有一个前提，网络是不可靠的，然后事事有回应

最开始的客户端和服务器都是处理Closed，由于服务端不知道要和谁建立连接，所以被动的打开，然后监听端口，此时服务器处理Listen状态。

而客户端会主动打开，构建好tcb[SYN=1,seq=x]发送给服务器，此时客户端将状态改为syn_send（同步已发送）。

服务端接收到客户端发来的同步请求后，将状态改为syn_recv（同步已接收），同时构建好tcb[SYN=1,seq=y,ACK=1,ack=x+1]发送给客户端。

客户端接收到了服务端发来的tcb后，将状态改为established（就绪），也发送确认报文[ACK=1,sql=x+1,ack=y+1]。
此时客户端已经可以保证是可靠传输了，所以可以发送报文段了。

服务端在接收到了客户端相响应的报文段之后，也将状态改为established状态，至此，三次握手结束

- 四次挥手

最开始的时候，客户端和服务器都是establish状态，然后是客户端主动关闭，服务器是被动关闭的。

客户端先发送一个FIN报文段，seq=结束的报文段序号+1，告诉服务器，客户端要关闭了，此时，客户端状态改为FIN-WAIT-1，等待服务器的反馈

服务器在收到客户端发来的fin包之后，会响应一个ack给客户端。同时服务器会通知应用程序需要关闭连接了，并将状态改为close-wait。

客户端收到ack后将状态改为fin-wait-2

由于服务器可能还有一些数据没处理完，所以需要一段时间的等待，处理完后服务器会再发送一条报文告诉客户端，服务器现在已经可以关闭了，并将服务器的状态由close-wait改为last-ack

客户端收到发来的消息后，响应一个ack报文，告知服务器知道你准备好关闭了，此时，客户端将close-wait-2状态改为time-wait，再等待两个最长报文段传输时间后，自动将客户端关闭。（为什么要等待两个传输时间？避免服务器未收到最后一个ack，给时间重发）

服务端收到消息后，就将last-ack改为closed。四次挥手结束.

## 其它

- [TCP三次握手，四次挥手异常情况(坑)](https://www.cnblogs.com/quehualin/p/10409607.html)