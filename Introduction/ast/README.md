# AST（Abstract Syntax Tree，抽象语法树）

在计算机科学中，抽象语法树（Abstract Syntax Tree, AST），是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。之所以说语法是“抽象”的，是因为这里的语法并不会表示出真实语法中出现的每个细节。

ECMAScript 当然也有对应的抽象语法树（下面都称 AST），今天我们就来解析一下 ECMAScript，看看在 AST 中我们的代码将会如何展示。

本文借鉴了 [使用 Acorn 来解析 JavaScript](http://developer.51cto.com/art/201611/521405.htm)，本文同样使用 acorn 来编写一些 Demo 帮助理解。

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
// <: 可理解为“继承”的语法糖
interface Expression <: Node { }
```
表达式节点，数组、对象、判断、循环皆为表达式，在后面会更详细的介绍。

### Pattern
```ts
interface Pattern <: Node { }
```
模式，主要在 ES6 的解构语法中使用，类似于 Identifier。

### Identifier
```ts
interface Identifier <: Expression, Pattern {
  type: "Identifier";
  name: string;
}
```
标识符（如变量名、函数名、属性名），属于表达式的一种，可以理解为声明一个变量/函数/... 的表达式。
- type：类型为标识符类型；
- name：变量名/函数名/...名；

### Literal
```ts
interface Literal <: Expression {
  type: "Literal";
  value: string | boolean | null | number | RegExp;
}
```
字面量，指 1 和 '1' 这种字面量（[] 和 {} 属于表达式，内部实现和字面量不一样）
- type：类型为字面量；
- value：值为多种类型，字符串/布尔/空/数字/正则类型，都属于字面量值类型；

#### RegLiteral
```ts
interface RegExpLiteral <: Literal {
  regex: {
    pattern: string;
    flags: string;
  }
}
```

对正则字面量更好的解析。

### Statement
```ts
interface Statement <: Node { }
```
语句节点。

### Program
```ts
interface Program <: Node {
  type: "Program";
  body: [ Statement ]
}
```
`Program ` 一般是作为根节点使用，代表了一颗完整的程序树。
- type：类型为 "Program"；
- body：由多个语句组成的数组；

### Function
```ts
interface Function <: Node {
  id: Identifier | null;
  params: [ Pattern ];
  body: BlockStatement;
}

// Demo
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