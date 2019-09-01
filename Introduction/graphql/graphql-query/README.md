# GraphQL 查询字符串的组装
GraphQL 既是一种用于 API 的查询语言也是一个满足你数据查询的运行时。 GraphQL 对你的 API 中的数据提供了一套易于理解的完整描述，使得客户端能够准确地获得它需要的数据，而且没有任何冗余，也让 API 更容易地随着时间推移而演进，还能用于构建强大的开发者工具。

我们今天来讲解一下如何进行 graphql 查询字符串的组装，在 Javascript 中，graphql 查询字符串的格式如下
```js
`{ list { id name description } }`
```

当查询类型比较少时，我们还是可以通过手写来维持，但是一旦查询的复杂度开始上升时，手写字符串查询会导致以下几个问题：
- 难以维护；
- 难以排查问题；
- 没有结构化，容易出错；

而 `npm` 提供了这么一个小工具，叫做 `shadows-graphql-query`，我们通过 `npm install` 进行安装，然后我们按照下面的方法使用
```js
const gql_query = require('shadows-graphql-query');
const query = gql_query({
  categoryList: ['_id', 'level', 'title', 'description', 'post'],
  product: ['_id', 'level', 'title', 'description', 'post']
});

console.log(query); 
/**
  * 最后解析出来的查询字符串是这样的
  { categoryList { _id level title description post }  product { _id level title description post } }
*/
```

该插件还支持嵌套和批量解析，可以充分满足结构化查询的需求。

喜欢的话给一颗 star 吧（[GraphQL 查询字符串组装](https://github.com/a1029563229/plugins/tree/master/src/graphql/graphql-query) 属于原创）。

Star 超过 10 颗的话，作者将会提供一套完整的 GraphQL 前后端架构方案。