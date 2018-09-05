# java面试题

1. 下面代码的输出结果是?

    ```java
    public class Test {
        public static void main(String[] args) {
            String str1 = "aaa";
            String str2 = "aaa";
            String str3 = new String("aaa");
            String str4 = "a" + "aa";
            System.out.println("1. " + (str1 == str2));
            System.out.println("2. " + (str1 == str3));
            System.out.println("3. " + (str1 == str4));
        }
    }
    ```

1. 下面代码的输出结果是?

    ```java
    public class Test{
        public static Test test = new Test();  
        {  
            System.out.println("block A");  
        }
        static  {  
            System.out.println("block B");  
        }  
        public Test(){
            System.out.println("block C"); 
        }
        public static void main(String[] args) {  
            Test t = new Test();       
        }  
    }
    ```

1. == 和 equals()的区别?

1. 创建线程有哪几种方式，并说说它们的区别。

1. 写一个Singleton出来。

1. JavaEE开发中，forward 和 redirect 的区别是？

1. 数据库索引的作用? 

1. Java中的 Overriding 和 Overloading 是什么意思？

1. ArrayList和LinkedList区别

1. Java集合类框架的基本接口有哪些？

1. Java中的HashMap的工作原理是什么？

1. doGet()方法和doPost()方法有什么区别？

1. 数据库

    ```
    student: id, name
    course : id, title
    score  : s_id, c_id, score
    ```

    1. 查询张三的语文的成绩
    1. 查询张三的总分
    1. 查询张三当前的总分排行(同分数并列，跳过下一名，比如两人并列第一，则下一个人为第三,即排名为113456)