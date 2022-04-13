# Win10

### kms 激活

- 激活服务

```sh
docker run -d --name kms \
-p 1688:1688 \
luodaoyi/kms-server

docker exec -it kms sh

apk add --no-cache tzdata
rm /etc/localtime
ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
echo "Asia/Shanghai" > /etc/timezone
```

- win10

```sh
slmgr -ckms
slmgr -upk
slmgr /skms 192.168.1.1
slmgr -ipk NPPR9-FWDCX-D2C8J-H872K-2YT43
slmgr /ato
slmgr.vbs -dlv
```

### 一些工具

- 清除右键菜单(bat)

```cmd
regsvr32 /u /s igfxpph.dll
reg delete HKEY_CLASSES_ROOT\Directory\Background\shellex\ContextMenuHandlers /f
reg add HKEY_CLASSES_ROOT\Directory\Background\shellex\ContextMenuHandlers\new /ve /d {D969A300-E7FF-11d0-A93B-00A0C90F2719}
reg delete HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Run /v HotKeysCmds /f
reg delete HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Run /v IgfxTray /f
```

- 将任意文件固定到开始菜单(reg)

```
Windows Registry Editor Version 5.00 
[HKEY_CURRENT_USER\Software\Classes\*] 
[HKEY_CURRENT_USER\Software\Classes\*\shellex] 
[HKEY_CURRENT_USER\Software\Classes\*\shellex\ContextMenuHandlers] 
[HKEY_CURRENT_USER\Software\Classes\*\shellex\ContextMenuHandlers\PintoStartScreen] 
@="{470C0EBD-5D73-4d58-9CED-E91E22E23282}" 
[HKEY_CURRENT_USER\Software\Classes\AllFileSystemObjects] 
[HKEY_CURRENT_USER\Software\Classes\AllFileSystemObjects\shellex] 
[HKEY_CURRENT_USER\Software\Classes\AllFileSystemObjects\shellex\ContextMenuHandlers] 
[HKEY_CURRENT_USER\Software\Classes\AllFileSystemObjects\shellex\ContextMenuHandlers\PintoStartScreen] 
@="{470C0EBD-5D73-4d58-9CED-E91E22E23282}" 
```

- windows软件安装、卸载工具

[下载](https://support.microsoft.com/en-us/help/17588/fix-problems-that-block-programs-from-being-installed-or-removed)