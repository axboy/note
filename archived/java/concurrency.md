# Java并发

## 基础概念

### 多线程有什么用

1. 发挥多核cpu的优势
2. 防止阻塞
3. 便于建模

### 线程状态

- NEW

Thread state for a thread which has not yet started.

- RUNNABLE

Thread state for a runnable thread.

- BLOCKED

线程进入synchronized同步块，等待锁时的状态

- WAITING

无时间限制等待，调用Object.wait(),Thread.join(),LockSupport#park()进入等待。

- TIMED_WAITING

有时限的等待，上述方法带参数的重载方法

- TERMINATED

线程执行完成

### wait, sleep 和 notify

wait会释放锁，必须在同步代码块调用。sleep不释放资源。

### suspend,stop 和 resume
 
 已废弃

### join 和 yield

yield，当前线程让出cpu，重新抢占，给别的线程机会。
join，加入线程，等待线程执行完成。

### volatile

1. 保证可见性
2. 禁止指令重排
3. 不保证原子性，可和cas结合以保证原子性

### 线程安全

代码在多线程环境下执行和在单线程环境下执行，永远都能获得一样的结果，那这段代码就是线程安全的。

### 获取dump文件

死循环、死锁、阻塞、页面打开慢等问题，打线程 dump 是最好的解决问题的途径。

1. 获取pid，jps 或 ps -ef | grep java
2. 打印，jstack pid 或 kill -3 pid

## juc

### ReentrantLock
- lock()
- lockInterruptibly()
- tryLock()
- tryLock(long timeout, TimeUnit unit)

### Condition
- await()
- awaitUninterruptibly()
- singal()
- singalAll()

    调用singal需要主动释放锁

### Semaphore

- void acquire()
- void acquireUninterruptibly()
- boolean tryAcquire()
- boolean tryAcquire(long timeout, TimeUnit unit)
- void release()

### ReadWriteLock

- 读读不互斥
- 读写互斥
- 写写互斥

### CountDownLatch

### CyclicBarrier

### LockSupport

可以在任意位置阻塞线程，无需获得锁。

park,unpark替换Object#suspend,resume方法。

处于park挂起状态的线程是waiting状态，而suspend挂起的事runable状态

### ThreadPool

- 作用
1. 避免频繁创建、销毁线程开销
2. 灵活控制并发数量

#### 构造参数
- corePoolSize
- maximumPoolSize
- keepAliveTime
- unit
- workQueue
    - 直接提交队列
    - 有界任务队列
    - 无界任务队列
    - 优先任务队列
- threadFactory
- handler
    - AbortPolicy           直接抛异常
    - CallerRunsPolicy      在调用者线程运行任务
    - DiscardOledestPolicy  丢弃最老的任务，即即将执行的任务
    - DiscardPolicy         静默丢弃

#### 扩展
- beforeExecute
- afterExecute
- terminated

### Fork/Join

## 并发容器

- ConcurrentHashMap
- CopyOnWriteArrayList
- ConcurrentLinkedQueue
- BlockingQueue,接口
    - offer/poll，满队列offer直接返回false；空队列poll直接返回null
    - put/take，满队列put等待，空队列take等待
- ConcurrentSkipListMap,跳表

## jvm锁优化
- 锁偏向
- 轻量级锁
- 自旋锁
- 锁消除