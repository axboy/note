### 简介

- 基于Apache Lucene构建的开源搜索引擎

- 采用java编写，提供简单易用的RESTFul API

- 轻松横向扩展，可支持PB级别的结构化或非结构化数据处理

### 应用场景

- 海量数据分析引擎

- 站内搜索引擎

- 数据仓库

### 单机安装

- 跨域配置

```yml
http.cors.enabled: true
http.cors.allow-origin: "*"
```

### head插件

- run

```sh
npm install
npm run start
```

### Kibana

- config

```yml
server.port: 5601
server.host: "localhost"
server.basePath: ""
elasticsearch.url: "http://localhost:9201"
```

- run

```sh
bin/kibana
```

### 集群安装

- master config

```yml
http.port: 9201
cluster.name: test
node.name: master
node.master: true
network.host: 127.0.0.1
```

- slave config

```yml
http.port: 9202
cluster.name: test
node.name: slave1
network.host: 127.0.0.1

discovery.zen.ping.unicast.hosts: ["127.0.0.1"]
```

### 基础概念

- 集群和节点

- 索引

含有相同属性的文档集合（英文字母小写，不含中文线，相当于一个数据库）

- 类型

索引可以定义一个或多个类型，文档必须属于一个类型。（相当于数据库的表）

- 文档

文档是可以被索引的基本数据单位（相当于数据的一条数据）

- 分片

每个索引都有多个分片，每个分片是一个Lucene索引。默认5个分片

- 备份

### RESTFul API

- 基本格式

```text
http://<ip>:<port>/<index>/<type>/doc_id
```

- 创建索引

结构化索引、非结构化索引

### spring boot

[see](../java/spring-boot/es/)

# more todo