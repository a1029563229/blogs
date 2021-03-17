# Bug 汇集记录

## Java

### Error parsing Mapper XML. Cause: java.lang.NullPointerException

问题原因：这个问题在于 Java mybatis 解析 XML 错误，详细报错是空指针，属于 xml 文件没找到。

解决方案：查看对 xml 引用的名称是否正确，然后再查看 Mapper 中引用的实体是否包含了包名前缀，以及调用时是否包含了包名前缀。


### Invalid value for getInt()

问题原因：数据库中表的字段的类型与实体类中属性的类型不一致

解决方案：

### Driver com.mysql.jdbc.Driver claims to not accept jdbcUrl

问题原因：spring.datasource 相关配置存在问题

解决方案：查看 spring.datasource 配置文件，jdbc 是否写错；是否额外加上了 "" 字符串包裹配置（不需要字符串包裹）。

### mybatis execute multiple sql statements will throw sql syntax error

问题原因：数据库连接本身不支持多条语句同时执行

解决方案：在

## nginx

### nginx `add_header` not working

