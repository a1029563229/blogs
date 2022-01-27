# YII 初体验 —— 搭建一个简单的 Todo List 系统

`Yii` 是一个高性能，基于组件的 PHP 框架，用于快速开发现代 Web 应用程序。

今天，我本着体验 `Yii2` 的想法，准备使用 `Yii2` 从 0 到 1 来搭建一个 `Todo List`，并完成以下功能：

1. 可以基于某个 `key` 创建 `Todo Item`，然后根据 `key` 查询对应的 `Todo Item`。
2. 可以置顶、完成、删除单条 `Todo Item`，置顶的 `Todo Item` 将排列在最前面，完成的 `Todo Item` 将排列在最后面。

## 初始化 YII 仓库

使用下面的命令即可初始化一个 `YII` 的仓库。

```bash
composer create-project --prefer-dist yiisoft/yii2-app-basic basic
```

但是，我的 `mac` 通过这个方法老是连不上网络，安装某些依赖失败，所以这里选择第二种方式。（如下）

在 [yiiframework](https://www.yiiframework.com/download) 下载归档文件，然后解压到你要放置的项目目录中。

在下载解压完成后，需要先修改 `config/web.php` 文件，给 `cookieValidationKey` 配置项添加一个密钥（随便输入一个值就可以），以便项目能够正常启动。

在项目初始化完成以后，我们使用下面这个命令运行项目吧。

```bash
php yii serve --port=8888
```

然后我们打开 [http://localhost:8888](http://localhost:8888)，看到我们的页面已经成功启动啦！（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common3/Xnip2022-01-25_14-41-45.jpg)

## 初始化数据模型

接下来，我们来初始化我们的数据模型。

我们需要创建的字段有下面这些：

- id：自增主键；
- key：Todo 的 key；
- title：Todo 的标题；
- is_completed：Todo 是否完成；
- is_top：Todo 是否置顶；
- is_deleted：Todo 是否删除；

而上面这些字段中，我们最多的场景是通过 `key` 来捞出相关的 `Todo Item`，所以应该给 `key` 建立一个普通索引。

综上，我们的 `sql` 语句应该是这样的：

```sql
CREATE TABLE IF NOT EXISTS `todos` (
    `id` int PRIMARY KEY AUTO_INCREMENT,
    `key` varchar(64) NOT NULL DEFAULT '',
    `title` varchar(64) NOT NULL DEFAULT '',
    `is_top` tinyint(1) NOT NULL DEFAULT 0,
    `is_completed` tinyint(1) NOT NULL DEFAULT 0,
    `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
    index `key`(`key`)
) engine=InnoDB CHARSET=utf8;
```

在数据库中执行该条 `SQL`，创建对应的数据表。

然后，我们还可以通过下面这条语句查看我们创建的索引。

```bash
SHOW INDEX FROM `todos`;
```

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common3/Xnip2022-01-25_15-22-16.jpg)

## 处理 Todo 业务逻辑

在数据表创建成功后，我们就准备开始写 `Todo` 相关的业务逻辑了。

在此之前，我们还需要做一些 `Yii` 的配置初始化工作。

### 初始化 Yii 配置

首先，我们的 `php` 服务需要连接数据库，所以你需要先配置你的数据库连接，也就是 `config/db.php`：

- 数据库配置
  
```php
<?php

return [
    'class' => 'yii\db\Connection',
    'dsn' => 'mysql:host=[mysql服务器地址];port=[mysql端口];dbname=[数据库名称]',
    'username' => '[数据库用户名]',
    'password' => '[数据库密码]',
    'charset' => 'utf8',
    'attributes' => [
        // 查询时将 int 类型按原类型返回
        PDO::ATTR_STRINGIFY_FETCHES => false,
        PDO::ATTR_EMULATE_PREPARES => false
    ]
];
```

- URL 美化配置

然后，我们再来配置一下 `URL` 美化，这样就可以按照标准的 `restful` 风格进行访问了，调整 `config/web.php` 中的 `urlManager` 即可。（如下）

```php
'urlManager' => [
  'enablePrettyUrl' => true,
  'enableStrictParsing' => false,
  'showScriptName' => false,
  'rules' => [
  ],
],
```

- JSON 入参配置

然后，我们还需要修改一下 `request` 的配置，以便接受 `application/json` 的入参。

```php
'components' => [
    ...
    'request' => [
        'parsers' => [
            'application/json' => 'yii\web\JsonParser',
        ]
    ],
    ...
]
```

修改完了配置后，可以重启一下你的项目。

### 创建 `TodoModel` + `TodoRepository` + `TodoService` + `TodoController`

我们先来创建 `Todo` 的数据实体类 —— `TodoModel`，这个模型将会贯穿 `Todo List` 的整个生命周期。

```php
<?php
namespace app\models;

use Yii;
use Yii\base\Model;

class TodoModel extends Model {
    public $id;
    public $key;
    public $title;
    public $is_top;
    public $is_completed;
    public $is_deleted;
}
```

然后，我们创建 `TodoRepository`，用于数据持久化。 —— SQL 写在这里。

```php
<?php

namespace app\repositories;

use app\models\TodoModel;

class TodoRepository {
    public static function selectAll(TodoModel $todo) {

    }

    public static function insertOne(TodoModel $todo) {

    }

    public static function deleteOne(TodoModel $todo) {

    }

    public static function updateOne(TodoModel $todo) {

    }
}
```

接下来，我们来创建 `TodoService`，用于处理业务逻辑。 —— 所有业务逻辑放在这里。

```php
<?php

namespace app\services;

use app\models\TodoModel;
use app\repositories\TodoRepository;

class TodoService {
    public function getAllTodo(TodoModel $model) {
        return TodoRepository::selectAll($model);
    }

    public function addTodo(TodoModel $model) {
        
    }

    public function topTodo(TodoModel $model) {

    }

    public function completeTodo(TodoModel $model) {

    }

    public function deleteTodo(TodoModel $model) {

    }
}
```

最后，我们创建 `TodoController`，用于控制业务流程和处理接口请求。 —— 与客户端交互的逻辑放在这里。

```php
<?php

namespace app\controllers;

use Yii;

use yii\rest\ActiveController;
use yii\web\Response;
use app\services\TodoService;
use app\models\TodoModel;

class TodoController extends ActiveController
{
    public TodoService $todoService;

    public function __construct($id, $module, $config = [])
    {
        parent::__construct($id, $module, $config);
        this.$todoService = new TodoService();
    }

    // 将响应数据转成 JSON
    public function behaviors()
    {
        return [
            [
                'class' => \yii\filters\ContentNegotiator::className(),
                'only' => ['index', 'view'],
                'formats' => [
                    'application/json' => \yii\web\Response::FORMAT_JSON,
                ],
            ],
        ];
    }

    public function actionGetTodoList() {
      
    }
}
```

将基础的 `TodoModel` + `TodoRepository` + `TodoService` + `TodoController`，也就是 `MVC` 模型准备好了以后，我们就准备开始添加真实有效的业务逻辑了。

### 查询对应 `key` 的 `Todo List`

我们现在准备根据 `key` 来查询对应的 `todo` 列表。

我们首先来编辑 `TodoRepository` 的 `selectAll`，将对应的 `SQL` 查询逻辑写好。

```php
class TodoRepository {
  /**
   * @throws \yii\db\Exception
   */
  public static function selectAll(TodoModel $todo) {
    $db = Yii::$app->db;
    // 组装 SQL 语句，查询对应 key 且未删除的数据
    // 查询的数据按照 `是否完成` 升序排列，按照 `是否置顶` 降序排列
    $sql = "SELECT * 
            FROM `todos`
            WHERE `key` = :code AND `is_deleted` = 0
            ORDER BY is_completed ASC, is_top DESC";
    return $db->createCommand($sql)->bindValue(':code', $todo->key)->queryAll();
  }
  //...
}
```

在 `TodoRepository` 的 `SQL` 语句编辑完成后，我们可以在数据库中执行试试。（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common3/Xnip2022-01-26_16-36-30.jpg)

从上图可以看出，该 `SQL` 按我们预想的运行 —— 使用 `key` 作为索引，只检索了 4 条数据（此时数据库有 10 条数据）。

> 这条 `SQL` 还涉及到了 `Using filesort`，我还没有想到比较好的优化方案，大家可以尝试一下优化这条 SQL。

我们来编辑 `TodoController` 的 `actionGetTodoList` 方法即可（`TodoService` 不需要修改）。

```php
public function actionGetTodoList() {
    $model = new TodoModel();
    $params = Yii::$app->request->get();
    // 取出 query 参数中的 key 字段
    $model->key = $params['key'];
    return $this->todoService->getAllTodo($model);
}
```

在逻辑补充完后，打开页面 `http://localhost:8888/todo/get-todo-list?key=test` 验证一下效果吧。（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common3/Xnip2022-01-26_16-34-32.jpg)

从上图可以看出，数据按照我们预期的筛选和排序返回了！

### 补全剩余业务逻辑 —— 增删改

接下来，就是依次将 `增删改` 的逻辑加上就好了，这应该是最简单也是最经典的 `CRUD` 了。（如下）

- `TodoModel.php`

```php
<?php

namespace app\models;

use Yii;
use yii\base\Model;

class TodoModel extends Model
{
    public $id;
    public $key = '';
    public $title = '';
    public $is_top = 0;
    public $is_completed = 0;
    public $is_deleted = 0;

    public function rules()
    {
        return [
            [['id', 'key', 'title'], 'required']
        ];
    }
}
```

- `TodoRepository.php`

```php
<?php

namespace app\repositories;

use Yii;
use app\models\TodoModel;

class TodoRepository
{
    /**
     * @throws \yii\db\Exception
     */
    public static function selectAll(TodoModel $todo)
    {
        $db = Yii::$app->db;
        // 组装 SQL 语句，查询对应 key 且未删除的数据
        // 查询的数据按照 `是否完成` 升序排列，按照 `是否置顶` 降序排列
        $sql = "SELECT * 
                FROM `todos`
                WHERE `key` = :code AND `is_deleted` = 0
                ORDER BY is_completed ASC, is_top DESC";
        return $db->createCommand($sql)->bindValue(':code', $todo->key)->queryAll();
    }

    /**
     * @throws \yii\db\Exception
     */
    public static function insertOne(TodoModel $todo)
    {
        $db = Yii::$app->db;
        return $db->createCommand()->insert('todos', $todo)->execute();
    }

    /**
     * @throws \yii\db\Exception
     */
    public static function updateOne(array $todoData, string $id)
    {
        $db = Yii::$app->db;
        return $db
                ->createCommand()
                ->update('todos', $todoData, "id = :id")
                ->bindValue("id", $id)
                ->execute();
    }
}
```

- `TodoService.php`

```php
<?php

namespace app\services;

use app\models\TodoModel;
use app\repositories\TodoRepository;

class TodoService
{
    public function getAllTodo(TodoModel $model)
    {
        return TodoRepository::selectAll($model);
    }

    public function addTodo(TodoModel $model)
    {
        return TodoRepository::insertOne($model);
    }

    public function topTodo(TodoModel $model)
    {
        return TodoRepository::updateOne([
            'is_top' => 1
        ], $model->id);
    }

    public function completeTodo(TodoModel $model)
    {
        return TodoRepository::updateOne([
            'is_completed' => 1
        ], $model->id);
    }

    public function deleteTodo(TodoModel $model)
    {
        return TodoRepository::updateOne([
            'is_deleted' => 1
        ], $model->id);
    }
}
```

- `TodoController.php`

```php
<?php

namespace app\controllers;

use Yii;

use yii\web\Controller;
use app\services\TodoService;
use app\models\TodoModel;

class TodoController extends Controller
{
    public $todoService;
    public $enableCsrfValidation = false;

    public function __construct($id, $module, $config = [])
    {
        parent::__construct($id, $module, $config);
        $this->todoService = new TodoService();
    }

    // 将响应数据转成 JSON
    public function behaviors()
    {
        return [
            [
                'class' => \yii\filters\ContentNegotiator::className(),
                'formats' => [
                    'application/json' => \yii\web\Response::FORMAT_JSON,
                ],
            ],
        ];
    }

    public function actionGetTodoList()
    {
        $model = new TodoModel();
        $params = Yii::$app->request->get();
        // 取出 query 参数中的 key 字段
        $model->key = $params['key'];
        return [
            'code' => 0,
            'data' => $this->todoService->getAllTodo($model)
        ];
    }

    public function actionAdd()
    {
        $model = new TodoModel();
        $params = Yii::$app->request->post();
        $model->key = $params['key'];
        $model->title = $params['title'];
        $this->todoService->addTodo($model);
        return ['code' => 0];
    }

    public function actionTop()
    {
        $model = new TodoModel();
        $params = Yii::$app->request->post();
        $model->id = $params['id'];
        $this->todoService->topTodo($model);
        return ['code' => 0];
    }

    public function actionComplete()
    {
        $model = new TodoModel();
        $params = Yii::$app->request->post();
        $model->id = $params['id'];
        $this->todoService->completeTodo($model);
        return ['code' => 0];
    }

    public function actionDelete()
    {
        $model = new TodoModel();
        $params = Yii::$app->request->post();
        $model->id = $params['id'];
        $this->todoService->deleteTodo($model);
        return ['code' => 0];
    }
}
```

如此一来，我们的 `Todo List` 系统就基本完成了，它已经完成了下面这些功能：

1. 可以基于某个 `key` 创建 `Todo Item`，然后根据 `key` 查询对应的 `Todo Item`。
2. 可以置顶、完成、删除单条 `Todo Item`，置顶的 `Todo Item` 将排列在最前面，完成的 `Todo Item` 将排列在最后面。

当然，我们还需要考虑参数验证、大数据查询的优化问题、更简洁的参数绑定等等问题，这里就不做展开了，可能会以一期新的文章进行讲解。

## 部署应用

现在，我们来将我们的 `Todo List` 系统部署到线上吧。

### 启动 Docker 容器

`Yii2` 的部署非常简单，因为 Yii 内置了 `docker-compose` 配置文件。

所以，我们只需要在文件夹内运行 `docker-compose up -d` 就可以启动一个 docker 服务了。（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common3/Xnip2022-01-27_08-56-07.jpg)

现在，我们修改一下 `docker-compose.yml` 的端口映射改一下，将其改成一个比较特殊的端口 —— `9999`。

```yml
ports:
   - '9999:80'
```

然后，我们在我们的服务器（我的服务器是阿里云 ECS）内，把对应的仓库代码拉下来，运行 `docker-compose up -d` 启动容器即可。

### 配置 Nginx 

服务启动后，我们需要配置 `nginx`，将我们指定域名的请求 `hacker.jt-gmall.com` 转发到 `9999` 端口。

然后，在 `nginx` 上加上跨域头，允许前端跨域请求（最后几行）。

```nginx
server {
    listen 443;
    server_name hacker.jt-gmall.com;
    ssl on;
    ssl_certificate /https/hacker.jt-gmall.com.pem;
    ssl_certificate_key /https/hacker.jt-gmall.com.key;
    ssl_session_timeout 5m;
    ssl_ciphers ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP;
    ssl_protocols SSLv2 SSLv3 TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    location / {
      index index.html index.jsp;
      client_max_body_size 300m;
      client_body_buffer_size 128k;
      proxy_connect_timeout 600;
      proxy_read_timeout 600;
      proxy_send_timeout 600;
      proxy_buffer_size 64k;
      proxy_buffers 4 64k;
      proxy_busy_buffers_size 64k;
      proxy_temp_file_write_size 64k;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header Host $host;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_http_version 1.1;
      proxy_pass http://127.0.0.1:9999;

      add_header "Access-Control-Allow-Origin" "*"; # 全局变量获得当前请求origin，带cookie的请求不支持*
      add_header "Access-Control-Allow-Methods" "*"; # 允许请求方法
      add_header "Access-Control-Allow-Headers" "*"; # 允许请求的 header
      # 如果是 OPTIONS 请求，则返回 204
      if ($request_method = 'OPTIONS') {
        return 204;
      }
    }
  }
```

### 安装依赖

在服务启动并且配置好了 `nginx` 后进行访问，可能会出现下图这个错误。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common3/Xnip2022-01-27_09-16-59.jpg)

这是因为 `Git` 版本管理中，会忽略 `Yii` 的 `vendor` 目录，我们只需要使用 `composer` 将依赖重新安装一遍即可，运行下面这个命令。

```bash
composer update
composer install
```

> 由于 `config/db.php` 中包含了数据库连接信息，我也没有放到 `Git` 仓库中。
> 
> 如果你在使用我的 `demo`，也请将这个文件补齐。

然后，我们打开浏览器，输入 [https://hacker.jt-gmall.com/todo/get-todo-list?key=test](https://hacker.jt-gmall.com/todo/get-todo-list?key=test) 看看效果吧！（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common3/Xnip2022-01-27_16-02-05.jpg)

大功告成啦！

## 小结

在本篇文章中，我针对自己使用 `Yii` 搭建一个基础 `Todo List` 服务的体验，写了一篇文章。

实际操作下来，发现使用 `Yii` 搭建一个服务端业务站点还是比较简单的，经典的 `MVC` 模式也比较浅显易懂。

在后续的文章里，我可能会针对 `Yii` 的进阶使用再进行归纳总结。

最后附上本次体验的 [Demo 地址](https://github.com/a1029563229/todo-list-backend)。

## 最后一件事

如果您已经看到这里了，希望您还是点个赞再走吧~

您的点赞是对作者的最大鼓励，也可以让更多人看到本篇文章！

如果觉得本文对您有帮助，请帮忙在 [github](https://github.com/a1029563229/Blogs) 上点亮 `star` 鼓励一下吧！