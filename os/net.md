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
    ifconfig eth0 192.168.1.130 netmask 255.255.255.0

- setup

- 配置文件

```
#网卡信息文件
/etc/sysconfig/network-scripts/ifcfg-eth0

/etc/sysconfig/network

#dns
/etc/resolv.conf
```