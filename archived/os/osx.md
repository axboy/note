# osx 配置

1. 触控板和鼠标滚轮分开设置滚动方向，安装Scroll Reverser。

1. brew
```sh
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

    - 替换国内源
    ```sh
    cd "$(brew --repo)"
    git remote set-url origin https://mirrors.ustc.edu.cn/brew.git
    cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
    git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
    ```

    - 使用官方源
    ```sh
    cd "$(brew --repo)"
    git remote set-url origin https://github.com/Homebrew/brew.git 
    cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
    git remote set-url origin https://github.com/Homebrew/homebrew-core.git 
    ```


1. 配置环境

```sh
#!/bin/bash

# git tips
[ -f /usr/local/etc/bash_completion ] && . /usr/local/etc/bash_completion

# source .bashrc
if [ -f ~/.bashrc ]; then
    . ~/.bashrc
fi

# 设置终端ls颜色
export LS_OPTIONS='--color=auto'
export CLICOLOR='Yes'
# export LSCOLORS='CxfxcxdxbxegedabagGxGx'    #指定颜色

PS1='\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\W\[\033[00m\]\$ '

####### jdk
JAVA_8_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_172.jdk/Contents/Home
JAVA_HOME=$JAVA_8_HOME
CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
PATH=$JAVA_HOME/bin:$PATH:

export JAVA_HOME
export CLASSPATH
export PATH

####### maven
M2_HOME=/Users/zcw/Soft/Maven/apache-maven-3.5.3
export PATH=$PATH:$M2_HOME/bin

####### android
ANDROID_HOME=/Users/zcw/Soft/Android/android-sdk-macosx
export ANDROID_HOME
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools

####### gradle
GRADLE_HOME=/Users/zcw/Soft/Gradle/gradle-4.1
export GRADLE_HOME
export PATH=$PATH:$GRADLE_HOME/bin

####### sonar-scaner
SONAR_SCANNER_HOME=/Users/zcw/Soft/sonar-scanner
export PATH=$PATH:$SONAR_SCANNER_HOME/bin

####### brew
export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles
export HOMEBREW_NO_AUTO_UPDATE=true
```

1. MicroSoft Office 修改语言

[参考](https://answers.microsoft.com/en-us/msoffice/forum/msoffice_other-mso_mac-mso_mac2016/how-to-manually-change-the-language-used-in-office/abe2a9c1-f550-45de-9d0e-58b99f206c41)

```sh
defaults write com.microsoft.Word AppleLanguages '("zh-cn")'
defaults write com.microsoft.Excel AppleLanguages '("zh-cn")'
defaults write com.microsoft.Powerpoint AppleLanguages '("zh-cn")'
```