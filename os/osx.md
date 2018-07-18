# osx 配置

1. 触控板和鼠标滚轮分开设置滚动方向，安装Scroll Reverser。

1. brew
    ```
        ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    ```

1. 配置环境
    ```
        ######## jdk
        JAVA_8_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_121.jdk/Contents/Home
        JAVA_HOME=$JAVA_8_HOME
        CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
        PATH=$JAVA_HOME/bin:$PATH:

        export JAVA_HOME
        export CLASSPATH
        export PATH

        ####### grails
        GRAILS_3_HOME=/Users/zcw/Soft/grails/grails-3.1.8
        GRAILS_2_HOME=/Users/zcw/Soft/grails/grails-2.5.4
        GRAILS_HOME=$GRAILS_3_HOME
        export PATH=$PATH:$GRAILS_HOME/bin

        ####### maven
        M2_HOME=/Users/zcw/Soft/maven/apache-maven-3.3.9
        export PATH=$PATH:$M2_HOME/bin

        ####### gradle
        GRADLE_HOME=/Users/zcw/Soft/gradle/gradle-3.4
        export GRADLE_HOME
        export PATH=$PATH:$GRADLE_HOME/bin
    ```
1. nginx
    ```
        docker run -d -p 80:80 --name qh-nginx\
            -v /Users/zcw/Soft/nginx:/etc/nginx/conf.d \
            -v /Users/zcw/Soft/nginx/logs:/var/log/nginx \
            -v /Users/zcw/work:/data nginx
    ```

1. mysql
    ```
        docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root mysql
    ```

1. mongodb
    ```
        docker run -p 27017:27017 -v ~/db:/data/db -d mongo3.2
    ```