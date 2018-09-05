## MongoDB 安装

### Raspberry PI

```sh
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install mongodb-server
```

### Docker

```sh
docker run --name some-mongo -d \
    -p 27017:27017 \
    -v `pwd`/db:/data/db \
    mongo:tag

docker run -d --name some-mongo \
    -p 27017:27017 \
    -v `pwd`/db:/data/db \
    -e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
    -e MONGO_INITDB_ROOT_PASSWORD=secret \
    mongo
```

## 参考

- [Install MongoDB and Node.js on a Raspberry Pi](http://yannickloriot.com/2016/04/install-mongodb-and-node-js-on-a-raspberry-pi/)