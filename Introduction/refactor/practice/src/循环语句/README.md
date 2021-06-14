## 循环语句（Loop）

```js
function acquireCityAreaCodeData(input, country) {
  const lines = input.split('\n');
  let firstLine = true;
  const result = [];
  for (const line of lines) {
    if (firstLine) {
      firstLine = false;
      continue;
    }
    if (line.trim() === '') continue;
    const record = line.split(',');
    if (record[1].trim() === country) {
      result.push({ city: record[0].trim(), phone: record[2].trim() });
    }
  }
  return result;
}
```

“嗯，让我看看这个函数，看名字似乎是获取城市区号信息，我想了解一下这个函数的内部实现。嗯，它的实现，先是忽略了第一行，然后忽略了为空的字符串，然后将字符串以逗号切割，然后...”

“虽然有点绕，但花些时间还是能看出来实现逻辑的。”

“从最早的编程语言开始，循环就一直是程序设计的核心要素。但我感觉如今循环已经有点儿过时。”

“随着时代在发展，如今越来越多的编程语言都提供了更好的语言结构来处理迭代过程，例如 `Javascript` 的数组就有很多管道方法。”

“是啊，`ES` 都已经出到 `ES12` 了。”小王感慨，有点学不动了。

“哈哈，有些新特性还是给我们的重构工作提供了很多帮助的，我来演示一下这个案例。演示之前，还是先补充两个测试用例。”老耿开始写代码。

```js
describe('test acquireCityData', () => {
  test('acquireCityData should return India city when input India', () => {
    const input =
      ',,+00\nMumbai,India,+91 22\n , , \nTianjing,China,+022\n , , \nKolkata,India,+91 33\nBeijing,China,+010\nHyderabad,India,+91 40';

    const result = acquireCityData(input, 'India');

    expect(result).toStrictEqual([
      {
        city: 'Mumbai',
        phone: '+91 22'
      },
      {
        city: 'Kolkata',
        phone: '+91 33'
      },
      {
        city: 'Hyderabad',
        phone: '+91 40'
      }
    ]);
  });

  test('acquireCityData should return China city when input China', () => {
    const input =
      ',,+00\nMumbai,India,+91 22\n , , \nTianjing,China,+022\n , , \nKolkata,India,+91 33\nBeijing,China,+010\nHyderabad,India,+91 40';

    const result = acquireCityData(input, 'China');

    expect(result).toStrictEqual([
      {
        city: 'Tianjing',
        phone: '+022'
      },
      {
        city: 'Beijing',
        phone: '+010'
      }
    ]);
  });
});
```

“写完测试用例后，运行一下... ok，通过了。” 接下来准备重构工作。

“像这样比较复杂的函数，我们选择一步一步拆解。首先，把忽略第一行，直接用 `slice` 代替。”

```js
function acquireCityData(input, country) {
  let lines = input.split('\n');
  const result = [];
  lines = lines.slice(1);
  for (const line of lines) {
    if (line.trim() === '') continue;
    const record = line.split(',');
    if (record[1].trim() === country) {
      result.push({ city: record[0].trim(), phone: record[2].trim() });
    }
  }
  return result;
}
```

“修改完成后，运行测试用例... ok，下一步过滤为空的 `line`，这里可以用到 `filter`。”

```js
function acquireCityData(input, country) {
  let lines = input.split('\n');
  const result = [];
  lines = lines.slice(1).filter(line => line.trim() !== '');
  for (const line of lines) {
    const record = line.split(',');
    if (record[1].trim() === country) {
      result.push({ city: record[0].trim(), phone: record[2].trim() });
    }
  }
  return result;
}
```

“修改完成后，运行测试用例... ok，下一步是将 `line` 用 `split` 切割，可以使用 `map`。”

```js
function acquireCityData(input, country) {
  let lines = input.split('\n');
  const result = [];
  lines = lines
    .slice(1)
    .filter(line => line.trim() !== '')
    .map(line => line.split(','));
  for (const line of lines) {
    if (line[1].trim() === country) {
      result.push({ city: line[0].trim(), phone: line[2].trim() });
    }
  }
  return result;
}
```

“修改完成后，运行测试用例... ok，下一步是判断国家，可以用 `filter`。”

```js
function acquireCityData(input, country) {
  let lines = input.split('\n');
  const result = [];
  lines = lines
    .slice(1)
    .filter(line => line.trim() !== '')
    .map(line => line.split(','))
    .filter(record => record[1].trim() === country);
  for (const line of lines) {
    result.push({ city: line[0].trim(), phone: line[2].trim() });
  }
  return result;
}
```

“修改完成后，运行测试用例... ok，最后一步是数据组装，可以使用 `map`。”

```js
function acquireCityData(input, country) {
  let lines = input.split('\n');
  return lines
    .slice(1)
    .filter(line => line.trim() !== '')
    .map(line => line.split(','))
    .filter(record => record[1].trim() === country)
    .map(record => ({ city: record[0].trim(), phone: record[2].trim() }));
}
```

“重构完成，运行测试用例。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-10_09-26-23.jpg)

“测试通过，重构完成了，别忘了提交代码。”

“重构完成后，再看这个函数，我们就可以发现，管道操作可以帮助我们更快地看清楚被处理的元素以及处理它们的动作。”

“可是。”小王举手：“在性能上，循环要比管道的性能要好吧？”

“这是个好问题，但这个问题要从三个方面来解释。”

“首先，这一部分时间会被用在两个地方，一是用来做性能优化让程序运行的更快，二是因为缺乏对程序的清楚认识而花费时间。”

“那我先说一下性能优化，如果你对大多数程序进行分析，就会发现它把大半时间都耗费在一小半代码身上。如果你一视同仁地优化所有代码，90 ％的优化工作都是白费劲的，因为被你优化的代码大多很少被执行。”

“第二个方面来说，虽然重构可能使软件运行更慢，但它也使软件的性能优化更容易，因为重构后的代码让人对程序能有更清楚的认识。”

“第三个方面来说，随着现代电脑硬件发展和浏览器技术发展，很多以前会影响性能的重构手法，例如小函数，现在都不会造成性能的影响。以前所认知的性能影响观点也需要与时俱进。”

“这里需要引入一个更高的概念，那就是使用合适的性能度量工具，真正对系统进行性能分析。哪怕你完全了解系统，也请实际度量它的性能，不要臆测。臆测会让你学到一些东西，但十有八九你是错的。”

“所以，我给出的建议是：除了对性能有严格要求的实时系统，其他任何情况下“编写快速软件”的秘密就是：先写出可调优的软件，然后调优它以求获得足够的速度。短期看来，重构的确可能使软件变慢，但它使优化阶段的软件性能调优更容易，最终还是会得到好的效果。”

“我们来看一下重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_09-49-52.jpg)

“那我们继续下一个。”