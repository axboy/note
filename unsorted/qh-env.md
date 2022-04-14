# 钱皇开发环境

1. sdkman

    - 安装

        ```bash
            $ curl -s "https://get.sdkman.io" | bash
            $ source "$HOME/.sdkman/bin/sdkman-init.sh"
        ```

    - sdkman使用举例

        ```bash
            sdk install gradle          #安装gradle
            sdk install gradle 3.0      #安装指定版本
            sdk ubinstall gradle        #移除安装的gradle
            sdk rm gradle               #同上
            sdk use gralde 3.0          #使用临时版本
            sdk default gradle 3.0      #设置静默版本
            sdk current gradle          #查看安装的sdk版本列表
        ```

    - 开发环境

        ```bash
            sdk i gradle
            sdk i maven
            sdk i java 8u121
            sdk i grails 2.5.4
            sdk i groovy 2.4.9
        ```

1. nodejs

    - 安装

        ```bash
            $ wget https://nodejs.org/dist/v6.10.1/node-v6.10.1-linux-x64.tar.xz
            $ sudo mkdir /usr/local/nodejs/
            $ sudo tar xvf node-v6.10.1-linux-x64.tar.xz -C /usr/local/nodejs/
        ```
    
    - 配置

        编辑/etc/profile.d/xxx.sh文件，追加如下内容，添加好后执行 _source /etc/profile_
        
        ```
            NODE_HOME=/usr/local/nodejs/node-v6.10.1-linux-x64
            export PATH=$PATH:$NODE_HOME/bin
        ```

1. docker

    - 安装

        ```bash
            sudo apt-get update
            sudo apt-get install -y docker.io
        ```

    - 使用示例

        ```bash
            docker search mongo                # 搜索镜像
            docker pull mongo                  # 获取镜像
            docker images                      # 列出所有镜像
            docker ps                          # 列出正在运行的镜像
            ...
        ```

    - 安装nginx

        ```bash
            docker pull nginx
            docker run -d -p 80:80 --name qh-nginx\
                -v /home/zcw/Soft/nginx:/etc/nginx/conf.d \
                -v /home/zcw/Soft/nginx/logs:/var/log/nginx \
                -v /home/zcw/work:/data nginx
        ```

        _配置文件，见...qh-admin-front/README.md_

    - 安装mongodb

        ```bash
            docker pull mongo
            docker run -p 27017:27017 -v ~/db:/data/db -d mongo
        ```

1. git

    - 生成默认密钥

        ```bash
            ssh-keygen -t rsa -C zcw1994@live.com
        ```

    - 生成自定义文件名密钥

        ```bash
            ssh-keygen -t rsa -f ~/.ssh/id_rsa_github -C zcw1994@live.com
        ```

    - 多密钥配置

        添加文件~/.ssh/config，内容如下

        ```
            Host test-github                        #网站本地别称，建议设置成网站域名，该行不要直接复制，具体见下文
            Hostname github.com                     #网站实际地址
            IdentityFile ~/.ssh/test-github         #密钥路径
            User zcw
        ```

    - 多密钥测试

        ```bash
            ssh -v git@test-github
        ```

        @符号后面的地址需要使用config文件中的 __host__ 的值，而不是 __hostname__ ，所以说建议设置成一样，测试连接 __github.com__ 不行，这个大坑

1. virtual box

    - [参考](https://jingyan.baidu.com/article/870c6fc3092aedb03fe4be28.html)

1. robomongo

    - [参考](https://btpka3.gitbooks.io/btpka3/db/robomongo.html)

1. jmeter

    - [下载地址](http://jmeter.apache.org/download_jmeter.cgi)

    - 参考配置

        ```
            JMETER="/usr/local/jmeter/apache-jmeter-2.9"
            export CLASSPATH="$JMETER/lib/ext/ApacheJMeter_core.jar:$JMETER/lib/jorphan.jar:$JMETER/lib/logkit-2.0.jar:$CLASSPATH"
            export PATH=$PATH:$JMETER/bin
        ```

1. 一些其它系统配置

    - [参考](https://btpka3.gitbooks.io/btpka3/os/linux/ubuntu.html)

1. vs code 、 intellij idea

    - 略