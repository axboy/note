# Spring Cloud Feign

## 流程

动态注册 -> 实例初始化 -> 函数调用 -> 网络请求

### 动态注册

- EnableFeignClients

OpenFeign的开关，该注解有3个作用：
1. 引入FeignClientsRegistrar
2. 指定FeignClient包信息
3. 指定FeignClient接口类的自定义配置类

- FeignClientsRegistrar#registerBeanDefinitions
1. 注册EnableFeignClients中配置的实例
2. 根据EnableFeignClients中提供的包信息扫描FeignClient接口类，然后实例注册

- FeignClientsRegistrar#regusterFeugnClients
1. 扫描类信息
2. 动态注册bean

### 实例初始化
- FeignFactoryBean#getObject()

- 扫描函数信息

- 生成Proxy接口类
