## zoo.cfg配置

```
tickTime    用于计算单的时间单元，单位是毫秒
initLimit   用于集群，允许slave连接并同步到master节点的初始化时间
syncLimit   用于集群，master、slave心跳
clientPort
```

## 数据模型

- 树形结构
- 每个节点称为znode,可以有子节点，也可以有数据
- 节点分为临时节点、永久节点,临时节点session失效就消失
- 每个节点都有各自的版本号
- 当节点数据发生变化，版本号累加
- 删除/修改过时节点，版本号不匹配，操作失败
- zk节点存储的数据不宜过大
- 节点可以设置acl，可通过权限来限制用户

## 常用命令

## watcher

## acl
- getAcl
- setAcl
- addauth

### scheme
- world
- auth
- digest
- ip
- super

### permissions(cdrwa)
- create
- delete
- read
- write
- admin

### terminal

```
world:anyone:[permission]
auth:[user]:[password]:[permissions]
digest:[user]:[base64(sha1(password))]:[permissions]
ip:[ip]:[permissions]

addauth digest [user]:[password]
```

### super admin

```
1. 编辑zkServer.sh

```

### 四字命令

```
xxxx is not executed because it is not in the whitelist.
```
如果提示以上内容，则编辑配置文件，增加、修改一行，如下所示
```
4lw.commands.whitelist=*
4lw.commands.whitelist=xxxx,xxxx
```

- stat
- ruok
- dump

### 客户端工具

- 原生api
- zkclient
- apache curator

