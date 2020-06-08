# MySql

## 安装及基本使用

- [docker安装](https://hub.docker.com/_/mysql/)

```
docker run -d --name mysql \
    -p 3306:3306 \
    -v `pwd`/conf.d:/etc/mysql/conf.d \
    -v `pwd`/data:/var/lib/mysql \
    -e MYSQL_ROOT_PASSWORD=123456 \
    mysql:latest
```

- 创建数据库

```
CREATE DATABASE `demo` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
```

- 创建用户

```
CREATE USER 'demo_root'@'localhost' IDENTIFIED BY '123456';
CREATE USER 'demo_root'@'192.168.0.%' IDENTIFIED BY '123456';
CREATE USER 'demo_root'@'%' IDENTIFIED BY '123456';
```

- 删除用户

```
 DROP USER 'demo_root'@'%';
```

- 授权

```
GRANT ALL PRIVILEGES ON demo.* TO 'demo_root'@'localhost';
GRANT ALL PRIVILEGES ON demo.* TO 'demo_root'@'192.168.0.%';
GRANT ALL PRIVILEGES ON demo.* TO 'demo_root'@'%' WITH GRANT OPTION;
```

- 回收权限

```
REVOKE privilege ON databasename.tablename FROM 'username'@'host';
```

- 刷新权限

```
flush privileges; 
```

## 理论

### 关系型数据库
- 基于关系代数理论
- 缺点，二维表显示，表结构不直观、实现复杂，速度慢
- 优点，健壮性高，社区庞大

### 隔离级别
```
Read uncommitted
Read committed
Repeatable Reads
Serializable
```

### 索引

- b树
- m阶 b+树

每个非叶子节点（除根外）至多有2m个儿子，至少有m/2个儿子
根节点（如果不是叶子）至少有两个儿子
所有叶子节点在同一层

- 作用
加快查找速度
约束数据的值

- 分类
clustered index, 索引直接存值，每个表至多一个，一般是主键
Non-clustered index, 索引保存的是一个地址，可以有多个

### 连接池

- Tomcat JDBC Connection pool
maxActive,最多多少个连接，默认100
maxIdle，最多多少个空连接，默认100
minIdle，至少多少个空连接，默认10
initialSize，初始化的连接，默认10
maxWait，最长等待时间，默认30000，30s

## 行锁和表锁

- 建测试表、初始化数据
```
drop table if exists person;
create table person (
id int primary key,
`name` varchar( 20 )
);
insert into person values(1,'A');
insert into person values(2,'B');
insert into person values(3,'C');
set autocommit=0;
```

- 测试行锁
```
-- tab1
begin;
select * from person where id =1 for update;

-- tab2
update person set name='a' where id=1 ;         //等待

-- tab3
update person set name='a' where id=2 ;         //直接成功

-- tab1
commit;                                         //tab2成功
```

- 测试表锁
```
-- tab1
begin;
select * from person where name = 'a' for update;

-- tab2
update person set name='c' where id=3 ;             //等待

-- tab1
commit;                                             //tab2成功
```

InnoDB行锁是通过索引上的索引项来实现的，这一点ＭySQL与Oracle不同，后者是通过在数据中对相应数据行加锁来实现的。InnoDB这种行锁实现特点意味者：只有通过索引条件检索数据，InnoDB才会使用行级锁，否则，InnoDB将使用表锁。
在实际应用中，要特别注意InnoDB行锁的这一特性，不然的话，可能导致大量的锁冲突，从而影响并发性能。
造成锁表和锁行的原因在于查询条件是否走索引来决定的。原因在于：行锁是基于索引实现的。

## [utf8和utf8mb4](http://www.mybatis.cn/archives/844.html)

UTF-8 编码是一种变长的编码机制，可以用 1 ~ 4 个字节存储字符。但是，因为历史遗留问题，MySQL 中的 utf8 编码并不是真正的 UTF-8，而是阉割版的，最长只有3个字节。当遇到占4个字节的 UTF-8 编码，例如 emoji 字符或者复杂的汉字，会导致存储异常。

- utf8 编码特点：
1. 最大字符长度为 3 字节，如果遇到 4 字节的字符就会出现错误了。
2. 无法存贮表情和不常用汉字
3. 消耗空间比 utf8mb4 少

- utf8mb4 编码特点：
1. 最大字符长度为4字节
2. 对于 CHAR 类型数据，存储会多消耗一些空间。
3. 多了表情的支持

## 事务、事务隔离

## 悲观锁、乐观锁

## 索引优化

```
1. 索引在独立的列，不能是表达式的一部分吗，不能是函数的参数
2. 前缀索引，不能order by,group by
3. 包含and，or时，出现索引合并，
3. 多列索引，如果看到有多
5. 组合索引，将重复数据少的放前面
6. 聚蔟索引

```

## 其他
- [极简SQL](http://www.sqlbook.cn/)
- [sql select distinct语句](http://www.mybatis.cn/archives/845.html)
- [sql concat() 和 group_concat()](http://www.mybatis.cn/archives/847.html)

