# Docker

- 安装

```
# https://docs.docker.com/engine/install/centos/
$ sudo yum install -y yum-utils
$ sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
$ sudo yum install docker-ce docker-ce-cli containerd.io
```

- 修改默认存储位置

```
# 1.软链接
systemctl stop docker
mv /var/lib/docker /data/lib/docker
ln -s /data/lib/docker /var/lib/docker

# 2. 修改启动参数(centos)
vi /usr/lib/systemd/system/docker.service
ExecStart=/usr/bin/dockerd --graph /data/lib/docker
systemctl daemon-reload

# 3. 修改配置文件
tee /etc/docker/daemon.json << 'EOF'
{
    "registry-mirrors": ["https://8wlyegdb.mirror.aliyuncs.com"],
    "graph": "/data/lib/docker"
}
EOF
systemctl daemon-reload

# 4. 增加配置
tee /etc/systemd/system/docker.service.d/docker.conf << 'EOF'
[Service] 
ExecStart=/usr/bin/dockerd --graph="/mnt/new_volume" --storage-driver=devicemapper
EOF
systemctl daemon-reload
```

- 设置日志驱动
```
tee /etc/docker/daemon.json << 'EOF'
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m",
    "max-file": "3",
    "labels": "production_status",
    "env": "os,customer"
  }
}
EOF
```

- 批量清理临时镜像文件

```sh
docker rmi $(docker images -q -f dangling=true)
docker rmi -f $(docker images | grep "<none>" | awk "{print \$3}")
docker rmi -f $(docker images | grep "month" | awk "{print \$3}")
docker rmi -f $(docker images | grep "week" | awk "{print \$3}")
```

- 查看镜像支持的环境变量

```sh
docker run IMAGE env
```

- 本地镜像文件存储在/var/lib/docker/下

#

- [Deis](http://deis.io)

- seagull

```sh
docker run --name seagull -d \
    -p 10086:10086 \
    -v /var/run/docker.sock:/var/run/docker.sock \
    tobegit3hub/seagull
```

