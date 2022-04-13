# [ETCD](https://github.com/coreos/etcd)

## docker安装

```
docker run -d --name etcd \
    -p 2379:2379 \
    -p 2380:2380 \
    -v `pwd`/certs:/etc/ssl/certs \
    quay.io/coreos/etcd
```

## etcdctl基本使用

etcdctl [全局选项] 命令 [命令选项] [命令参数]

- set
```
--ttl       设置键值超时时间，单位为秒，默认为0永不超时
--swap-with-value {value}       若该键现在的值是指定值，则进行操作
--swap-with-index {index}      若该键现在的索引是指定值，则进行操作
```

- get

获取指定键的值，若该键不存在，则报错，支持--sort选项，对值排序

- update

当键存在，则更新内容，不存在报错，支持--ttl选项

- mk

若给定的键值不存在，则创建一个新的键值，存在则报错，支持--ttl选项

- rm

移除指定键值，若不存在则报错

```
--dir           如果键是个空目录或者键值对，则删除
--recursive     删除目录和所有子健
--with-value    检查值是否匹配
--with-index    检查索引是否匹配
```

- watch

监听一个键值的变化，一旦键值发生变化，输出最新值并退出

```
--forever               一直监测，知道用户中断
--after0index '0'       在指定index之前一直监测
--recursive             返回所有的键值和子键值
```

- exec-watch

监测一个键值的变化，一旦键值更新，执行指定的命令。
```
$ ./ectdctl exec-watch testkey -- sh -c 'ls'
--after-index
--recursive
```

- ls

列出目录下的键、子目录

```
--sort
--recursive
--p             对于输出为目录，在最后添加'/'进行区分
```

- mkdir

创建新目录，如果已存在，则报错，支持--ttl选项

- rmdir

删除一个空目录或者键值对，若非空目录，则报错

- setdir

创建一个键目录，无论存在与否

- updatedir

更新一个已存在目录的属性（目前只有存活时间）

## 集群管理

TODO