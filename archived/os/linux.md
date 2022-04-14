# linux

启动过程：内核的引导，运行init，系统初始化，建立终端，用户登录系统

```
    /bin    binary的缩写，存放最经常使用的命令
    /boot   这里存放的时启动linux时使用的一些核心文件，包括一些连接文件和镜像文件
    /dev    device的缩写，存放的是linux的外部设备，linux一切皆文件
    /etc    该目录用来存放所有的系统管理所需要的配置文件和子目录
    /home   用户的主目录
    /lib    存放系统最基本的动态连接共享库
    /lost+found     一般是空的，除非系统非法关机
    /media  自动识别的设备，u盘、光驱等，自动挂载到这里
    /mnt    用于临时挂载别的文件系统，把U盘挂载到这，该目录就可查看U盘文件了
    /opt    用于安装额外软件
    /proc   虚拟目录，是系统内存的映射，可以访问该目录获取系统信息，该目录内容在内存里
    /root   超管目录
    /selinux    redhat/centos所特有的目录，Selinux是一个安全机制，类似于windows的防火墙，但是这套机制比较复杂，这个目录就是存放selinux相关的文件的
    。。。
```

- which   A2008abc

    用于查找一个命令的路径





[参考资料](http://www.92csz.com/study/linux/)