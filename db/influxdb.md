# influxdb

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

- series(FIX ME)

> 所有在数据库中的数据，都需要通过图表来展示，而这个series表示这个表里面的数据，可以在图表上画成几条线：通过tags排列组合算出来。

```sh

show series from table
```

### docker安装

- 生成配置文件

```sh
docker run --rm influxdb influxd config > influxdb.conf
```

- 运行

```sh
docker run -d --name influxdb \
    -v `pwd`/data:/var/lib/influxdb \
    -p 8086:8086 \
    influxdb

# 启用管理界面，需要1.3.0以下
docker run -d --name influxdb \
    -v `pwd`/data:/var/lib/influxdb \
    -e INFLUXDB_ADMIN_ENABLED=true \
    -p 8086:8086 \
    -p 8083:8083 \
    influxdb:1.1.0
```

### 命令行操作

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

```sh
# 创建demo1数据库
curl -POST http://192.168.2.10:8086/query \
    --data-urlencode "q=create database demo1"

# 删除demo1数据库
curl -POST http://192.168.2.10:8086/query \
    --data-urlencode "q=create database demo1"

# 插入一条数据
curl -i -XPOST 'http://192.168.2.10:8086/write?db=demo1' \
    --data-binary 'table,tag1=a field1=1 1434055562000000000'

# 插入多条数据
curl -i -XPOST 'http://192.168.2.10:8086/write?db=demo1' \
    --data-binary 'cpu_load_short,host=server02 value=0.67
        cpu_load_short,host=server02,region=us-west value=0.55 1422568543702900257
        cpu_load_short,direction=in,host=server01,region=us-west value=2.0 1422568543702900257'
```

- http api响应

```text
2xx     204代表no content，200代表InfluxDB可以接收请求但是没有完成请求。一般会在body体中带有出错信息。
4xx     InfluxDB不能解析请求。
5xx     系统出现错误。
```

### 参考文档

- [官方文档1.7](https://docs.influxdata.com/influxdb/v1.7/)

- [docker doc](https://hub.docker.com/_/influxdb)

- [博客园-shhnwangjian](https://www.cnblogs.com/shhnwangjian/p/6897216.html?utm_source=itdadao&utm_medium=referral))

- [Linux大学](https://www.linuxdaxue.com/influxdb-study-series-manual.html)