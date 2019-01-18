# influxdb[(参考官方文档1.7)](https://docs.influxdata.com/influxdb/v1.7/)

Influxdb是一个开源的时序型数据库，使用Go语言编写，被广泛应用于存储系统的监控数据、IoT行业的实时数据等场景。
有以下特性：

- 部署简单，无外部依赖
- 内置http支持，使用http读写
- 类sql的灵活查询(max,min,sum等)

### 关键概念(对比传统数据库)

- database: 数据库
- measurement: 表
- points: 一行数据

    - tags: 各种有索引的属性
    - fields: 各种记录的值
    - time: 数据记录的时间戳，自动建索引

### docker

- [docker doc](https://hub.docker.com/_/influxdb)

- 生成配置文件

```sh
docker run --rm influxdb influxd config > influxdb.conf
```

- 运行

```sh
docker run -d --name influxdb \
    -v `pwd`/conf:/etc/influxdb \
    -v `pwd`/data:/var/lib/influxdb \
    -p 8086:8086 \
    influxdb
```

### 命令行操作[参考文章](https://www.cnblogs.com/shhnwangjian/p/6897216.html?utm_source=itdadao&utm_medium=referral)

- 数据库操作

```sh
# 进入数据库
influx
# 显示数据库
show databases
# 新建数据库
create database demo
# 删除数据库
drop database demo
# 指定数据库
use demo
```

- 表操作

```sh
# 列出所有表
show measurements
# 插入数据，无需建表，多个tag、field用逗号分隔，tag和field之间用空格分隔
# insert table_name,[tag_name=tag_value] [field_name=field_value]
# 以下table为表名
insert table,tag1=a,tag2=b field1=1,field2=2 1547803620621307597
# 删除表
drop measurement table
# 查询数据
select * from table
```

- 数据保存策略(Retention Policies)

```sh
# 查看当前库的策略
show retention policies on demo
# 新建
# rp_name为策略名
# db_name为数据库名
# 3w表示3周，小时h，天d，周w
# replication 1 表示副本个数
# default 表示设置为默认策略
create retention policy "rp_name" on "db_name" duration 3w replication 1 default
# 修改
alert retention policy "rp_name" on "db_name" duration 3w default
# 删除
drop retention policy "rp_name" on "db_name"
```

- 连续查询(Continuous Queries)

> TODO

### Http请求

> TODO