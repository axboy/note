# mongodb

mongodb有三元素：数据库，集合（表），文档（行）

--dbpath    指定数据存放文件点

_**以下domain替换成表名**_

1. insert
    ```
    db.domain.insert({"name":"zcw","age":22})
    ```

1. find
    ```
    db.domain.find()
    db.domain.find({"name":"zcw"})
    db.domain.find({"age":{$gt:20}})            gt,te...
    db.domain.find({$or:[{...},{...}]})         or
    db.domain.find({"k1":"v1","k2":"v2"})       and
    db.domain.find({"name":{$in:["a","b","c"]}})    In
    db.domain.find({"name":{$nin:["a","b","c"]}})   NotIn
    db.domain.find({$where:function(){return this.age == 10;}})         // $where，返回布尔值，数字0或非0，对象空或非空
    
    .sort({"name",1})            //排序，1升序
    .skip(0)                     //offset
    .limit(10);                  //pageSize
    ```

1. update，默认只修改第一条，第一个参数为查找条件，第二个参数为更新的值
    ```
    db.domain.update({"name":"zcw"},{"name":"zzz"})             //整体更新
    ```

    1. $inc修改器,在原基础上修改值，如果文档中没有此key，则创建;inc是increase的缩写
        ```
        db.domain.update({"name":"zcw"},{$inc:{"age":10}})      原来22，会变成32
        ```
    1. $set修改器
        ```
        db.domain.update({"name":"zcw"},{$set:{"age":10}})      原来22，变成10
        ```
    1. update第3个参数设置为true，更新数据，没有则新增
    1. update第4个参数设置为true，批量更新
    
1. remove，如果不带参数，将删除所有数据，不可恢复
    ```
    db.domain.remove()
    ```

1. count
    ```
    db.domain.count({"age":20})         统计年龄为20的数据条数
    ```
    
1. distinct，列出指定字段，并去重
    ```
    db.domain.distinct("age")           列出所有的年龄值，并去重
    ```

1. group 

    key : 分组的key

    initial : 每组都执行的初始化函数，类似于构造函数
    
    $reduce : 两个参数，当前对象，上次操作的累积对象
    
    //////以下是可选条件
    
    condition : 过滤条件
    
    finalize : 每组执行完后调用此方法，类似于析构函数
    
    ```
    db.user.group({
    ... key:{age:true,xxxx:true},           #多个key写后面即可    FIXME:value值貌似随便填，不一定要true
    ... initial:{names:[]},
    ... $reduce:function(cur,pre){          #  $可不写
    ...     prev.names.push(cur.name);
    ... }
    ... });

    ```
    
1. mapReduce
    ### TODO

1. explain，性能分析函数

1. 索引

    ```
    db.domain.ensureIndex({name:1})                      //1,升序,-1降序
    
    db.domain.ensureIndex({name,1},{unique:true})        //唯一索引
    
    db.domain.ensureIndex({name:1,age:1})
    db.domain.ensureIndex({age:1,name:1})                //组合索引
    
    db.domain.getindexes()                               //查看索引
    
    db.domain.dropIndexes("name_1")                      //删除索引
    ```

1. aggregate
    
    ### TODO

[参考博客](http://www.cnblogs.com/huangxincheng/archive/2012/02/18/2356595.html)

[mongodb doc](https://docs.mongodb.com/manual/)