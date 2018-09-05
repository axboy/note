# 并发相关

* 如何定义线程

   1. 实现Runnable接口

   1. new Thread()

* Thread类型中的start()和run()方法区别

    ```
    start()方法用来启动新的线程，内部调用了run()方法。
    run()方法只会在原来的线程中调用
    ```

* todo

在Java SE5引入Callabel接口

- 线程池

corePoolSize        线程池中初始线程数量，可能处于等待状态
maximunPoolSize     线程池中最大允许线程数量
keepAliveTime       超出corePoolSize部分线程如果等待这个时间将被回收
