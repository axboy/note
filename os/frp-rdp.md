## RDP远程桌面 + FRP内网穿透

#### 服务端

- frps.ini

```
[common]
bind_port = 7000
```
- 后台运行

```sh
wget https://github.com/fatedier/frp/releases/download/v0.22.0/frp_0.22.0_linux_amd64.tar.gz
nohub frp_0.22.0_linux_amd64/frps -c frp_0.22.0_linux_amd64/frps.ini & &> /dev/null
```

#### win client

- [下载](https://github.com/fatedier/frp/releases/download/v0.22.0/frp_0.22.0_windows_amd64.zip)

- frpc.ini

```
[common]
server_addr = 11.12.14.14         # 上面服务器的ip
server_port = 7000                # 上面配服务端配置的端口
[rdp]
type = tcp
local_ip = 127.0.0.1           
local_port = 3389                 # 本地实际端口 
remote_port = 1234                # 服务端端口，server_ip:1234 --> 127.0.0.1:3389
```

- 自启服务

创建一个bat脚本 __auto_frp.bat__ ，保存以下内容，根据实际情况替换

```
@echo off  
start  "C:\Windows\System32\cmd.exe"   
cd C:\Soft\frp\
frpc -c frpc.ini
exit 
```

添加到服务自启，cmd执行以下命令，binPath为绝对路径

```cmd
sc create frp binPath=C:\Soft\frp\auto_frp.bat start=auto
```

#### 参考

- [51CTO Blog](http://blog.51cto.com/sonlich/2126175)

- [github](https://github.com/fatedier/frp)