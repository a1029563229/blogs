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
  
}
```