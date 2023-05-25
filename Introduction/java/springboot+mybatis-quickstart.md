# 初始化 spring boot + mybatis 项目

## idea 创建 maven + spring boot 项目

选择相关依赖：

- mybatis
- spring develop tools
- lombok

## 初始化 schema 文件

在 `resouces` 目录下创建 `db` 目录，添加 `schema.sql`

```sql
CREATE TABLE IF NOT EXISTS `company`(
    -- Unique identifier for the company
    id varchar(36) PRIMARY KEY,
    -- 公司名称
    name VARCHAR(255) COMMENT '公司名称',
    -- 公司 Logo
    logo VARCHAR(255) COMMENT '公司 Logo',
    -- 公司简介
    description TEXT COMMENT '公司简介',
    is_deleted TINYINT(1) DEFAULT 0 COMMENT '是否删除',
    create_time DATETIME,
    update_time DATETIME
) COMMENT '公司表' ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `stockDo` (
    id varchar(36) PRIMARY KEY,
    -- Company ID
    company_id varchar(36) COMMENT '公司ID',
    -- 股票代码
    code VARCHAR(10) COMMENT '股票代码',
    -- 市价
    price DECIMAL(10, 2) COMMENT '市价',
    -- 涨跌幅
    rise_fall_ratio DECIMAL(5, 2) COMMENT '涨跌幅',
    -- 市值
    market_capitalization DECIMAL(15, 2) COMMENT '市值',
    -- 市盈率 PE
    price_earnings_ratio DECIMAL(10, 2) COMMENT '市盈率 PE',
    is_deleted TINYINT(1) DEFAULT 0 COMMENT '是否删除',
    create_time DATETIME,
    update_time DATETIME
) COMMENT '股票表' ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `financialDo` (
    id varchar(36) PRIMARY KEY,
    -- 公司ID
    company_id varchar(36) COMMENT '公司ID',
    -- 净资产
    equity DECIMAL(15, 2) COMMENT '净资产',
    -- 总营收
    revenue DECIMAL(15, 2) COMMENT '总营收',
    -- 毛利润
    gross_profit DECIMAL(15, 2) COMMENT '毛利润',
    -- 净利润
    net_profit DECIMAL(15, 2) COMMENT '净利润',
    -- 扣非净利润
    adjusted_net_profit DECIMAL(15, 2) COMMENT '扣非净利润',
    -- 年份
    year INT COMMENT '年份',
    -- 季度
    quarter INT COMMENT '季度',
    is_deleted TINYINT(1) DEFAULT 0 COMMENT '是否删除',
    create_time DATETIME,
    update_time DATETIME
) COMMENT '财务信息表' ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `revenue_detail` (
    id varchar(36) PRIMARY KEY,
    -- 公司ID
    `company_id` varchar(36) COMMENT '公司ID',
    -- 类型名称
    type_name VARCHAR(255) COMMENT '类型名称',
    -- 类型描述
    type_description VARCHAR(255) COMMENT '类型描述',
    -- 总营收
    revenue DECIMAL(15, 2) COMMENT '总营收',
    -- 毛利润
    gross_profit DECIMAL(15, 2) COMMENT '毛利润',
    -- 净利润
    net_profit DECIMAL(15, 2) COMMENT '净利润',
    -- 年份
    year INT COMMENT '年份',
    -- 季度
    quarter INT COMMENT '季度',
    is_deleted TINYINT(1) DEFAULT 0 COMMENT '是否删除',
    create_time DATETIME,
    update_time DATETIME
) COMMENT '财务明细表' ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `dividend` (
    `id` varchar(36) PRIMARY KEY,
    `company_id` varchar(36) COMMENT '公司ID',
    `dividend_schema` VARCHAR(255) COMMENT '分红方案',
    `dividend_amount` DECIMAL(15, 2) COMMENT '分红金额（换算成人民币）',
    `status` VARCHAR(50) COMMENT '分红状态（预案、实施）',
    `announcement_date` DATE COMMENT '公告日期',
    `equity_rights_registration_date` DATE COMMENT '股权登记日',
    `ex_right_date` DATE COMMENT '除权日',
    `distribution_dividend_date` DATE COMMENT '派息日',
    `is_deleted` TINYINT(1) DEFAULT 0 COMMENT '是否删除',
    `create_time` DATETIME,
    `update_time` DATETIME
) COMMENT '分红信息' ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## config application.yml

```yml
spring:
  datasource:
    url: jdbc:p6spy:mysql://localhost:3306/db?serverTimezone=UTC&useSSL=false
    username: username
    password: password
    driver-class-name: com.p6spy.engine.spy.P6SpyDriver
    type: com.zaxxer.hikari.HikariDataSource
    hikari:
      minimum-idle: 5
      connection-test-query: SELECT 1 FROM DUAL
      maximum-pool-size: 20
      auto-commit: true
      idle-timeout: 30000
      pool-name: SpringBootDemoHikariCP
      max-lifetime: 60000
      connection-timeout: 30000
  sql:
    init:
      mode: always
      continue-on-error: true
      schema-locations: classpath:db/schema.sql
logging:
  level:
    com.xkcoding: debug
    com.xkcoding.orm.mybatis.mapper: trace
    org.springframework.boot.autoconfigure.jdbc: DEBUG
mybatis-plus:
  global-config:
    db-config:
      logic-delete-field: is_deleted
      logic-delete-value: 1
      logic-not-delete-value: 0
  configuration:
    map-underscore-to-camel-case: true
  mapper-locations: classpath:mappers/*.xml
  type-aliases-package: com.example.investment.dos
```

## config logic delete

```yml
mybatis-plus:
  global-config:
    db-config:
      logic-delete-field: is_deleted
      logic-delete-value: 1
      logic-not-delete-value: 0
```

## config auto fill - auto fill datetime + uuid

```java
@Slf4j
@Component
public class MyMetaObjectHandler implements MetaObjectHandler {
    @Override
    public void insertFill(org.apache.ibatis.reflection.MetaObject metaObject) {
        this.strictInsertFill(metaObject, "createTime", () -> LocalDateTime.now(),  LocalDateTime.class);
        this.strictInsertFill(metaObject, "updateTime", () -> LocalDateTime.now(),  LocalDateTime.class);
    }

    @Override
    public void updateFill(org.apache.ibatis.reflection.MetaObject metaObject) {
        this.strictUpdateFill(metaObject, "updateTime", () -> LocalDateTime.now(),  LocalDateTime.class);
    }
}
```

```java
@Data
public class BaseDo {
    @TableId(type = IdType.ASSIGN_UUID)
    private String id;

    @TableLogic
    private Integer isDeleted;

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}
```

## config response advice

- ApiResponse

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiResponse {
    private int code;
    private String message;
    private Object data;

    public static ApiResponse ok(Object data) {
        return ApiResponse.builder().code(1).message("ok").data(data).build();
    }

    public static ApiResponse error(String message) {
        return ApiResponse.builder().code(-1).message(message).data(null).build();
    }

    public static ApiResponse error(String message, Object data) {
        return ApiResponse.builder().code(-1).message(message).data(data).build();
    }
}
```

- ApiResponseAdvice

```java
@RestControllerAdvice
public class ApiResponseAdvice implements ResponseBodyAdvice<Object> {
    @Override
    public boolean supports(MethodParameter returnType, Class converterType) {
        return true;
    }

    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType,
            Class<? extends HttpMessageConverter<?>> selectedConverterType, ServerHttpRequest request,
            ServerHttpResponse response) {
        if (body instanceof ApiResponse) {
            return body;
        }

        return new ApiResponse(1, "ok", body);
    }
}
```


## config MapperScan

```java
@SpringBootApplication
@MapperScan("com.example.investment.mappers")
public class InvestmentApplication {
    public static void main(String[] args) {
        SpringApplication.run(InvestmentApplication.class, args);
    }

}
```

## config validation

- pom.xml

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

- GlobalExceptionHandler

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ApiResponse handleMissingServletRequestParameterException(MissingServletRequestParameterException e) {
        String parameterName = e.getParameterName();
        String errorMessage = parameterName + " is required";
        return ApiResponse.error(errorMessage);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ApiResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        BindingResult bindingResult = ex.getBindingResult();
        List<String> errors = new ArrayList<>();

        List<FieldError> fieldErrors = bindingResult.getFieldErrors();
        List<ObjectError> globalErrors = bindingResult.getGlobalErrors();

        errors.addAll(fieldErrors.stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .toList());

        errors.addAll(globalErrors.stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .toList());

        String formattedErrors = String.join(", ", errors);

        return ApiResponse.error(formattedErrors);
    }
}
```

## config sql annalyze

`pom.xml`

```xml
<dependency>
    <groupId>p6spy</groupId>
    <artifactId>p6spy</artifactId>
    <version>3.9.1</version>
</dependency>
```

`application.yml`

```yml
spring:
  datasource:
    url: jdbc:p6spy:mysql:xxx
    driver-class-name: com.p6spy.engine.spy.P6SpyDriver
```

add `spy.properties` in resources

```properties
#3.2.1以上使用
modulelist=com.baomidou.mybatisplus.extension.p6spy.MybatisPlusLogFactory,com.p6spy.engine.outage.P6OutageFactory
# 自定义日志打印
logMessageFormat=com.baomidou.mybatisplus.extension.p6spy.P6SpyLogger
#日志输出到控制台
appender=com.baomidou.mybatisplus.extension.p6spy.StdoutLogger
# 使用日志系统记录 sql
#appender=com.p6spy.engine.spy.appender.Slf4JLogger
# 设置 p6spy driver 代理
deregisterdrivers=true
# 取消JDBC URL前缀
useprefix=true
# 配置记录 Log 例外,可去掉的结果集有error,info,batch,debug,statement,commit,rollback,result,resultset.
excludecategories=info,debug,result,commit,resultset
# 日期格式
dateformat=yyyy-MM-dd HH:mm:ss
# 实际驱动可多个
#driverlist=org.h2.Driver
# 是否开启慢SQL记录
outagedetection=true
# 慢SQL记录标准 2 秒
outagedetectioninterval=2
```

## write a restful API

### define do and dto

- BaseDo

```java
@Data
public class BaseDo {
    @TableId(type = IdType.ASSIGN_UUID)
    private String id;

    @TableLogic
    private Integer isDeleted;

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}
```

- StockDo

```java
@Data
@TableName("stock")
public class StockDo extends BaseDo {
    private String companyId;

    private String name;

    private String description;

    private String logo;

    private String code;

    private double price;

    private double riseFallRatio;

    private BigDecimal marketCapitalization;

    private BigDecimal adjustedNetProfit;

    private BigDecimal peRatio;

    private BigDecimal dividendRatio;
}
```

- BaseDto

```java
@Data
public class BaseDto {
    private String id;

    private String companyId;

    private LocalDateTime createTime;

    private LocalDateTime updateTime;
}
```

- StockDto

```java
@Data
@JsonPropertyOrder({"id", "companyId", "name", "description", "logo", "code", "price", "riseFallRatio", "marketCapitalization", "adjustedNetProfit", "peRatio", "dividendRatio"})
public class StockDto extends BaseDto {
    @NotBlank(message = "name is required")
    private String name;

    private String description;

    private String logo;

    private String code;

    private double price;

    private double riseFallRatio;

    private BigDecimal marketCapitalization;

    private BigDecimal adjustedNetProfit;

    private BigDecimal peRatio;

    private BigDecimal dividendRatio;
}
```

- ConvertUtil (convert do <-> dto)

```java
/**
 * 转换工具类
 *
 * @since 1.0.0
 */
public class ConvertUtils {
    private static Logger logger = LoggerFactory.getLogger(ConvertUtils.class);

    public static <T> T sourceToTarget(Object source, Class<T> target){
        if(source == null){
            return null;
        }
        T targetObject = null;
        try {
            targetObject = target.newInstance();
            BeanUtils.copyProperties(source, targetObject);
        } catch (Exception e) {
            logger.error("convert error ", e);
        }

        return targetObject;
    }

    public static <T> List<T> sourceToTarget(Collection<?> sourceList, Class<T> target){
        if(sourceList == null){
            return null;
        }

        List targetList = new ArrayList<>(sourceList.size());
        try {
            for(Object source : sourceList){
                T targetObject = target.newInstance();
                BeanUtils.copyProperties(source, targetObject);
                targetList.add(targetObject);
            }
        }catch (Exception e){
            logger.error("convert error ", e);
        }

        return targetList;
    }

    public static String arrayToStr(Collection<Long> al, String split) {

        if (al != null && (!al.isEmpty())) {
            StringBuffer sb = new StringBuffer();
            for (Long k : al) {
                sb.append(split).append(k);
            }
            return sb.substring(1);
        }
        return "";
    }
}
```

### define mapper

- StockMapper

```java
public interface StockMapper extends BaseMapper<StockDo> {
    StockDo selectById(String companyId, Integer year);

    List<StockDo> selectAll();
}
```

- StockMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.example.investment.mappers.StockMapper">
    <resultMap id="stockResultMap" type="com.example.investment.dos.StockDo">
        <id property="id" column="id"/>
        <result property="companyId" column="company_id"/>
        <result property="code" column="code"/>
        <result property="price" column="price"/>
        <result property="riseFallRatio" column="rise_fall_ratio" />
        <result property="marketCapitalization" column="market_capitalization" />
        <result property="createTime" column="create_time" />
        <result property="updateTime" column="update_time" />
        <result property="name" column="name"/>
        <result property="logo" column="logo"/>
        <result property="description" column="description"/>
        <result property="adjustedNetProfit" column="adjusted_net_profit"/>
    </resultMap>

    <select id="selectAll" resultMap="stockResultMap">
        SELECT s.*, c.name, c.logo, c.description
        FROM stock s
         LEFT JOIN company c ON s.company_id = c.id;
    </select>

    <select id="selectById" resultMap="stockResultMap">
        SELECT s.*, c.name, c.logo, c.description, f.adjusted_net_profit
        FROM stock s
        LEFT JOIN company c ON s.company_id = c.id
        LEFT JOIN financial f ON s.company_id = f.company_id and f.year = #{year} and f.quarter = 0
        WHERE s.company_id = #{companyId};
    </select>

    <select id="selectAll" resultMap="stockResultMap">
        SELECT s.*, c.name, c.logo, c.description
        FROM stockDo s
                 LEFT JOIN company c ON s.company_id = c.id;
    </select>

    <insert id="insert" parameterType="com.example.investment.dos.StockDo">
        INSERT INTO stock (id, company_id, code, price, rise_fall_ratio, market_capitalization, create_time, update_time)
        VALUES (UUID(), #{companyId}, #{code}, #{price}, #{riseFallRatio}, #{marketCapitalization}, #{createTime}, #{updateTime});
    </insert>
</mapper>
```

### define repository

- Interface

```java
@Repository
public interface StockRepository {
    StockDo selectInfoById(String companyId, Integer year);

    List<StockDo> selectAll();

    void insert(StockDo stockDo);
}
```

- Implements

```java
@Repository
public class StockRepositoryImpl implements StockRepository {
    @Resource
    private CompanyMapper companyMapper;

    @Resource
    private StockMapper stockMapper;

    @Resource
    private DividendRepository dividendRepository;

    @Override
    public StockDo selectInfoById(String companyId, Integer year) {
        StockDo stockDo = stockMapper.selectById(companyId, year);
        BigDecimal peRatio = stockDo.getMarketCapitalization().divide(stockDo.getAdjustedNetProfit(), 2, RoundingMode.HALF_UP);
        BigDecimal dividendAmount = dividendRepository.getDividendAmount(year);
        BigDecimal dividendRatio = dividendAmount.divide(BigDecimal.valueOf(stockDo.getPrice()), 2, RoundingMode.HALF_UP);
        stockDo.setPeRatio(peRatio);
        stockDo.setDividendRatio(dividendRatio);
        return stockDo;
    }

    @Override
    public List<StockDo> selectAll() {
        return stockMapper.selectAll();
    }

    @Override
    public void insert(StockDo stockDo) {
        UUID companyId = UUID.randomUUID();
        CompanyDo companyDo = CompanyDo.builder()
                .name(stockDo.getName())
                .logo(stockDo.getLogo())
                .description(stockDo.getDescription())
                .build();
        companyDo.setId(companyId.toString());
        companyMapper.insert(companyDo);

        stockDo.setCompanyId(companyId.toString());
        stockMapper.insert(stockDo);
    }
}
```

### define service

- Interface

```java
@Service
public interface StockService {
    List<StockDo> getStockList();

    StockDto getStockById(String companyId);

    void addStock(StockDo stockDo);
}
```

- Implements

```java
@Service
public class StockServiceImpl implements StockService {
    @Resource
    private StockRepository stockRepository;

    public List<StockDo> getStockList() {
        return stockRepository.selectAll();
    }

    public StockDto getStockById(String companyId) {
        int lastYear = Year.now().getValue() - 1;
        StockDo stockDo = stockRepository.selectInfoById(companyId, lastYear);
        return ConvertUtils.sourceToTarget(stockDo, StockDto.class);
    }

    public void addStock(StockDo stockDo) {
        stockRepository.insert(stockDo);
    }
}
```

### define controller

- StockController

```java
@RestController
@RequestMapping("/stock")
public class StockController {
    @Resource
    private StockService stockService;

    @Resource
    private FinancialService financialService;

    @Resource
    private DividendService dividendService;

    @GetMapping("/list")
    public List<StockDto> list() {
         List<StockDo> stockDos = stockService.getStockList();
         return ConvertUtils.sourceToTarget(stockDos, StockDto.class);
    }

    @GetMapping("/detail")
    public StockDto detail(@RequestParam String companyId) {
        return stockService.getStockById(companyId);
    }

    @PostMapping("/add")
    public ApiResponse add(@RequestBody @Valid StockDto stockDto) {
        stockService.addStock(ConvertUtils.sourceToTarget(stockDto, StockDo.class));
        return ApiResponse.ok(null);
    }

    @GetMapping("/financial-detail")
    public FinancialDto getFinancialDetail(@RequestParam String companyId, @RequestParam Integer year, @RequestParam Integer quarter) {
        FinancialDo financialDo = financialService.getFinancialDetail(companyId, year, quarter);
        return ConvertUtils.sourceToTarget(financialDo, FinancialDto.class);
    }

    @GetMapping("/financial-chart")
    public List<FinancialDto> getFinancialChart(@RequestParam String companyId, @RequestParam Integer year) {
        List<FinancialDo> financialDoList = financialService.getFinancialChart(companyId, year);
        return ConvertUtils.sourceToTarget(financialDoList, FinancialDto.class);
    }

    @PostMapping("/update-financial")
    public ApiResponse addFinancial(@RequestBody FinancialDo financialDo) {
        financialService.update(financialDo);
        return ApiResponse.ok(null);
    }

    @PostMapping("/update-dividend")
    public ApiResponse updateDividend(@RequestBody DividendDto dividendDto) {
        dividendService.update(ConvertUtils.sourceToTarget(dividendDto, DividendDo.class));
        return ApiResponse.ok(null);
    }

    @PostMapping("/update-revenue-detail")
    public ApiResponse updateRevenueDetail(@RequestBody RevenueDetailDto revenueDetailDto) {
        financialService.updateRevenueDetail(ConvertUtils.sourceToTarget(revenueDetailDto, RevenueDetailDo.class));
        return ApiResponse.ok(null);
    }

    @GetMapping("/revenue-detail")
    public RevenueDetailDto getRevenueDetail(@RequestParam String companyId, @RequestParam Integer year) {
        RevenueDetailDo revenueDetailDo = financialService.getRevenueDetail(companyId, year);
        return ConvertUtils.sourceToTarget(revenueDetailDo, RevenueDetailDto.class);
    }
}
```

## external

### associaiton table query

- do

```java
@Data
public class StockDo extends BaseModel {
    private String companyId;

    private String code;

    private double price;

    private double riseFallRatio;

    private double marketCapitalization;

    private double priceEarningsRatio;

    private double dividendYield;

    @TableField(exist = false)
    private Company company;
}
```

- Mapper

```java
package com.example.investment.mappers;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.investment.models.Stock;

public interface StockMapper extends BaseMapper<Stock> {
    Stock selectByCode(String code);
}
```

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.example.investment.mappers.StockMapper">
    <resultMap id="stockResultMap" type="com.example.investment.models.Stock">
        <id property="id" column="id"/>
        <result property="companyId" column="company_id"/>
        <result property="code" column="code"/>
        <result property="price" column="price"/>
        <result property="riseFallRatio" column="rise_fall_ratio" />
        <result property="marketCapitalization" column="market_capitalization" />
        <result property="priceEarningsRatio" column="price_earnings_ratio" />
        <result property="dividendYield" column="dividend_yield" />
        <result property="createTime" column="create_time" />
        <result property="updateTime" column="update_time" />

        <association property="company" javaType="com.example.investment.models.Company">
            <id property="id" column="id"/>
            <result property="name" column="name"/>
            <result property="logo" column="logo"/>
            <result property="description" column="description"/>
            <result property="createTime" column="create_time" />
            <result property="updateTime" column="update_time" />
        </association>
    </resultMap>

    <select id="selectByCode" resultMap="stockResultMap">
        SELECT s.*, c.name, c.logo, c.description
        FROM stock s
        LEFT JOIN company c ON s.company_id = c.id
        WHERE s.code = #{code};
    </select>
</mapper>
```