## Ubuntu

#### gnome-terminal

- 安装

```text
安装
sudo apt-get install gnome-terminal

彩色显示
vi /etc/profile.d/xxx.sh
export TERM=xterm-color

命令行提示符只显示父目录，而非整个目录
vi ~/.bashrc
export PS1=" \[\e[F;B;Cm\]\h "

修改别名
alias ll='ls -lF'
```

#### 桌面图标

```
#复制已有应用的图标
ll /usr/share/applications/*.desktop
cp /usr/share/applications/firefox.desktop ~/Desktop

#自定义图标
vi ~/Desktop/xxx

[Desktop Entry]
Name=Sublime
Icon=/opt/sublime_text/Icon/48x48/sublime-text.png
Exec=/home/zcw/shell/sublime_start.sh
StartupNotify=true
Terminal=false
Type=Application
```

#### 快捷键修改

vi ~/.config/openbox/lubuntu-rc.xml
openbox --reconfigure
```xml
<!-- Launch scrot when Print is pressed -->
<keybind key="Print">
    <action name="Execute">
    <!--<command>lxsession-default screenshot</command>-->
    <command>scrot</command>
    </action>
</keybind>

<!-- 打开控制台-->
<keybind key="W-t">
    <action name="Execute">
    <command>gnome-terminal</command>
    </action>
</keybind>

<!-- Lubuntu 锁屏-->
<keybind key="W-l">
    <action name="Execute">
    <!-- <command>xscreensaver-command -lock</command>-->
    <command>dm-tool lock</command>
    </action>
</keybind>

<!-- 注释掉以下代码，防止意外logout-->
<!--
<keybind key="C-A-Delete">
    <action name="Execute">
    <command>lxsession-default tasks</command>
    </action>
</keybind>
-->
```

#### 挂载exfat磁盘

```sh
sudo apt-get install exfat-utils
```

#### 开机自启

```sh
sudo vi /etc/rc.local
```

#### 搜狗黑框处理 ([参考](http://forum.ubuntu.org.cn/viewtopic.php?f=39&p=3107230))

```sh
sudo apt-get install xcompmgr
sudo echo 'xcompmgr' >> /etc/rc.local
```

#### docker

```sh
sudo apt-get install -y docker.io
sudo groupadd docker
sudo gpasswd -a ${USER} docker
sudo service docker restart  # sudo systemctl restart docker
```
