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

