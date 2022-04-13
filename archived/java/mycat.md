# mycat


### 发展历程
2008 -> Amoeba
2012 -> Cobar
2013 -> Mycat
2017 -> Mycat(1.6)

### mycat 作用

- 分布式数据库系统中间层
- 实现数据库的读写分离
- 支持读负载均衡
- 支持后端MySQL高可用
- 支持数据库垂直拆分
- 支持数据库水平拆分

### 应用场景

- 需要进行读写分离的场景
- 需要进行分库
- 多租户场景
- 数据统计系统
- HBASE的一种替代方案
- 需要使用同样方式查询多种数据库的场景

### 关键配置文件

#### schema.xml
- 定义逻辑库逻辑表
```
<schema><table></table></schema>
```

- 定义数据节点

```
<dataNode></dataNode>
```

- 定义数据节点的物理数据源

```
<dataHost></dataHost>
```

#### rule.xml

#### server.xml
