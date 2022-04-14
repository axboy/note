- 生成密钥

    1. 默认密钥

        ```bash
        ssh-keygen -t rsa -C zcw1994@live.com
        ```

    1. 生成自定义文件名密钥

        ```bash
        ssh-keygen -t rsa -f ~/.ssh/id_rsa_github -C zcw1994@live.com
        ```

    1. 多密钥配置

        添加文件~/.ssh/config，内容如下

        ```
        Host test-github                        #网站本地别称，建议设置成网站域名，该行不要直接复制，具体见下文
        Hostname github.com                     #网站实际地址
        IdentityFile ~/.ssh/test-github         #密钥路径
        User zcw
        ```

    1. 多密钥测试

        ```bash
        ssh -v git@test-github
        ```

        @符号后面的地址需要使用config文件中的 __host__ 的值，而不是 __hostname__ ，所以说建议设置成一样，测试连接 __github.com__ 不行，这个大坑

- sshd安全

    vi /etc/ssh/sshd_config

    ```
    X11Forwarding no  #
    PermitEmptyPasswords no     # 禁止空密码
    MaxStartups  10             # 最多保持多少个未认证的连接，防止SSH拒绝服务
    PermitRootLogin no          # 禁止root登录，否则很容易被用来暴力猜解
    ```

- ssh端口转发

    场景举例

    pc      |net ip         |lan ip         |service
    :-------|:--------------|:--------------|--------------
    dev     |/              |192.168.31.60  |tomcat:8080
    A@prod  |106.12.13.14   |192.168.0.100  |mongodb:27017
    B@prod  |/              |192.168.0.101  |mysql:3306

    - dev为本地开发机器，家庭宽带，无固定公网ip，运行tomcat服务，端口是8080

    - A@prod为阿里云服务器，有固定公网ip，运行mongodb服务，端口是27017

    - B@prod为阿里云服务器，无外网，和A@prod在同一局域网，运行mysql服务，端口是3306

    1. 代理服务器

        TODO

    1. 访问本地特定端口，访问远程指定服务

        * 需求示例1：从dev机器访问A@prod上的mongodb服务

        ```
        # 加上-f，在后台执行
        ssh sshUser@106.12.13.14 -C -N -g -L 27018:localhost:27017
        ```

        * 需求示例2：从dev机器访问B@prod上的mysql服务，利用A@prod作为跳板机

        ```
        ssh sshUser@106.12.13.14 -C -N -g -L 13306:192.168.0.101:3306
        ```
    
    1. ssh远程端口转发，访问远程特定端口，访问本地指定服务

        ```
        A@prod上需编辑/etc/ssh/sshd_config，修改GatewayPorts为yes，更多请查看man sshd_config
        ```

        * 需求示例：从A@prod访问本地dev机器的tomcat服务

        ```
        ssh sshUser@106.12.13.14 -C -N -g -R \
            localhost:18080:localhost:8080  \   # 访问远程18080端口，即本地8080的服务
            -o ExitOnForwardFailure=yes \
            -o ServerAliveInterval=60           # 客户端每60向服务器发送一次请求，服务器响应，从而保持连接
        ```

        * 自动填入密码脚本
        
        ```
        set password xxx
        spawn ssh sshUser@106.12.13.14 -C -N -g -R \
            localhost:18080:localhost:8080 \
            -o ExitOnForwardFailure=yes \
            -o ServerAliveInterval=60
        expect "password" {send "$password\r"}
        interact
        ```

- 补充([linux限制用户命令](https://jingyan.baidu.com/article/2a138328e534ba074a134fac.html '百度经验') 2018/02/24)

    执行以下命令

    ```sh
    useradd ddns -s /home/ddns/bin/login.sh -m          # 创建用户，指定shell
    passwd ddns                                         # 修改密码
    chown ddns:ddns -R /home/ddns                       # 修改文件夹权限
    vi /home/ddns/bin/login.sh                          # 创建login.sh文件，内容见下文
    chmod +x /home/ddns/bin/login.sh                    # 添加执行权限
    ```

    login.sh文件内容，远程登录后只能用ssh命令

    ```sh
    #!/bin/sh
    stty erase ^H
    stty kill ^U
    echo -en "SSH to Host :"
    read host
    echo -en "UserName: "
    read username
    /usr/bin/ssh $host -l $username
    ```

- 补充(远程端口转发，本地配置服务 2018/04/19)

    1. vi /usr/lib/systemd/system/ddns.service

    ```sh
    [Unit]
    Description=ddns
    After=network.target

    [Service]
    Type=simple

    ExecStart=/usr/bin/ssh ddns@server-ip -C -N -g -R *:20010:localhost:80 -o ExitOnForwardFailure=yes -o ServerAliveInterval=60

    [Install]
    WantedBy=multi-user.target
    ```
    2. 配置免密登录到服务器

    略

    3. 服务开机自启
    
    ```sh
    systemctl daemon-reload
    systemctl enable ddns           # 上面的文件名
    systemctl start ddns
    ```