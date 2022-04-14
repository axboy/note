# Redis

Redis是一个基于键值对的开源内存数据存储

Redis是远程的
Redis是基于内存的
Redis是非关系型数据库

- 应用场景

    1. 缓存
    1. 队列
    1. 数据存储

- Redis数据类型

```
String          字符串、整数或浮点数
Hash            有key-value的散列组，key是字符串
List            列表(双向链表)
Set             集合
Sorted Set      有序集合
HyperLogLog
Pub/Sub
Geo
```

### redis常用命令

- key

```
del key                     删除key
dump key                    序列化指定key，并返回序列化后的值
exists key                  检查key是否存在
keys pattern                查询所有的key
expire key seconds          设置若干秒后过期
expireat key timestamp      设置指定时间后过期
ttl key                     查询剩余的过期时间，单位秒
persist key                 移除过期时间
rename key newkey           重命名
renamenx key newkey         仅当key不存在时重命名
type                        返回key存储的数据类型
```

- String

```
set key value
setnx key value             只有key存在时才赋值
setex key seconds value     赋值并设置过期时间
get key
getset key value            将给定key的值设为value，并返回旧值
strlen key                  返回数据的字符串长度
incr key                    将存储的数字值加一
incrby key increment        将存储的数字增加指定值
decr key
decrby key increment
append key value            向已存在的key里追加值
```

- Hash

```
hdel key field1 [field2]            删除多个哈希字段
hexists key field
hget key field
hgetall key
hincrby key field increment         整数增加指定值
hincrbyfloat key field increment    浮点数增加指定值
hkeys key                           获取所有字段
hvals key                           获取所有值
hlen key
hmget key field1 [field2]
hmset key field1 value1 [field2 value2]
```

- List

```
lpush key value1 [value2]           插入到表头
lpushx key value                    插入到存在的key表头
lpop key                            移除第一个
blpop key1 [key2] timeout           移除第一个，没有则阻塞
lrange key start end                获取范围内的元素
lset key index value                通过索引设置元素
ltrim key start end                 保留指定区间的元素
rpop key                            移除最后一个元素
rpush key value1 [value2]           插入到列表尾
rpushx key value
```

- Set

```
sadd key member1 [member2]
scard key                           获取集合的成员数
sdiff key1 [key2]                   获取集合的差集
sinter key1 [key2]                  获取集合的交集
sunion key1 [key2]                  回去集合的并集
sismember key member                判断member元素是否是集合key的成员
smembers key                        返回集合所有成员
smove source destination member     将member元素从source移动到destination
spop key                            移除并返回一个随机元素
srem key member1 [member2]          移除元素
```

- Sorted set

```
zadd key score1 member1 [score2 member2]        增加或更新值
zcard key                           获取成员数
zcount key min max                  获取指定分数区间的成员数
zincrby key increment member        成员加分
zlencount key min max               获取指定字典区间的成员数
zscore key member                   获取分数
zrevrank key member                 返回指定成员的排名，分数从大到小
zrangebyscore key min max [limit offset count]      获取制定分数区间成员
zrangebylen key min max [limit offset count]        获取指定字典区间成员
# 以下3个删除命令
zremrangebylex key min max
zremrangebyrank key start end
zremrangebyscore key min max
```

- HyperLogLog

```
pfadd key element1 [element2]       添加元素
pfcount key1 [key2]                 返回基数估算值
pfmerge destkey sourcekey1 [sourcekey2]     将多个合并成一个 
```

- Pub/Sub

```
subscribe pattern1 [pattern2]           订阅多个频道
psubscribe pattern1 [pattern2]          订阅多个符合条件的频道
publish channel message                 发送信息到指定channel
punsubscribe pattern1 [pattern2]        退订所有频道
unsubscribe channel1 [channel2]         退订多个频道
pubsub channels [pattern]               列出活跃频道(至少有一个订阅者，不包含订阅模式客户端)
pubsub numsub [channel1]                返回指定频道订阅者数量
pubsub numpat                           返回所有订阅者数量
```

- 事务

单个 Redis 命令的执行是原子性的，但 Redis 没有在事务上增加任何维持原子性的机制，所以 Redis 事务的执行并不是原子性的。

事务可以理解为一个打包的批量执行脚本，但批量指令并非原子化的操作，中间某条指令的失败不会导致前面已做指令的回滚，也不会造成后续的指令不做。

```
multi                   标识一个事务块的开始
discard                 取消事务
exec                    执行事务块内的命令
watch key1 [key2]       监视多个key，如果事务执行前这些key有改动，事务将打断
unwatch                 取消watch命令对所有key的监视
```

- 服务器管理

```
bgrewruteaof            异步执行一个aof(AppendOnly File)文件重写操作
bgsave                  异步保存到磁盘
client kill [ip:port] [id client]       关闭客户端连接
client list             获取客户端列表
client getname          获取连接的名称
dbsize                  当前库的key数量
flushall                移除所有key
flushdb                 移除当前库所有key
role                    返回主从实例所属角色
save                    同步到硬盘
```

### 参考文章

- [pubsub](http://doc.redisfans.com/pub_sub/pubsub.html)

- [runoob](http://www.runoob.com/redis/redis-tutorial.html)