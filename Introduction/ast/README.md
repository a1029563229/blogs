# AST（Abstract Syntax Tree，抽象语法树）

在计算机科学中，抽象语法树（Abstract Syntax Tree, AST），是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。之所以说语法是“抽象”的，是因为这里的语法并不会表示出真实语法中出现的每个细节。

ECMAScript 当然也有对应的抽象语法树（下面都称 AST），今天我们就来解析一下 ECMAScript，看看在 AST 中我们的代码将会如何展示。

本文借鉴了 [使用 Acorn 来解析 JavaScript](http://developer.51cto.com/art/201611/521405.htm)，本文同样使用 acorn 来编写一些 Example 帮助理解。

## Node
```ts
interface Node {
  type: string;
  loc: SourceLocation | null;
}
```
符合 Estree 规范的节点用 Node 对象进行标识，Node 对象应该符合上述接口；
- type：节点类型，分别对应了 Javascript 中的各种语法；
- loc：源码的位置信息，有可能为空（null）；

### SourceLocation
```ts
interface SourceLocation {
  source: string | null;
  start: Position;
  end: Position;
}
```
- source：源码片段；
- start：开始位置；
- end：结束位置；

### Position
```ts
interface Position {
  line: number;
  column: number;
}
```
- line：行信息；
- column：列信息；

<br />

## 基础类型

### Expression
```ts
// extends 可理解为“继承”的语法糖，原文为 <: 本文使用 extends 代替
interface Expression extends Node { }
```
表达式节点，数组、对象、判断、循环皆为表达式，在后面会更详细的介绍。

### Pattern
```ts
interface Pattern extends Node { }
```
模式，主要在 ES6 的解构语法中使用，类似于 Identifier。

### Identifier
```ts
interface Identifier extends Expression, Pattern {
  type: "Identifier";
  name: string;
}
```
标识符（如变量名、函数名、属性名），属于表达式的一种，可以理解为声明一个变量/函数/... 的表达式。
- type：类型为 `Identifier`（标识符）类型；
- name：变量名/函数名/...名；

### Literal
```ts
interface Literal extends Expression {
  type: "Literal";
  value: string | boolean | null | number | RegExp;
}
```
字面量，指 1 和 '1' 这种字面量（[] 和 {} 属于表达式，内部实现和字面量不一样）
- type：类型为 `Literal`（字面量）；
- value：值为多种类型，字符串/布尔/空/数字/正则类型，都属于字面量值类型；

#### RegLiteral
```ts
interface RegExpLiteral extends Literal {
  regex: {
    pattern: string;
    flags: string;
  }
}
```

对正则字面量更好的解析。

### Statement
```ts
interface Statement extends Node { }
```
语句节点。

### Program
```ts
interface Program extends Node {
  type: "Program";
  body: [ Statement ]
}
```
`Program ` 一般是作为根节点使用，代表了一颗完整的程序树。
- type：类型为 `Program`；
- body：由多个语句组成的数组；

### Function
```ts
interface Function extends Node {
  id: Identifier | null;
  params: [ Pattern ];
  body: BlockStatement;
}

// Example
acorn.parse('function bar(a) { }');

{
  "type": "FunctionDeclaration", // 类型为 Function
  "id": {
    "type": "Identifier", // id 是标识符类型
    "name": "bar" // 标识符的名称是 bar（函数名为 bar）
  },
  "params": [
    {
      "type": "Identifier", // 参数 a 是标识符类型
      "name": "a" // 标识符的名字是 a（参数名为 a）
    }
  ], 
  "body": {
    "type": "BlockStatement", // 函数内部是一个块语句，当前函数内部为空的一个块语句
    "body": []
  }
}
```
函数声明或函数表达式节点。
- id：函数名，一般为必填（还有匿名函数）；
- params：函数的参数集合；
- body：块语句（在后面会继续提及）；

<br />

## Statement（语句）

### ExpressionStatement
```ts
interface ExpressionStatement extends Statement {
  type: "ExpressionStatement";
  expression: Expression;
}

// Example
acorn.parse('1 + 1')

{
  "type": "ExpressionStatement", // 表达式语句
  "expression": {
    "type": "BinaryExpression", // 一元表达式（后面会提及）
    "left": {
      "type": "Literal",
      "value": 1,
      "raw": "1"
    },
    "operator": "+",
    "right": {
      "type": "Literal",
      "value": 1,
      "raw": "1"
    }
  }
}
```
表达式语句节点，代表的是一个表达式语句。
- type：类型为 `ExpressionStatement`；
- expression：表达式语句的内容（表达式）；

### BlockStatement
```ts
interface BlockStatement extends Statement {
  type: "BlockStatement";
  body: [ Statement ];
}

// Example
acorn.parse('{ 1 + 1 }')

{
  "type": "BlockStatement", // 块语句
  "body": [
    {
      "type": "ExpressionStatement", // 块语句包裹了我们定义的表达式语句；表达式语句只是这个块语句中的一员，块语句可以有多个成员；
      "expression": {
        "type": "BinaryExpression",
        "left": {
          "type": "Literal",
          "value": 1,
          "raw": "1"
        },
        "operator": "+",
        "right": {
          "type": "Literal",
          "value": 1,
          "raw": "1"
        }
      }
    }
  ]
}
```
块语句，可简单理解为用 `{  }` 包裹的语句。
- type：类型为 `BlockStatement`；
- body：内容为语句组成的一个数组；

### EmptyStatement
```ts
interface EmptyStatement extends Statement {
  type: "EmptyStatement";
}

// Example
acorn.parse(';')

{
  "type": "EmptyStatement" // 
}
```
空语句，比如一个单独的 `;` 符号；
- type：类型为 `EmptyStatement`

### DebuggerStatement
```ts
interface DebuggerStatement extends Statement {
    type: "DebuggerStatement";
}

// Example
acorn.parse('debugger;')

{
  "type": "DebuggerStatement"
}
```
debugger 语句。
- type：类型为 `DebuggerStatement`

### WithStatement
```ts
interface WithStatement extends Statement {
  type: 'WithStatement';
  object: Expression;
  body: Statement;
}

// Example
acorn.parse('with(o){ }')

{
  "type": "WithStatement",
  "object": {
    "type": "Identifier", // 使用了 o 的标识符作为内部作用域
    "name": "o"
  },
  "body": {
    "type": "BlockStatement", // 内部语句使用一个块语句
    "body": []
  }
}
```
with 语句，用于设置代码在特定对象中的作用域。
- type：类型为 `WithStatement`；
- object：`with` 语句中的 `()` 中的内容，指定语句的作用域，可以为一个自定义的表达式；
- body：主体，语句类型，可以为块语句 `with(o) { ... }`，也可以为表达式语句 `with(o) a + a`；

### ReturnStatement
```ts
interface ReturnStatement extends Statement {
  type: "ReturnStatement";
  argument: Expression | null;
}

// Example
acorn.parse('function bar() { return true }')

{
  "type": "FunctionDeclaration",
  "id": {
    "type": "Identifier",
    "name": "bar"
  },
  "expression": false,
  "generator": false,
  "async": false,
  "params": [],
  "body": {
    "type": "BlockStatement",
    "body": [
      {
        "type": "ReturnStatement", // 类型
        "argument": { 
          "type": "Literal", // 返回值是字面量类型
          "value": true, // 值为 true
          "raw": "true"
        }
      }
    ]
  }
}
```
返回语句，通常用于返回函数执行结果；
- type：类型为 `ReturnStatement`;
- argument：返回的内容，是一个任意类型的表达式；

### LabeledStatement
```ts
interface LabeledStatement extends Statement {
  type: "LabeledStatement";
  body: Statement;
  label: Identifier;
}

// Example
acorn.parse('labelName:while(true){ }')

{
  "type": "LabeledStatement",
  "body": { // Label 的内容
    "type": "WhileStatement",
    "test": {
      "type": "Literal",
      "value": true,
      "raw": "true"
    },
    "body": {
      "type": "BlockStatement",
      "body": []
    }
  },
  "label": {
    "type": "Identifier", // Label 名称
    "name": "labelName"
  }
}
```
Label 语句，一般用于显式标识 `Statement`；
- type：类型为 `LabeledStatement`；
- body：主体，是 Label 对应的语句；
- label：Label 的名称；

### BreakStatement
```ts
interface BreakStatement extends Statement {
  type: "BreakStatement";
  label: Identifier | null;
}

// Example
acorn.parse('while(true) { break; }')

{
  "type": "WhileStatement",
  "test": {
    "type": "Literal",
    "value": true,
    "raw": "true"
  },
  "body": {
    "type": "BlockStatement",
    "body": [
      {
        "type": "BreakStatement",
        "label": {} // 这个 break 没有 label，则 break 对应的语句需要向上级查询
      }
    ]
  }
}
```
break 语句，通常用来“跳出”循环；
- type：类型为 `BreakStatement`；
- label：如果需要指定“跳出”的语句，则需要指定 `label` 属性为 `LabeledStatement` 中的 `label` 属性（`Identifier`）；

### ContinueStatement
```ts
interface ContinueStatement extends Statement { 
    type: "ContinueStatement"; 
    label: Identifier | null; 
}
```
continue 语句，通常用来“跳出”循环中的一个迭代；
- type：类型为 `ContinueStatement`；
- label：如果需要指定“跳出”的语句，则需要指定 `label` 属性为 `LabeledStatement` 中的 `label` 属性（`Identifier`）；

### IfStatement
```ts
interface IfStatement extends Statement {
  type: "IfStatement";
  test: Expression;
  consequent: Statement;
  alternate: Statement | null;
}

// Example
acorn.parse('if (true) {} else if(false) a++')

// 分析一个比较经典的语法，else if
{
  "type": "IfStatement",
  "test": {
    "type": "Literal", // 判断条件为一个字面量
    "value": true,
    "raw": "true"
  },
  "consequent": {
    "type": "BlockStatement", // 如果判断为 true 则执行这个块语句
    "body": []
  },
  "alternate": {
    "type": "IfStatement", // else 语句是一个 IfStatement 可以得出 else if () === else { if () }
    "test": {
      "type": "Literal",
      "value": false,
      "raw": "false"
    },
    "consequent": {
      "type": "ExpressionStatement",
      "expression": {
        "type": "UpdateExpression", // 最终满足条件后执行了一个 UpdateExpression
        "operator": "++",
        "prefix": false,
        "argument": {
          "type": "Identifier",
          "name": "a"
        }
      }
    },
    "alternate": {} // 第二个 IfStatement 没有 else 语句
  }
}
```

if 语句，满足 `test` 条件执行 `consequent` 语句，不满足条件则执行 `alternate` 语句。
- type：类型为 `IfStatement`;
- test：判断条件，也就是 `if (expression)` 括号中的内容；
- consequent：条件为 `true` 时执行的语句；
- alternate：条件为 `false` 时执行的语句，也可以设置为另一个 `IfStatement`，就变成了 `else if` 语法；

### SwitchStatement
```ts
interface SwitchStatement extends Statement {
  type: "SwitchStatement";
  discriminant: Expression;
  cases: [ SwitchCase ]
}

interface SwitchCase extends Node {
  type: "SwitchCase";
  test: Expression | null;
  consequent: [ Statement ];
}

// Example
acorn.parse('switch(a) { case 1: a = 2; break; }');

{
  "type": "SwitchStatement", // 类型
  "discriminant": {
    "type": "Identifier", // 主体是个标识符，条件成立则进入 cases 处理逻辑
    "name": "a"
  },
  "cases": [
    {
      "type": "SwitchCase",
      "consequent": [
        {
          "type": "ExpressionStatement", // 判断条件成立执行第一个 ExpressionStatement
          "expression": {
            "type": "AssignmentExpression",
            "operator": "=",
            "left": {
              "type": "Identifier",
              "name": "a"
            },
            "right": {
              "type": "Literal",
              "value": 2,
              "raw": "2"
            }
          }
        },
        {
          "type": "BreakStatement", // 第二个语句为 Break 语句
          "label": {}
        }
      ],
      "test": {
        "type": "Literal", // 判断条件为字面量
        "value": 1,
        "raw": "1"
      }
    }
  ]
}
```

Switch 语句
- type：类型为 `SwitchStatement`；
- discriminant：断言符，是 `switch(...)` 括号中的内容；
- cases：一个 `SwitchCase` 构成的数组；

### ThrowStatement
```ts
interface ThrowStatement extends Statement { 
    type: "ThrowStatement"; 
    argument: Expression; 
}

// Example
acorn.parse('throw new Error()');

{
  "type": "ThrowStatement",
  "argument": {
    "type": "NewExpression", // new 表达式
    "callee": {
      "type": "Identifier",
      "name": "Error"
    },
    "arguments": []
  }
}
```
throw 语句，一般用于抛出错误；
- type：类型为 `ThrowStatement`；
- argument：`throw` 后面的表达式，需要抛出的内容；

### TryStatement
```ts
interface TryStatement extends Statement {
  type: "TryStatement";
  block: BlockStatement;
  handler: CatchClause | null;
  finalizer: BlockStatement | null;
}

interface CatchClause extends Node { 
    type: "CatchClause"; 
    param: Pattern; 
    body: BlockStatement; 
}  

// Example
acorn.parse('try { throw new Error() } catch (error) {  } finally {  } ');

{
  "type": "TryStatement",
  "block": { // try 的块语句
    "type": "BlockStatement",
    "body": [
      {
        "type": "ThrowStatement",
        "argument": {
          "type": "NewExpression",
          "callee": {
            "type": "Identifier",
            "name": "Error"
          },
          "arguments": []
        }
      }
    ]
  },
  "handler": {
    "type": "CatchClause", // catch 语句
    "param": {
      "type": "Identifier", 
      "name": "error" // catch 语句参数的标识符名为 error
    },
    "body": {
      "type": "BlockStatement", // catch 语句的主体
      "body": []
    }
  },
  "finalizer": { // finally 语句
    "type": "BlockStatement", // finally 语句的主体
    "body": []
  }
}
```
TryStatement 为 `try() { ... } catch(param) { ... }` 语句；
- type：类型为 `TryStatement`
- block：`try` 语句的主体，是一个块语句；
- handler：`catch` 语句的主体，包含一个参数；
- finalizer：`finally` 语句主体；

### WhileStatement
```ts
interface WhileStatement extends Statement {
  type: "WhileStatement";
  test: Expression;
  body: BlockStatement;
}

// Example
acorn.parse('while(expression) {}');

{
  "type": "WhileStatement",
  "test": {
    "type": "Identifier",
    "name": "expression"
  },
  "body": {
    "type": "BlockStatement",
    "body": []
  }
}
```
`while` 语句，通常用于条件循环。（还有与该节点类似的 `DoWhileStatement`）
- type：类型为 `WhileStatement`；
- test：`while(expression) {}` 中的 `expression`，条件满足时将进入循环主体；
- body：循环主体，为 `BlockStatement`；

### ForStatement
```ts
interface ForStatement extends Statement {
  type: "ForStatement";
  init: VariableDeclaration | Expression | null;
  test: Expression | null;
  update: Expression | null;
  body: BlockStatement;
}

// Example
acorn.parse('for (let i = 0; i <= 10; i++) { }');

{
  "type": "ForStatement",
  "init": {
    "type": "VariableDeclaration", // 初始值是一个 VariableDeclaration （变量声明）
    "declarations": [
      {
        "type": "VariableDeclarator",
        "id": {
          "type": "Identifier", // 变量名为 i
          "name": "i"
        },
        "init": {
          "type": "Literal", // 初始值为 0
          "value": 0,
          "raw": "0"
        }
      }
    ],
    "kind": "let"
  },
  "test": {
    "type": "BinaryExpression", // 判断条件为一个表达式
    "left": {
      "type": "Identifier", // 表达式左边是 变量 i
      "name": "i"
    },
    "operator": "<=", // 操作符是 <=
    "right": {
      "type": "Literal", // 表达式右边是 字面量是 10
      "value": 10,
      "raw": "10"
    }
  },
  "update": {
    "type": "UpdateExpression", // 更新语句是一个 UpdateExpression
    "operator": "++",
    "prefix": false,
    "argument": {
      "type": "Identifier",
      "name": "i"
    }
  },
  "body": {
    "type": "BlockStatement", // 循环主体
    "body": []
  }
}
```
`ForStatement` 表示的是最常用的 `for (init; test; update;) { ... }` 循环；
- type：类型为 `ForStatement`；
- init：循环中的初始值；
- test：循环的判断条件，一般结合 `init` 中定义的变量进行判断；
- update：每次循环结束后的更新函数，一般用于更新 `test` 中使用到的变量；
- body：循环主体；

### ForInStatement
```ts
interface ForInStatement extends Statement {
  type: "ForInStatement";
  left: VariableDeclaration | Pattern;
  right: Expression;
  body: Statement;
}

// Example
{
  "type": "ForInStatement",
  "left": {
    "type": "VariableDeclaration", // 变量声明
    "declarations": [
      {
        "type": "VariableDeclarator",
        "id": {
          "type": "Identifier",
          "name": "key" // 变量名为 key
        },
        "init": {}
      }
    ],
    "kind": "let" // 声明类型为 let
  },
  "right": {
    "type": "Identifier", // 右边是一个标识符
    "name": "obj"
  },
  "body": {
    "type": "BlockStatement",
    "body": []
  }
}
```
`for in` 循环，一般用于遍历一个对象。
- type：类型为 `ForStatement`；
- left：左边一般是一个变量声明，也可以是一个解构函数，比如 `for(let { a, b } in obj) {  }`；
- right：右边是一个表达式，一般为变量标识符，一个对象；

## Declaration
```ts
interface Declaration extends Statement { }
```
声明语句节点。

### FunctionDeclaration
```ts
interface FunctionDeclaration extends Function, Declaration {
  type: "FunctionDeclaration";
  id: Identifier;
}

// Example
acorn.parse('function run() {  }');

{
  "type": "FunctionDeclaration", // 函数声明语句
  "id": {
    "type": "Identifier",
    "name": "run" // 标识符为 run
  },
  "params": [], // 参数为空
  "body": {
    "type": "BlockStatement", // 函数主体
    "body": []
  }
}
```
- type：类型为 `FunctionDeclaration`；
- id：函数名，不能为空；

### VariableDeclaration
```ts
interface VariableDeclaration extends Declaration {
  type: "VariableDeclaration";
  declarations: [ VariableDeclarator ];
  kind: "var" | "const" | "let";
}

interface VariableDeclarator <: Node { 
    type: "VariableDeclarator"; 
    id: Pattern; 
    init: Expression | null; 
}

// Example
{
  "type": "VariableDeclaration",
  "declarations": [
    {
      "type": "VariableDeclarator",
      "id": {
        "type": "Identifier",
        "name": "a" // 变量名为 a
      },
      "init": {
        "type": "Literal",
        "value": 1,
        "raw": "1" // 变量值为 1
      }
    },
    {
      "type": "VariableDeclarator",
      "id": {
        "type": "Identifier",
        "name": "b" // 变量名为 b
      },
      "init": {
        "type": "Literal",
        "value": 2,
        "raw": "2" // 变量值为 2
      }
    }
  ],
  "kind": "const" // 声明类型为 const
}
```
变量声明语句。
- type：类型为 `VariableDeclaration`；
- declarations：变量声明数组，可以同时声明多个变量；
- kind：声明类型，可以是 `var | let | const` 中的一种；

## Expression
```ts
interface Expression extends Node { }
```
表达式节点。

### ThisExpression
```ts
interface ThisExpression extends Expression {
  type: "ThisExpression";
}

// Example
acorn.parse('this');

{
  "type": "ExpressionStatement",
  "expression": {
    "type": "ThisExpression"
  }
}
```
表示 this。

### ArrayExpression
```ts
interface ArrayExpression extends Expression {
  type: "ArrayExpression";
  elements: [ Expression | null ];
}

// Example
acorn.parse('[1, a, 1 === 1]');

{
  "type": "ExpressionStatement",
  "expression": {
    "type": "ArrayExpression",
    "elements": [
      {
        "type": "Literal", // 第一个元素是字面量
        "value": 1,
        "raw": "1"
      },
      {
        "type": "Identifier", // 第二个元素是变量标识符
        "name": "a"
      },
      {
        "type": "BinaryExpression", // 第三个元素是表达式
        "left": {
          "type": "Literal",
          "value": 1,
          "raw": "1"
        },
        "operator": "===",
        "right": {
          "type": "Literal",
          "value": 1,
          "raw": "1"
        }
      }
    ]
  }
}
```
数组表达式，一般用于直接创建一个数组。
- type: 类型为 `ArrayExpression`；
- elements：数组元素集合，元素为表达式类型；

### ObjectExpression
```ts
interface ObjectExpression extends Expression {
  type: "ObjectExpression";
  properties: [ Property ];
}

interface Property extends Node {
  type: "Property";
  key:  Literal | Identifier;
  value: Expression;
  kind: "init" | "get" | "set";
}

interface FunctionExpression <: Function, Expression { 
    type: "FunctionExpression"; 
}
// Example
acorn.parse('const obj = {a: 1, 2: b, get c() { }}');

{
  "type": "VariableDeclaration", // 声明语句
  "declarations": [
    {
      "type": "VariableDeclarator",
      "id": {
        "type": "Identifier",
        "name": "obj" // 变量名为 obj
      },
      "init": {
        "type": "ObjectExpression", // 值为对象表达式
        "properties": [
          {
            "type": "Property",
            "method": false,
            "shorthand": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "name": "a" // key 值为 a
            },
            "value": {
              "type": "Literal",
              "value": 1, // 值为 1
              "raw": "1"
            },
            "kind": "init" // 类型为初始化
          },
          {
            "type": "Property",
            "method": false,
            "shorthand": false,
            "computed": false,
            "key": {
              "type": "Literal",
              "value": 2, // key 为 字面量 2
              "raw": "2"
            },
            "value": {
              "type": "Identifier",
              "name": "b" // 值为变量标识符 b
            },
            "kind": "init" // 类型为初始化
          },
          {
            "type": "Property",
            "method": false,
            "shorthand": false,
            "computed": false,
            "key": {
              "type": "Identifier", // key 为变量标识符 c
              "name": "c"
            },
            "kind": "get", // 类型为 getter
            "value": {
              "type": "FunctionExpression", // 值是一个函数表达式
              "id": {},
              "expression": false,
              "generator": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement", // 函数主体
                "body": []
              }
            }
          }
        ]
      }
    }
  ],
  "kind": "const"
}
```
对象表达式，一般用于创建对象。
- type：类型为 `ObjectExpression`；
- properties：键值对（对象属性）集合；

