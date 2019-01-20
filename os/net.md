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

nameserver 114.114.114.114
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