## 重复代码（Repeat Code）

```js
function renderPerson(person) {
  const result = [];
  result.push(`<p>${person.name}</p>`);
  result.push(`<p>title: ${person.photo.title}</p>`);
  result.push(emitPhotoData(person.photo));
  return result.join('\n');
}

function photoDiv(photo) {
  return ['<div>', `<p>title: ${photo.title}</p>`, emitPhotoData(photo), '</div>'].join('\n');
}

function emitPhotoData(aPhoto) {
  const result = [];
  result.push(`<p>location: ${aPhoto.location}</p>`);
  result.push(`<p>date: ${aPhoto.date}</p>`);
  return result.join('\n');
}
```

“嗯，这段代乍一看是没有什么问题的，应该是用来渲染个人资料界面的。但是我们仔细看的话，会发现 `renderPerson` 方法和 `photoDiv` 中有一个同样的实现，那就是渲染 `photo.title` 的部分。这一部分的逻辑总是在执行 `emitPhotoData` 函数的前面，这是一段重复代码。”

“虽然这是一段看似无伤大雅的重复代码，但是要记住，一旦有重复代码存在，阅读这些重复的代码时你就必须加倍仔细，留意其间细微的差异。如果要修改重复代码，你必须找出所有的副本来修改，这一点让人在阅读和修改代码时都很容易出现纰漏。”

“所以，我们就挑这一段代码来进行重构。按照惯例，我先写两个单元测试用例。”老耿开始写用例。

```js
describe('test render', () => {
  test('renderPerson should return correct struct when input correct struct', () => {
    const input = {
      name: 'jack',
      photo: {
        title: 'travel',
        location: 'tokyo',
        date: '2021-06-08'
      }
    };

    const result = renderPerson(input);

    expect(result).toBe(`<p>jack</p>\n<p>title: travel</p>\n<p>location: tokyo</p>\n<p>date: 2021-06-08</p>`);
  });

  test('photoDiv should return correct struct when input correct struct', () => {
    const input = {
      title: 'adventure',
      location: 'india',
      date: '2021-01-08'
    };

    const result = photoDiv(input);

    expect(result).toBe(`<div>\n<p>title: adventure</p>\n<p>location: india</p>\n<p>date: 2021-01-08</p>\n</div>`);
  });
});
```

“我们先运行测试一下我们的测试用例是否能通过吧。“老耿按下了执行快捷键。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-08_07-57-22.jpg)

“ok，测试通过，记得提交一个 `Commit`，保存我们的测试代码。接下来，我们准备开始重构，这个函数比较简单，我们可以直接把那一行重复的代码移动到 `emitPhotoData` 函数中。但是这次我们还是要演示一下风险较低的一种重构手法，防止出错。“老耿说完，把 `emitPhotoDataNew` ctrl c + ctrl v，在复制的函数体内稍作修改，完成了组装。

```js
function emitPhotoDataNew(aPhoto) {
  const result = [];
  result.push(`<p>title: ${aPhoto.title}</p>`);
  result.push(`<p>location: ${aPhoto.location}</p>`);
  result.push(`<p>date: ${aPhoto.date}</p>`);
  return result.join('\n');
}
```

“然后，我们把 `renderPerson` 和 `photoDiv` 内部调用的方法，都换成 `emitPhotoDataNew` 新方法，如果再稳妥一点的话，最好是换一个函数执行一次测试用例。”

```js
function renderPerson(person) {
  const result = [];
  result.push(`<p>${person.name}</p>`);
  result.push(emitPhotoDataNew(person.photo));
  return result.join('\n');
}

function photoDiv(photo) {
  return ['<div>', emitPhotoDataNew(photo), '</div>'].join('\n');
}

function emitPhotoData(aPhoto) {
  const result = [];
  result.push(`<p>location: ${aPhoto.location}</p>`);
  result.push(`<p>date: ${aPhoto.date}</p>`);
  return result.join('\n');
}

function emitPhotoDataNew(aPhoto) {
  const result = [];
  result.push(`<p>title: ${aPhoto.title}</p>`);
  result.push(`<p>location: ${aPhoto.location}</p>`);
  result.push(`<p>date: ${aPhoto.date}</p>`);
  return result.join('\n');
}
```

“替换完成后，执行测试用例，看看效果。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-08_08-08-52.jpg)

“ok，测试通过，说明重构并没有产生什么问题，接下来把原来的 `emitPhotoData` 安全删除，然后把 `emitPhotoDataNew` 重命名为 `emitPhotoData`，重构就完成了！”

```js
function renderPerson(person) {
  const result = [];
  result.push(`<p>${person.name}</p>`);
  result.push(emitPhotoData(person.photo));
  return result.join('\n');
}

function photoDiv(photo) {
  return ['<div>', emitPhotoData(photo), '</div>'].join('\n');
}

function emitPhotoData(aPhoto) {
  const result = [];
  result.push(`<p>title: ${aPhoto.title}</p>`);
  result.push(`<p>location: ${aPhoto.location}</p>`);
  result.push(`<p>date: ${aPhoto.date}</p>`);
  return result.join('\n');
}
```

“修改完后，别忘了运行测试用例。”老耿每次修改完成后运行测试用例的动作，似乎已经形成了肌肉记忆。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-08_08-08-52.jpg)

“ok，测试通过。这次重构完成了，提交一个 `Commit`，再看一下修改前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_09-10-56.jpg)

“我们继续看下一个坏味道。”