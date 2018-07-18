# 字符串

1. String对象是不可变的，修改都是创建全新对象

2. StringBuilder只生成一个对象，如果大致知道字符串长度，预先定义好长度可避免多次重新分配缓冲

3. StringBuilder是java se5引入的，之前用的是StringBuffer，StringBuffer是线程安全，开销会大一些

4. String 编译会编译为StringBuilder

- String上的操作

方法|参数|应用
---|---|---
构造函数|无、String、StringBuffer、StringBuilder、char[]、byte[]|创建对象
length()||
charAt()||
getChars(),getBytes()||todo
toCharArray()||返回对应的字符数组
...|...|...

- 格式化输出

```java
    System.out.printf("a = %d\n", a);
    System.out.format("a = %d\n", a);
```
```
    d   整数，十进制                  e   浮点数，科学计数
    c   Unicode字符                  x   整数，16进制
    b   boolean值                    h   散列码
    f   浮点数，十进制                 s   String
```

- 正则表达式

    java中，"\\"表示正则表达式的"\"，其它语言，"\\"表示一个普通的反斜杠，java要表示普通的反斜杠，需要"\\\\"，换行制表符只要使用单斜杠，"\n\t"

## hr

```java
    String str1 = "abc";
    String str2 = "abc";
    String str3 = "a" + "b" + "c";
    System.out.println(str1 == str2);       //true
    System.out.println(str2 == str3);       //true
```


