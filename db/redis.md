# Redis

Redis是一个基于键值对的开源内存数据存储

Redis是远程的
Redis是基于内存的
Redis是非关系型数据库

- 应用场景

    1. 缓存
    1. 队列
    1. 数据存储

Redis数据类型

    String   可以是字符串、整数或浮点数
    List
    Set
    Hash    有key-value的散列组，key是字符串
    Sort Set       有序集合，


lpush list1
rpop list1
llen list1

sadd set1
scard set1
sismember set1 1
srem set1 1

hset hash1 k1 v1
hget hash1 k1
