# Docker

## 安装

```
> https://docs.docker.com/engine/install/centos/
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

## Docker 日志

### 日志驱动

```
none        容器不输出任何日志
json-file   以json格式写入文件
syslog      写入宿主机的Syslog中
journald    写入宿主机的Journald
fluentd     写入宿主机的Fluentd
gelf        以GELF格式写入GrayLog
awslogs     写入aws CloudWatch Logs
splunk      写入Splunk中
etwlogs     写入etw中(Event Tracing for windows)
gcplogs     写入Google cloud platform
nats        写入NATS服务器
```

- 启动时指定

```
docker run -d --name nginx \
  --log-drriver json-file \
  --log-opt max-size=100m \
  --log-opt max-file=5 \
  nginx
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

## 其他

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

## 常用镜像(单机版)

- MySQL

```
docker run -d --name mysql \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=123456 \
  -v `pwd`/conf.d:/etc/mysql/conf.d \
  -v `pwd`/data:/var/lib/mysql \
  --restart always \
  mysql:8.0

# my.cnf
[mysqld]
datadir=/var/lib/mysql
default-time_zone = '+8:00'
```

- Redis

```
docker run -d --name redis \
  -p 6379:6379 \
  redis:5.0.9 \
  --requirepass "123456"
```

- nginx

```
docker run -d --name nginx \
  -p 80:80 -p 443:443 \
  -v `pwd`/conf.d:/etc/nginx/conf.d \
  -v `pwd`/logs:/var/log/nginx \
  -v `pwd`/data:/data \
  -restart always \
  nginx:1.9
```

- rabbitmq

```
docker run -d --name rabbitmq \
    -p 15672:15672 \
    -p 5672:5672 \
    -e RABBITMQ_DEFAULT_USER=admin \
    -e RABBITMQ_DEFAULT_PASS=admin \
    --restart always \
    rabbitmq:3.8.4-managemnet
```

- InfluxDB
```
docker run -d --name influxdb \
    -p 8086:8086 \
    -v `pwd`/db:/var/lib/influxdb \
    influxdb
```

- Grafana

- cAdvisor

- Zipkin
```
docker run -d --name zipkin \
    -p 9411:9411 \
    openzipkin/zipkin
```

- MongoDB

- [ElasticSearch](https://hub.docker.com/_/elasticsearch)

```
docker run -d --name es \
    -p 9200:9200 \
    -p 9300:9300 \
    -v `pwd`/data:/usr/share/elasticsearch/data \
    -v `pwd`/logs:/usr/share/elasticsearch/logs \
    -v `pwd`/readonlyrest.yml:/usr/share/elasticsearch/config/readonlyrest.yml \
    -e "discovery.type=single-node" \
    -e "cluster.name=es-docker-cluster" \
    -e "ES_JAVA_OPTS=-Xms512m -Xmx512m" \
    -e "TZ=Asia/Shanghai" \
    --restart always \
    elasticsearch:7.7.0

> readonlyrest.yml
readonlyrest:
    access_control_rules:
        - name: "Require HTTP Basic Auth"
    type: allow
    auth_key: admin:123456
```

- LogStash

```
docker run -d --name logstash \
    -p 5000:5000 \
    --link es:es \
    -v `pwd`/logstash.yml:/usr/share/logstash/config/logstash.yml \
    -v `pwd`/logstash.conf:/usr/share/logstash/pipeline/logstash.conf \
    logstash:7.7.0

> logstash.yml
http.host: "0.0.0.0"
xpack.monitoring.enabled: false
xpack.monitoring.elasticsearch.hosts: ["http://es:9200"]

> logstash.conf
input {
  stdin{
  }
  syslog{
    type => "rsyslog"
    port => 4560
  }
}
output{
  stdout{
  }
  elasticsearch{
    hosts => ["es:9200"]
    user => "admin"
    password => "123456"
  }
}
```

- Kibana

```
docker run -d --name kibana \
    -p 5601:5601 \
    --link es:es \
    -e "ELASTICSEARCH_URL=http://es:9200" \
    -e "ELASTICSEARCH_USERNAME=admin" \
    -e "ELASTICSEARCH_PASSWORD=123456" \
    -e "TZ=Asia/Shanghai" \
    kibana:7.7.0
```

- Nacos
```
docker run -d --name nacos \
    --link mysql:mysql \
    -p 8848:8848 \
    -p 9555:9555 \
    -v `pwd`/mysql:/home/nacos/plugins/mysql \
    -v `pwd`/logs:/home/nacos/logs \
    -v `pwd`/custom.properties:/home/nacos/init.d/custom.properties \
    -e PREFER_HOST_MODE=hostname \
    -e MODE=standalone \
    -e SPRING_DATASOURCE_PLATFORM=mysql \
    -e MYSQL_SERVICE_HOST=mysql \
    -e MYSQL_SERVICE_DB_NAME=nacos_dev \
    -e MYSQL_SERVICE_PORT=3306 \
    -e MTSQL_SERVICE_USER=root \
    -e MYSQL_SERVICE_PASSWORD=123456
    nacos/nacos-server:latest
```
