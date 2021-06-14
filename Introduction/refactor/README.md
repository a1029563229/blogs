# 24 大技巧 - 成为编程高手，保持软件健康长青

最近，小李感觉公司女生们看他的眼神不太对劲了，那种笑容好像是充满慈爱的、姨母般的笑容。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_08-42-12.jpg)

作为一名老实本分的程序员，小李不太习惯这种被人过度关注的感觉，他不知道发生了什么。

······

小李和小王的关系似乎过于亲密，还经常挤在一个工位上办公，一直到半夜。

这个流言直到某天他们的聊天内容被某个运营小姐姐听到，他们之间的秘密才被大家发现。

## 小李和小王的故事

“这串代码看起来不太好。” 小李指着屏幕，眉头紧锁。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_08-49-50.jpg)

“咋了，这段代码是我写的，因为这里要实现客户的一个定制化需求，所以看起来有点复杂。” 小王凑了过来。

“我也说不出来哪里不对劲，我现在要添加一个新特性，不知道从哪里下手。” 小李挠了挠头。

小王把凳子搬了过来：“来来，我给你讲讲，这段代码，这段调用.....”

·····

中午 12 点，办公室的空气中弥漫着饭菜的香气，还有成群结队约饭的小伙伴，休闲区也成了干饭的主战场。

“噢？原来小李和小王这种叫做结对编程？” 运营小姐姐目光扫向还在座位上的小李小王。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_08-52-08.jpg)

“嗯...偶尔的结对编程是正常的，但是长期的结对编程说明出现了一些坏味道。”老工程师说完，端起饭盆，干完了最后一口饭。

“oh...是那种...味道吗？”运营小姐姐试探道。

在座一起吃饭的 HR、UI 小姐姐们被这句话又点燃了八卦之魂，发出了一阵愉快的笑声。

“NoNoNo...老耿的意思，代码里出现了坏味道。”高级工程师大宝扶了扶眼镜。

“什么叫代码里出现了坏味道呀？”

“就是软件架构要开始分崩离析的前兆，代码里面充斥着坏味道，这些味道都散发着恶心、腐烂的信号，提示你该重构了。”

小姐姐们眉头一皱，不太满意大宝在吃饭的时候讲了个这么倒胃口的例子。

老耿喝了口水，放下水杯：“阿宝说的没错。很显然，小李和小王在写程序的时候，并没有发现代码中存在的坏味道，导致他们现在欠下了一大批的技术债务，正在分期还债。”

“看来是时候给他们做个培训了，教他们如何识别代码中的坏味道。”

## 代码中的坏味道

小李和小王顶着两个大黑眼圈来到会议室，老耿早已经在会议室等着了。

小李看了一眼投影仪的内容 “`24 种常见的坏味道及重构手法 —— 告别加班，可持续发展`”。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_08-56-33.jpg)

“呐，给你们俩准备的咖啡，打起精神来哈。”大宝用身子推门进来，手上端着两杯热腾腾的咖啡，这是他刚从休息区亲手煮的新鲜咖啡。

“谢谢宝哥” 小李和小王齐声道。

“听说你们俩最近老是一起加班到半夜。” 老耿把手从键盘上拿开，把视线从电脑屏幕上移到小李小王的身上。

“嘿嘿...” 小李不好意思的笑了笑 “最近需求比较难，加一些新功能比较花时间。”

“嗯，看来你们也发现了一些问题，为什么现在加新功能花的时间会比以前多得多呢？”老耿把凳子往后挪了挪，看着两人。

“因为产品越来越复杂了，加新功能也越来越花时间了。”小王接话道。

“对，这算是一个原因。还有吗？”老耿接着问。

“因...因为我们之前写的代码有点乱，可能互相理解起来比较花时间...” 小李挠了挠头。

“但其实我都写了注释的，我觉得还是因为产品太复杂了。”小王对小李这个说法有点不认可。

“好，其实小李说到了一个关键问题。”老耿觉得是时候了，接着说道：“Martin Fowler 曾经说过，当代码库看起来就像补丁摞补丁，需要细致的考古工作才能弄明白整个系统是如何工作的。那这份负担会不断拖慢新增功能的速度，到最后程序员恨不得从头开始重写整个系统。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-07_07-40-18.jpg)

“我想，你们应该有很多次想重写系统的冲动吧？”老耿笑了笑，继续说道：“而内部质量良好的软件可以让我在添加新功能时，很容易找到在哪里修改、如何修改。”

老耿顿了顿，“所以，小王说的也对。产品复杂带来了软件的复杂，而复杂的软件一不小心就容易变成了补丁摞补丁。软件代码中充斥着 “坏味道”，这些 “坏味道” 最终会让软件腐烂，然后失去对它的掌控。”

“对了，小王刚才提到的注释，也是一种坏味道。”老耿笑了笑，看着小王，“所以，坏味道无处不在，有的坏味道比较好察觉，有的坏味道需要经过特殊训练，才能识别。”

老耿又指了指投影仪大屏幕：“所以，我们今天是一期特殊训练课，教会你们识别 24 种常见的坏味道及重构手法，这门课至少可以让你们成为一个有着一些特别好的习惯的还不错的程序员。”

“咳咳，你们俩赚大了”大宝补充道：“老耿这级别的大牛，在外边上课可是要收费的哟~”

“等等，我去拿笔记本。”小李举手示意，然后打开门走出去，小王见状也跟着小李出去拿笔记本了。

## 24 种常见的坏味道及重构手法

老耿见大家已经都做好了学习的准备，站起身走到屏幕旁边，对着大家说道：“那我们开始吧！”

”坏味道我们刚才已经说过了，我再讲个小故事吧。我这么多年以来，看过很多很多代码，它们所属的项目有大获成功的，也有奄奄一息的。观察这些代码时，我和我的老搭档学会了从中找出某些特定结构，这些结构指出了 `重构` 的可能性，这些结构也就是我刚才提到的 `坏味道`。”

“噢对，我刚才还提到了一个词 —— `重构`。这听着像是个很可怕的词，但是我可以和你们说，我口中的 `重构` 并不是你们想的那种推翻重来，有本书给了这个词一个全新的定义 —— `对软件内部结构的一种调整，目的是在不改变软件可观察行为的前提下，提高其可理解性，降低其修改成本。`，你们也可以理解为是在 `使用一系列重构手法，在不改变软件可观察行为的前提下，调整其结构。`”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_08-58-56.jpg)

“如果有人说他们的代码在重构过程中有一两天时间不可用，基本上可以确定，他们在做的事不是重构。”老耿开了个玩笑：“他们可能在对代码施展某种治疗魔法，这种魔法带来的副作用就是会让软件短暂性休克。”

“在这里，还有一点值得一提，那就是如何做到 `不改变软件可观察行为`，这需要一些外力的协助。这里我不建议你们再把加班的人群延伸到测试人员，我给出的方案是准备一套完备的、运行速度很快的测试套件。在绝大多数情况下，如果想要重构，就得先有一套可以自测试的代码。”

“接下来，我会先审查你们商城系统的代码，发现代码中存在的坏味道，然后添加单元测试，进行重构后，最后通过测试完成重构。”

“我会在这个过程中，给你们演示并讲解 24 种常见的坏味道及重构手法。”

“我们开始吧！”老耿重新回到座位。

## 神秘命名（Mysterious Name）

```js
function countOrder(order) {
  const basePrice = order.quantity * order.itemPrice;
  const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
  const shipping = Math.min(basePrice * 0.1, 100);
  return basePrice - quantityDiscount + shipping;
}

const orderPrice = countOrder(order);
```

“上面的这段 `countOrder` 函数是做什么的？看到函数名的第一感觉不太清晰，统计订单？订单商品数量吗？还是统计什么？但是，看到函数内部实现后，我明白了这是个统计订单总价格的函数。这就是其中一个坏味道 —— `神秘命名`，当代码中这样的坏味道多了之后，花在猜谜上的时间就会越来越多了。”

“我们现在来对这段代码进行重构，我们需要先添加单元测试代码。这里我只做演示，写两个测试用例。”

老耿很快针对这段代码，使用著名的 `jest` 框架写出了下面两个测试用例。

```js
describe('test price', () => {
  test('countOrder should return normal price when input correct order quantity < 500', () => {
    const input = {
      quantity: 20,
      itemPrice: 10
    };

    const result = countOrder(input);

    expect(result).toBe(220);
  });

  test('countOrder should return discount price when input correct order quantity > 500', () => {
    const input = {
      quantity: 1000,
      itemPrice: 10
    };

    const result = countOrder(input);

    expect(result).toBe(9850);
  });
});
```

老耿 `运行了一下测试用例`，显示测试通过后，说：“我们有了单元测试后，就可以开始准备重构工作了。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-08_07-06-24.jpg)

“我们先把 `countOrder` 内部的实现提炼成新函数，命名为 `getPrice`，这个名字不一定是最合适的名字，但是会比之前的要好。”老耿使用 `Ide` 很容易就把这一步完成了。

```js
function getPrice(order) {
    const basePrice = order.quantity * order.itemPrice;
    const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
    const shipping = Math.min(basePrice * 0.1, 100);
    return basePrice - quantityDiscount + shipping;
}

function countOrder(order) {
    return getPrice(order);
}

const orderPrice = countOrder(order);
```

“这一步看起来没什么问题，但是我们还是先 `运行一下测试用例`。”老耿按下了执行用例快捷键，用例跑了起来，并且很快就通过了测试。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-08_07-06-24.jpg)

“这一步说明我们的修改没有问题，下一步我们修改测试用例，将测试用例调用的 `countOrder` 方法都修改为调用 `getPrice` 方法，再次 `运行修改后的测试用例`。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-08_07-07-52.jpg)

老耿指着修改后的测试用例：“再次运行后，`getPrice` 也通过了测试，那接下来，我们就可以把调用 `countOrder` 方法的地方，都修改为调用 `getPrice` 方法，就像这样。”

```js
function getPrice(order) {
    const basePrice = order.quantity * order.itemPrice;
    const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
    const shipping = Math.min(basePrice * 0.1, 100);
    return basePrice - quantityDiscount + shipping;
}

function countOrder(order) {
    return getPrice(order);
}

const orderPrice = getPrice(order);
```

“这时候我们可以看到，编辑器已经提示我们，原来的 `countOrder` 方法没有被使用到，我们可以借助 Ide 直接把这个函数删除掉。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-08_07-11-47.jpg)

“删除后，我们的重构就完成了，新的代码看起来像这样。”

```js
function getPrice(order) {
    const basePrice = order.quantity * order.itemPrice;
    const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
    const shipping = Math.min(basePrice * 0.1, 100);
    return basePrice - quantityDiscount + shipping;
}

const orderPrice = getPrice(order);
```

“嗯，这个命名看起来更合适了，一眼看过去就可以知道这是个获取订单价格的函数。如果哪天又想到了更好的名字，用同样的步骤把它替换掉就好了，有单元测试就可以保证你在操作的过程中并不会出错，引发其他的问题。”

“对了，还有最重要的一步。”老耿加重了语气：“记得提交代码！”

老耿用快捷键提交了一个 `Commit` 记录，继续说道：“每一次重构完成都应该提交代码，这样就可以在下一次重构出现问题的时候，迅速回退到上一次正常工作时的状态，这一点很有用！“

大宝补充到：“这样的重构还有个好处，那就是可以保证代码随时都是可发布的状态，因为并没有影响到整体功能的运行。”

“不过想一个合适的好名字确实不容易，耿哥的意思是让我们要持续的小步的进行重构吧。”小王摸着下巴思考说道。

“阿宝和小王说的都对，在不改变软件可观察行为的前提下，持续小步的重构，保证软件随时都处于可发布的状态。这意味着我们随时都可以进行重构，最简单的重构，比如我刚才演示的那种用不了几分钟，而最长的重构也不该超过几小时。”

“我再补充一点。”大宝说道：“我们绝对不能忽视自动化测试，只有自动化测试才能保证在重构的过程中不改变软件可观察行为，这一点看似不起眼，却是最最重要的关键之处。”

“阿宝说的没错，我们至少要保证我们重构的地方有单元测试，且能通过单元测试，才能算作是重构完成。”

老耿稍作停顿后，等待大家理解自己刚才的那段话后，接着说：“看来大家都开始感受到了重构的魅力，我们最后看看这段代码重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_09-13-23.jpg)

“ok，那我们接着说剩下的坏味道吧。”

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

## 过长函数（Long Function）

```js
function printOwing(invoice) {
  let outstanding = 0;
  console.log('***********************');
  console.log('**** Customer Owes ****');
  console.log('***********************');
  // calculate outstanding
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }
  // record due date
  const today = new Date(Date.now());
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
  //print details
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
  console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
}
```

“嗯，这个函数看起来是用来打印用户白条信息的。这个函数实现细节和命名方面倒是没有太多问题，但是这里有一个坏味道，那就是 —— 过长的函数。”

“函数越长，就越难理解。而更好的阐释力、更易于分享、更多的选择——都是由小函数来支持的。”

“对于识别这种坏味道，有一个技巧。那就是，如果你需要花时间浏览一段代码才能弄清它到底在干什么，那么就应该将其提炼到一个函数中，并根据它所做的事为其命名。”

“像这个函数就是那种需要花一定时间浏览才能弄清楚在做什么的，不过好在这个函数还有些注释。”

“还是老方法，我们先写两个测试用例。”老耿开始敲代码。

```js
describe('test printOwing', () => {
  let collections = [];
  console.log = message => {
    collections.push(message);
  };

  afterEach(() => {
    collections = [];
  });

  test('printOwing should return correct struct when input correct struct', () => {
    const input = {
      customer: 'jack',
      orders: [{ amount: 102 }, { amount: 82 }, { amount: 87 }, { amount: 128 }]
    };

    printOwing(input);

    expect(collections).toStrictEqual([
      '***********************',
      '**** Customer Owes ****',
      '***********************',
      'name: jack',
      'amount: 399',
      'due: 7/8/2021'
    ]);
  });

  test('printOwing should return correct struct when input correct struct 2', () => {
    const input = {
      customer: 'dove',
      orders: [{ amount: 63 }, { amount: 234 }, { amount: 12 }, { amount: 1351 }]
    };

    printOwing(input);

    expect(collections).toStrictEqual([
      '***********************',
      '**** Customer Owes ****',
      '***********************',
      'name: dove',
      'amount: 1660',
      'due: 7/8/2021'
    ]);
  });
});
```

“测试用例写完以后运行一下。“

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-08_08-51-58.jpg)

“接下来的提取步骤就很简单了，因为代码本身是有注释的，我们只需要参考注释的节奏来进行提取就好了，依旧是小步慢跑，首先调整函数执行的顺序，将函数分层。”

```js
function printOwing(invoice) {
  // print banner
  console.log('***********************');
  console.log('**** Customer Owes ****');
  console.log('***********************');

  // calculate outstanding
  let outstanding = 0;
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  // record due date
  const today = new Date(Date.now());
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

  // print details
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
  console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
}
```

“进行函数分层后，先运行一遍测试用例，防止调整顺序的过程中，影响了函数功能... ok，测试通过了。”

“被调整顺序后的函数就变得非常简单了，接下来我们分四步提取就可以了”

“第一步，提炼 `printBanner` 函数，然后运行测试用例。”

```js
function printBanner() {
  console.log('***********************');
  console.log('**** Customer Owes ****');
  console.log('***********************');
}

function printOwing(invoice) {
  printBanner();

  // calculate outstanding
  let outstanding = 0;
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  // record due date
  const today = new Date(Date.now());
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

  // print details
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
  console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
}
```

“我们在提取的过程中，把注释也去掉了，因为确实不需要了，函数名和注释的内容一样。”

“第二步，提炼 `calOutstanding` 函数 ，然后运行测试用例。”

```js
function printBanner() {
  console.log('***********************');
  console.log('**** Customer Owes ****');
  console.log('***********************');
}

function calOutstanding(invoice) {
  let outstanding = 0;
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }
  return outstanding;
}

function printOwing(invoice) {
  printBanner();

  let outstanding = calOutstanding(invoice);

  // record due date
  const today = new Date(Date.now());
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

  // print details
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
  console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
}
```

“第三步，提炼 `recordDueDate` 函数，然后运行测试用例。”

```js
function printBanner() {
  console.log('***********************');
  console.log('**** Customer Owes ****');
  console.log('***********************');
}

function calOutstanding(invoice) {
  let outstanding = 0;
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }
  return outstanding;
}

function recordDueDate(invoice) {
  const today = new Date(Date.now());
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
}

function printOwing(invoice) {
  printBanner();

  let outstanding = calOutstanding(invoice);

  recordDueDate(invoice);

  // print details
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
  console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
}
```

“第四步，提炼 `printDetails` 函数，然后运行测试用例。”

```js
function printBanner() {
  console.log('***********************');
  console.log('**** Customer Owes ****');
  console.log('***********************');
}

function calOutstanding(invoice) {
  let outstanding = 0;
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }
  return outstanding;
}

function recordDueDate(invoice) {
  const today = new Date(Date.now());
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
}

function printDetails(invoice, outstanding) {
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
  console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
}

function printOwing(invoice) {
  printBanner();
  let outstanding = calOutstanding(invoice);
  recordDueDate(invoice);
  printDetails(invoice, outstanding);
}
```

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-08_09-04-52.jpg)

“测试用例通过后，别忘了提交代码。”

“然后我们再来审视一下这个重构后的 `printOwing` 函数，简单的四行代码，清晰的描述了函数所做的事情，这就是小函数的魅力！”

“说到底，让小函数易于理解的关键还是在于良好的命名。如果你能给函数起个好名字，阅读代码的人就可以通过名字了解函数的作用，根本不必去看其中写了些什么。这可以节约大量的时间，也能减少你们结对编程的时间。”老耿面带微笑看着小李和小王。

小李小王相视一笑，觉得有点不好意思。

“我们来看看重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_09-17-02.jpg)

“我们继续。”老耿马不停蹄。

## 过长参数列表（Long Parameter List）

```js
// range.js
function priceRange(products, min, max, isOutSide) {
  if (isOutSide) {
    return products
      .filter(r => r.price < min || r.price > max);
  } else {
    return products
      .filter(r => r.price > min && r.price < max);
  }
}

// a.js
const range = { min: 1, max: 10 }
const outSidePriceProducts = priceRange(
  [ /* ... */ ],
  range.min,
  range.max,
  true
)

// b.js
const range = { min: 5, max: 8 }
const insidePriceProducts = priceRange(
  [ /* ... */ ],
  range.min,
  range.max,
  false
)
```

“第一眼看过去，`priceRange` 是过滤商品的函数，仔细看的话会发现，主要比对的是 `product.price` 字段和传入的参数 `min` 与 `max` 之间的大小对比关系。如果 `isOutSide` 为 `true` 的话，则过滤出价格区间之外的商品，否则过滤出价格区间之内的商品。”

“第一眼看过去，这个函数的参数实在是太多了，这会让客户端调用方感到很疑惑。还好参数 `isOutSide` 的命名还算不错，不然这个函数会看起来更深奥。”

小李忍不住插了句：“我每次调用 `priceRange` 函数的时候都要去看一眼这个函数的实现，我老是忘记最后一个参数的规则。”

“我和小李的看法是一样的。”老耿点了点头：“我也不喜欢标记参数，因为它们让人难以理解到底有哪些函数可以调用、应该怎么调用。使用这样的函数，我还得弄清标记参数有哪些可用的值。”

“既然小李也已经发现这个问题了，那我们就从这个 `isOutSide` 参数下手，进行优化。老规矩，我们先针对现有的代码写两个测试用例。” 老耿开始写代码。

```js
describe('test priceRange', () => {
  test('priceRange should return correct result when input correct outside conditional', () => {
    const products = [
      { name: 'apple', price: 6 },
      { name: 'banana', price: 7 },
      { name: 'orange', price: 15 },
      { name: 'cookie', price: 0.5 }
    ];
    const range = { min: 1, max: 10 };
    const isOutSide = true;

    const result = priceRange(products, range.min, range.max, isOutSide);

    expect(result).toStrictEqual([
      { name: 'orange', price: 15 },
      { name: 'cookie', price: 0.5 }
    ]);
  });

  test('priceRange should return correct result when input correct inside conditional', () => {
    const products = [
      { name: 'apple', price: 6 },
      { name: 'banana', price: 7 },
      { name: 'orange', price: 15 },
      { name: 'cookie', price: 0.5 }
    ];
    const range = { min: 5, max: 8 };
    const isOutSide = false;

    const result = priceRange(products, range.min, range.max, isOutSide);

    expect(result).toStrictEqual([
      { name: 'apple', price: 6 },
      { name: 'banana', price: 7 }
    ]);
  });
});
```

“运行一下单元测试...嗯，是可以通过的。那接下来就可以进行参数精简了，我们先把刚才小李提的那个问题解决，就是标记参数，我们针对 `priceRange` 再提炼两个函数。”

“我们先修改我们的单元测试代码，按我们期望调用的方式修改。”

```js
const priceRange = require('./long_parameter_list');

describe('test priceRange', () => {
  test('priceOutSideRange should return correct result when input correct outside conditional', () => {
    const products = [
      { name: 'apple', price: 6 },
      { name: 'banana', price: 7 },
      { name: 'orange', price: 15 },
      { name: 'cookie', price: 0.5 }
    ];
    const range = { min: 1, max: 10 };

    const result = priceOutSideRange(products, range.min, range.max);

    expect(result).toStrictEqual([
      { name: 'orange', price: 15 },
      { name: 'cookie', price: 0.5 }
    ]);
  });

  test('priceInsideRange should return correct result when input correct inside conditional', () => {
    const products = [
      { name: 'apple', price: 6 },
      { name: 'banana', price: 7 },
      { name: 'orange', price: 15 },
      { name: 'cookie', price: 0.5 }
    ];
    const range = { min: 5, max: 8 };

    const result = priceInsideRange(products, range.min, range.max);

    expect(result).toStrictEqual([
      { name: 'apple', price: 6 },
      { name: 'banana', price: 7 }
    ]);
  });
});
```

“我把 `priceRange` 的 `isOutSide` 标记参数移除了，并且使用 `priceOutsideRange` 和 `priceInsideRange` 两个方法来实现原有的功能。这时候还不能运行测试用例，因为我们的代码还没改呢。同样的，把代码调整成符合用例调用的方式。”

```js
function priceRange(products, min, max, isOutSide) {
  if (isOutSide) {
    return products.filter(r => r.price < min || r.price > max);
  } else {
    return products.filter(r => r.price > min && r.price < max);
  }
}

function priceOutSideRange(products, min, max) {
  return priceRange(products, min, max, true);
}

function priceInsideRange(products, min, max) {
  return priceRange(products, min, max, false);
}
```

“代码调整完成后，我们来运行一下测试用例。好的，通过了！”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-09_06-52-27.jpg)

“嗯，我想到这里以后，可以更进一步，把 `priceRange` 的函数进一步抽离，就像这样。”

```js
function priceRange(products, min, max, isOutSide) {
  if (isOutSide) {
    return products.filter(r => r.price < min || r.price > max);
  } else {
    return products.filter(r => r.price > min && r.price < max);
  }
}

function priceOutSideRange(products, min, max) {
  return products.filter(r => r.price < min || r.price > max);
}

function priceInsideRange(products, min, max) {
  return products.filter(r => r.price > min && r.price < max);
}
```

“拆解完成后，记得运行一下测试用例... ok，通过了”

“在测试用例通过后，就可以开始准备迁移工作了。把原来调用 `priceRange` 的地方替换成新的调用，然后再把 `priceRange` 函数安全删除，就像这样。”

```js
// range.js
function priceOutSideRange(products, min, max) {
  return products.filter(r => r.price < min || r.price > max);
}

function priceInsideRange(products, min, max) {
  return products.filter(r => r.price > min && r.price < max);
}

// a.js
const range = { min: 1, max: 10 }
const outSidePriceProducts = priceOutSideRange(
  [ /* ... */ ],
  range.min,
  range.max
)

// b.js
const range = { min: 5, max: 8 }
const insidePriceProducts = priceInsideRange(
  [ /* ... */ ],
  range.min,
  range.max
)
```

“这么做以后，原来让人疑惑的标记参数就被移除了，取而代之的是两个语义更加清晰的函数。”

“接下来，我们要继续做一件有价值的重构，那就是将数据组织成结构，因为这样让数据项之间的关系变得明晰。比如 `range` 的 `min` 和 `max` 总是在调用中被一起使用，那这两个参数就可以组织成结构。我先修改我的测试用例以适应最新的改动，就像这样。”

```js
//...
const range = { min: 1, max: 10 };

const result = priceOutSideRange(products, range);

expect(result).toStrictEqual([
  { name: 'orange', price: 15 },
  { name: 'cookie', price: 0.5 }
]);

//...
const range = { min: 5, max: 8 };

const result = priceInsideRange(products, range);

expect(result).toStrictEqual([
  { name: 'apple', price: 6 },
  { name: 'banana', price: 7 }
]);
```

“测试用例修改完成后，来修改一下我们的函数。”

```js
// range.js
function priceOutSideRange(products, range) {
  return products.filter(r => r.price < range.min || r.price > range.max);
}

function priceInsideRange(products, range) {
  return products.filter(r => r.price > range.min && r.price < range.max);
}

// a.js
const range = { min: 1, max: 10 }
const outSidePriceProducts = priceOutSideRange(
  [ /* ... */ ],
  range
)

// b.js
const range = { min: 5, max: 8 }
const insidePriceProducts = priceInsideRange(
  [ /* ... */ ],
  range
)
```

“修改完成后，运行我们的测试用例，顺利通过，别忘了提交代码。”说完，老耿打了个 `Commit`。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-09_07-04-30.jpg)

“这一步重构又精简了一个参数，这是这项重构最直接的价值。而这项重构真正的意义在于，它会催生代码中更深层次的改变。一旦识别出新的数据结构，我就可以重组程序的行为来使用这些结构。这句话实际应用起来是什么意思呢？我还是拿这个案例来举例。”

“我们会发现 `priceOutSideRange` 和 `priceInsideRange` 的函数命名已经足够清晰，但是内部对 `range` 范围的判定还是需要花费一定时间理解，而 `range` 作为我们刚识别出来的一种结构，可以继续进行重构，就像这样。”

```js
// range.js
class Range {
  constructor(min, max) {
    this._min = min;
    this._max = max;
  }

  outside(num) {
    return num < this._min || num > this._max;
  }

  inside(num) {
    return num > this._min && num < this._max;
  }
}

function priceOutSideRange(products, range) {
  return products.filter(r => range.outside(r.price));
}

function priceInsideRange(products, range) {
  return products.filter(r => range.inside(r.price));
}

// a.js
const outSidePriceProducts = priceOutSideRange(
  [ /* ... */ ],
  new Range(1, 10)
)

// b.js
const insidePriceProducts = priceInsideRange(
  [ /* ... */ ],
  new Range(5, 8)
)
```

“修改测试用例也传入 `Range` 对象，然后运行测试用例...ok，通过了。测试通过后再提交代码。”

“这样一来，让 `priceOutSideRange` 和 `priceInsideRange` 函数内部也更加清晰了。同时，`range` 被组织成了一种新的数据结构，这种结构可以在任何计算区间的地方使用。”

“我们来看看重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_09-20-02.jpg)

“我们继续。”

## 全局数据（Global Data）

```js
// global.js
// ...
let userAuthInfo = {
  platform: 'pc',
  token: ''
}

export {
  userAuthInfo
};

// main.js
userAuthInfo.token = localStorage.token;

// request.js
const reply = await login();
userAuthInfo.token = reply.data.token;

// business.js
await request({ authInfo: userAuthInfo });
```

“这个 `global.js` 似乎是用来提供全局数据的，这是最刺鼻的坏味道之一了。”

“这个 `platform` 被全局都使用到了，我可以把它修改为别的值吗？会引发什么问题吗？”老耿问道

小李连忙说：“这个 `platform` 不能改，后端要靠这个字段来选择识别 `token` 的方式，改了就会出问题。”

“但是我现在可以在代码库的任何一个角落都可以修改 `platform` 和 `token`，而且没有任何机制可以探测出到底哪段代码做出了修改，这就是全局数据的问题。”

“每当我们看到可能被各处的代码污染的数据，我们还是需要全局数据用一个函数包装起来，至少你就能看见修改它的地方，并开始控制对它的访问，这里我做个简单的封装，然后再写两个测试用例。”

```js
let userAuthInfo = {
  platform: 'pc',
  token: ''
};

function getUserAuthInfo() {
  return { ...userAuthInfo };
}

function setToken(token) {
  userAuthInfo.token = token;
}

export {
  getUserAuthInfo,
  setToken
}

// main.js
setToken(localStorage.token);

// request.js
const reply = await login();
setToken(reply.data.token);

// business.js
await request({ authInfo: getUserAuthInfo() });
```

“接下来运行一下测试用例。”

```js
describe("test global data", () => {
    test('getUserAuthInfo.platform should return pc when modify reference', () => {
        const userAuthInfo = getUserAuthInfo();
        userAuthInfo.platform = 'app';

        const result = getUserAuthInfo().platform;

        expect(result).toBe('pc');
    });

    test('getUserInfo.token should return test-token when setToken test-token', () => {
       setToken('test-token');

       const result = getUserAuthInfo().token;

       expect(result).toBe('test-token');
    });
});
```

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-09_07-47-18.jpg)

“这样一来，通过对象引用就无法修改源对象了，并且我这里控制了对 `platform` 属性的修改，只开放对 `token` 修改的接口。即便如此，我们还是要尽可能的避免全局数据，因为全局数据是最刺鼻的坏味道之一！”老耿语气加重。

小李小王疯狂点头。

“我们来看一下重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_09-22-39.jpg)

“那我们继续。”

## 可变数据（Mutable Data）

```js
function merge(target, source) {
  for (const key in source) {
    target[key] = source[key];
  }
  return target;
}
```

“这个函数好像有点古老。”老耿有些疑惑。

“这个是我从之前的仓库 copy 过来的一个工具函数，用来合成对象的，一直没改过。”小王补充道。

“嗯，这个函数的问题是对 `merge` 对象的源对象 `target` 进行了修改，对数据的修改经常导致出乎意料的结果和难以发现的 bug。现在来看程序并没有因为这个函数出现问题，但如果故障只在很罕见的情况下发生，要找出故障原因就会更加困难。”

“先写两个测试用例来进行验证吧。”老耿开始写代码。

```js
describe('test merge', () => {
  test('test merge should return correct struct when merge', () => {
    const baseConfig = {
      url: 'https://api.com',
      code: 'mall'
    };

    const testSpecialConfig = {
      url: 'https://test-api.com',
      code: 'test-mall'
    };

    const result = merge(baseConfig, testSpecialConfig);

    expect(result).toStrictEqual({
      url: 'https://test-api.com',
      code: 'test-mall'
    });
  });

  test('test merge should return original struct when merge', () => {
    const baseConfig = {
      url: 'https://api.com',
      code: 'mall'
    };

    const testSpecialConfig = {
      url: 'https://test-api.com',
      code: 'test-mall'
    };

    merge(baseConfig, testSpecialConfig);

    expect(baseConfig).toStrictEqual({
      url: 'https://api.com',
      code: 'mall'
    });
  });
});
```

“运行一下... 第二个用例报错了。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-09_08-32-59.jpg)

“报错的原因就是因为对源对象进行了修改调整，从而影响了 `baseConfig` 的值。接下来我们调整一下 `merge` 函数就行了，现在 `javascript` 有很简单的方法可以修改这个函数。”

```js
function merge(target, source) {
  return {
    ...target,
    ...source
  }
}
```

“修改完成后，再次运行用例，就可以看到用例运行通过了。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-09_08-38-56.jpg)

“我刚才的重构手法其实有一整个软件开发流派 —— 函数式编程，就是完全建立在“数据永不改变”的概念基础上：如果要更新一个数据结构，就返回一份新的数据副本，旧的数据仍保持不变，这样可以避免很多因数据变化而引发的问题。”

“在刚才介绍全局数据时用到的封装变量的方法，也是对可变数据这种坏味道常见的一种解决方案。还有，如果可变数据的值能在其他地方计算出来，这就是一个特别刺鼻的坏味道。它不仅会造成困扰、bug和加班，而且毫无必要。”

“这里我就不做展开了，如果你们俩感兴趣的话，可以去看看《重构：改善既有代码的设计(第2版)》这本书，我刚才提到的坏味道，书里面都有。”

小李小王奋笔疾书，把书名记了下来。

“我们来看一下重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_09-26-45.jpg)

“那我们继续。”

## 发散式变化（Divergent Change）

```js
function getPrice(order) {
  const basePrice = order.quantity * order.itemPrice;
  const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
  const shipping = Math.min(basePrice * 0.1, 100);
  return basePrice - quantityDiscount + shipping;
}

const orderPrice = getPrice(order);
```

“这个函数是我们最早重构的函数，它的职责就是计算基础价格 - 数量折扣 + 运费。我们再来看看这个函数，如果基础价格计算规则改变，需要修改这个函数，如果折扣规则发生改变也需要修改这个函数，同理，运费计算规则也会引发它的改变。”

“如果某个模块经常因为不同的原因在不同的方向上发生变化，发散式变化就出现了。”

“测试用例已经有了，所以我们可以直接对函数进行重构。”老耿开始写代码。

```js
function calBasePrice(order) {
    return order.quantity * order.itemPrice;
}

function calDiscount(order) {
    return Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
}

function calShipping(basePrice) {
    return Math.min(basePrice * 0.1, 100);
}

function getPrice(order) {
    return calBasePrice(order) - calDiscount(order) + calShipping(calBasePrice(order));
}

const orderPrice = getPrice(order);
```

“修改完成后，我们运行之前写的测试用例... 测试通过了。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-09_09-04-48.jpg)

“修改之后的三个函数只需要关心自己职责方向的变化就可以了，而不是一个函数关注多个方向的变化。并且，单元测试粒度还可以写的更细一点，这样对排查问题的效率也有很大的提升。”

大宝适时补充了一句：“其实这就是面向对象设计原则中的 `单一职责原则`。”

“阿宝说的没错，keep simple，`每次只关心一个上下文` 这一点一直很重要。”

“我们来看一下重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_09-29-53.jpg)

“我们继续。”

## 霰弹式修改（Shotgun Surgery）

```js
// File Reading.js
const reading = {customer: "ivan", quantity: 10, month: 5, year: 2017};
function acquireReading() { return reading };
function baseRate(month, year) {
    /* */
}

// File 1
const aReading = acquireReading();
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;

// File 2
const aReading = acquireReading();
const base = (baseRate(aReading.month, aReading.year) * aReading.quantity);
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));
function taxThreshold(year) { /* */ }

// File 3
const aReading = acquireReading();
const basicChargeAmount = calculateBaseCharge(aReading);
function calculateBaseCharge(aReading) {
  return baseRate(aReading.month, aReading.year) * aReading.quantity;
}
```

“接下来要说的就是 `发散式变化` 的反例 —— `霰弹式修改`。这个要找一个软件里的案例需要花点时间，这里我直接拿《重构》原书的一个例子来作讲解。”

“其实这个问题和重复代码有点像，重复代码经常会引起霰弹式修改的问题。”

“像上面的演示代码，如果 `reading` 的部分逻辑发生了改变，对这部分逻辑的修改需要跨越好几个文件调整。”

“如果每遇到某种变化，你都必须在许多不同的类或文件内做出许多小修改，你所面临的坏味道就是霰弹式修改。如果需要修改的代码散布四处，你不但很难找到它们，也很容易错过某个重要的修改。”

“这里我来对这段代码进行重构，由于源代码也不是很完整，这里我只把修改的思路提一下，就不写测试代码了。”老耿开始写代码。

```js
// File Reading.js
class Reading {
  constructor(data) {
    this._customer = data.customer;
    this._quantity = data.quantity;
    this._month = data.month;
    this._year = data.year;
  }

  get customer() {
    return this._customer;
  }

  get quantity() {
    return this._quantity;
  }

  get month() {
    return this._month;
  }

  get year() {
    return this._year;
  }

  get baseRate() {
    /* ... */
  }

  get baseCharge() {
    return baseRate(this.month, this.year) * this.quantity;
  }

  get taxableCharge() {
    return Math.max(0, base - taxThreshold());
  }

  get taxThreshold() {
    /* ... */
  }
}

const reading = new Reading({ customer: 'ivan', quantity: 10, month: 5, year: 2017 });
```

“在修改完成后，所有和 `reading` 相关的逻辑都放在一起管理了，并且我把它组合成一个类以后还有一个好处。那就是类能明确地给这些函数提供一个共用的环境，在对象内部调用这些函数可以少传许多参数，从而简化函数调用，并且这样一个对象也可以更方便地传递给系统的其他部分。”

“如果你们在编码过程中，有遇到我刚才提到的那些问题，那就是一种坏味道。下次就可以用类似的重构手法进行重构了，当然，别忘了写测试用例。”老耿对着小李二人说道。

小李小王疯狂点头。

“我们来看一下重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_09-33-15.jpg)

“那我们继续。”

## 依恋情节（Feature Envy）

```js
class Account {
  constructor(data) {
    this._name = data.name;
    this._type = data.type;
  }

  get loanAmount() {
    if (this._type.type === 'vip') {
      return 20000;
    } else {
      return 10000;
    }
  }
}

class AccountType {
  constructor(type) {
    this._type = type;
  }

  get type() {
    return this._type;
  }
}
```

“这段代码是账户 `Account` 和账户类型 `AccountType`，如果账户的类型是 `vip`，贷款额度 `loanAmount` 就有 20000，否则就只有 10000。”

“在获取贷款额度时，`Account` 内部的 `loanAmount` 方法和另一个类 `AccountType` 的内部数据交流格外频繁，远胜于在自己所处模块内部的交流，这就是依恋情结的典型情况。”

“我们先写两个测试用例吧。”老耿开始写代码。

```js
describe('test Account', () => {
  test('Account should return 20000 when input vip type', () => {
    const input = {
      name: 'jack',
      type: new AccountType('vip')
    };

    const result = new Account(input).loanAmount;

    expect(result).toBe(20000);
  });

  test('Account should return 20000 when input normal type', () => {
    const input = {
      name: 'dove',
      type: new AccountType('normal')
    };

    const result = new Account(input).loanAmount;

    expect(result).toBe(10000);
  });
});
```

“测试用例可以直接运行... ok，通过了。”

“接下来，我们把 `loanAmount` 搬移到真正属于它的地方。”

```js
class Account {
  constructor(data) {
    this._name = data.name;
    this._type = data.type;
  }

  get loanAmount() {
    return this._type.loanAmount;
  }
}

class AccountType {
  constructor(type) {
    this._type = type;
  }

  get type() {
    return this._type;
  }

  get loanAmount() {
    if (this.type === 'vip') {
      return 20000;
    } else {
      return 10000;
    }
  }
}
```

“在搬移完成后，`loanAmount` 访问的都是自身模块的数据，不再依恋其他模块。我们运行一下测试用例。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-13_09-09-27.jpg)

“ok，测试通过了，别忘了提交代码。”老耿提交了一个 commit。

“我们来看一下重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_09-35-43.jpg)

“我们继续下一个。”

## 数据泥团（Data Clumps）

```js
class Person {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set name(arg) {
    this._name = arg;
  }

  get telephoneNumber() {
    return `(${this.officeAreaCode}) ${this.officeNumber}`;
  }

  get officeAreaCode() {
    return this._officeAreaCode;
  }

  set officeAreaCode(arg) {
    this._officeAreaCode = arg;
  }

  get officeNumber() {
    return this._officeNumber;
  }

  set officeNumber(arg) {
    this._officeNumber = arg;
  }
}

const person = new Person('jack');
person.officeAreaCode = '+86';
person.officeNumber = 18726182811;
console.log(`person's name is ${person.name}, telephoneNumber is ${person.telephoneNumber}`);
// person's name is jack, telephoneNumber is (+86) 18726182811
```

“这个 Person 类记录了用户的名字（name），电话区号（officeAreaCode）和电话号码（officeNumber），这里有一个不是很刺鼻的坏味道。”

“如果我把 `officeNumber` 字段删除，那 `officeAreaCode` 就失去了意义。这说明这两个字段总是一起出现的，除了 `Person` 类，其他用到电话号码的地方也是会出现这两个字段的组合。”

“这个坏味道叫做数据泥团，主要体现在数据项喜欢成群结队地待在一块儿。你常常可以在很多地方看到相同的三四项数据：两个类中相同的字段、许多函数签名中相同的参数，这些总是绑在一起出现的数据真应该拥有属于它们自己的对象。”

“老规矩，我们先写两个测试用例。”老耿开始写代码

```js
describe('test Person', () => {
  test('person.telephoneNumber should return (+86) 18726182811 when input correct struct', () => {
    const person = new Person('jack');
    person.officeAreaCode = '+86';
    person.officeNumber = 18726182811;

    const result = person.telephoneNumber;

    expect(person.officeAreaCode).toBe('+86');
    expect(person.officeNumber).toBe(18726182811);
    expect(result).toBe('(+86) 18726182811');
  });

  test('person.telephoneNumber should return (+51) 15471727172 when input correct struct', () => {
    const person = new Person('jack');
    person.officeAreaCode = '+51';
    person.officeNumber = 15471727172;

    const result = person.telephoneNumber;

    expect(person.officeAreaCode).toBe('+51');
    expect(person.officeNumber).toBe(15471727172);
    expect(result).toBe('(+51) 15471727172');
  });
});
```

“运行一下测试用例... ok，测试通过了，准备开始重构了。”

“我们先新建一个 `TelephoneNumber` 类，用于分解 `Person` 类所承担的责任。”

```js
class TelephoneNumber {
  constructor(areaCode, number) {
    this._areaCode = areaCode;
    this._number = number;
  }

  get areaCode() {
    return this._areaCode;
  }

  get number() {
    return this._number;
  }

  toString() {
    return `(${this._areaCode}) ${this._number}`;
  }
}
```

“这时候，我们再调整一下我们的 `Person` 类，使用新的数据结构。”

```js
class Person {
  constructor(name) {
    this._name = name;
    this._telephoneNumber = new TelephoneNumber();
  }

  get name() {
    return this._name;
  }

  set name(arg) {
    this._name = arg;
  }

  get telephoneNumber() {
    return this._telephoneNumber.toString();
  }

  get officeAreaCode() {
    return this._telephoneNumber.areaCode;
  }

  set officeAreaCode(arg) {
    this._telephoneNumber = new TelephoneNumber(arg, this.officeNumber);
  }

  get officeNumber() {
    return this._telephoneNumber.number;
  }

  set officeNumber(arg) {
    this._telephoneNumber = new TelephoneNumber(this.officeAreaCode, arg);
  }
}
```

“重构完成，我们运行测试代码。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-10_07-19-54.jpg)

“测试用例运行通过了，别忘了提交代码。”

“在这里我选择新建一个类，而不是简单的记录结构，是因为一旦拥有新的类，你就有机会让程序散发出一种芳香。得到新的类以后，你就可以着手寻找其他坏味道，例如“依恋情节”，这可以帮你指出能够移至新类中的种种行为。这是一种强大的动力：有用的类被创建出来，大量的重复被消除，后续开发得以加速，原来的数据泥团终于在它们的小社会中充分发挥价值。”

“比如这里，`TelephoneNumber` 类被提炼出来后，就可以去消灭那些使用到 `telephoneNumber` 的重复代码，并且根据使用情况进一步优化，我就不做展开了。”

“我们来看一下重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_09-37-52.jpg)

“我们继续讲下一个坏味道。”

## 基本类型偏执（Primitive Obsession）

```js
class Product {
  constructor(data) {
    this._name = data.name;
    this._price = data.price;
    /* ... */
  }

  get name() {
    return this.name;
  }

  /* ... */

  get price() {
    return `${this.priceCount} ${this.priceSuffix}`;
  }

  get priceCount() {
    return parseFloat(this._price.slice(1));
  }

  get priceUnit() {
    switch (this._price.slice(0, 1)) {
      case '￥':
        return 'cny';
      case '$':
        return 'usd';
      case 'k':
        return 'hkd';
      default:
        throw new Error('un support unit');
    }
  }

  get priceCnyCount() {
    switch (this.priceUnit) {
      case 'cny':
        return this.priceCount;
      case 'usd':
        return this.priceCount * 7;
      case 'hkd':
        return this.priceCount * 0.8;
      default:
        throw new Error('un support unit');
    }
  }

  get priceSuffix() {
    switch (this.priceUnit) {
      case 'cny':
        return '元';
      case 'usd':
        return '美元';
      case 'hkd':
        return '港币';
      default:
        throw new Error('un support unit');
    }
  }
}
```

“我们来看看这个 `Product`（产品）类，大家应该也看出来了这个类的一些坏味道，`price` 字段作为一个基本类型，在 `Product` 类中被各种转换计算，然后输出不同的格式，`Product` 类需要关心 `price` 的每一个细节。”

“在这里，`price` 非常值得我们为它创建一个属于它自己的基本类型 - `Price`。”

“在重构之前，先把测试用例覆盖完整。”老耿开始写代码。

```js
describe('test Product price', () => {
  const products = [
    { name: 'apple', price: '$6' },
    { name: 'banana', price: '￥7' },
    { name: 'orange', price: 'k15' },
    { name: 'cookie', price: '$0.5' }
  ];

  test('Product.price should return correct price when input products', () => {
    const input = [...products];

    const result = input.map(item => new Product(item).price);

    expect(result).toStrictEqual(['6 美元', '7 元', '15 港币', '0.5 美元']);
  });

  test('Product.price should return correct priceCount when input products', () => {
    const input = [...products];

    const result = input.map(item => new Product(item).priceCount);

    expect(result).toStrictEqual([6, 7, 15, 0.5]);
  });

  test('Product.price should return correct priceUnit when input products', () => {
    const input = [...products];

    const result = input.map(item => new Product(item).priceUnit);

    expect(result).toStrictEqual(['usd', 'cny', 'hkd', 'usd']);
  });

  test('Product.price should return correct priceCnyCount when input products', () => {
    const input = [...products];

    const result = input.map(item => new Product(item).priceCnyCount);

    expect(result).toStrictEqual([42, 7, 12, 3.5]);
  });

  test('Product.price should return correct priceSuffix when input products', () => {
    const input = [...products];

    const result = input.map(item => new Product(item).priceSuffix);

    expect(result).toStrictEqual(['美元', '元', '港币', '美元']);
  });
});
```

“测试用例写完以后运行一下，看看效果。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-10_07-56-22.jpg)

“这个重构手法也比较简单，先新建一个 `Price` 类，先把 `price` 和相关的行为搬移到 `Price` 类中，然后再委托给 `Product` 类即可。我们先来实现 `Price` 类。”

```js
class Price {
  constructor(value) {
    this._value = value;
  }

  toString() {
    return `${this.count} ${this.suffix}`;
  }

  get count() {
    return parseFloat(this._value.slice(1));
  }

  get unit() {
    switch (this._value.slice(0, 1)) {
      case '￥':
        return 'cny';
      case '$':
        return 'usd';
      case 'k':
        return 'hkd';
      default:
        throw new Error('un support unit');
    }
  }

  get cnyCount() {
    switch (this.unit) {
      case 'cny':
        return this.count;
      case 'usd':
        return this.count * 7;
      case 'hkd':
        return this.count * 0.8;
      default:
        throw new Error('un support unit');
    }
  }

  get suffix() {
    switch (this.unit) {
      case 'cny':
        return '元';
      case 'usd':
        return '美元';
      case 'hkd':
        return '港币';
      default:
        throw new Error('un support unit');
    }
  }
}
```

“此时，`Product` 类我还没有修改，但是如果你觉得你搬移函数的过程中容易手抖不放心的话，可以运行一下测试用例。”

“接下来是重构 `Product` 类，将原有跟 `price` 相关的逻辑，使用中间人委托来调用。”

```js
class Product {
  constructor(data) {
    this._name = data.name;
    this._price = new Price(data.price);
    /* ... */
  }

  get name() {
    return this.name;
  }

  /* ... */

  get price() {
    return this._price.toString();
  }

  get priceCount() {
    return this._price.count;
  }

  get priceUnit() {
    return this._price.unit;
  }

  get priceCnyCount() {
    return this._price.cnyCount;
  }

  get priceSuffix() {
    return this._price.suffix;
  }
}
```

“重构完成后，运行测试用例。” 老耿按下运行键。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-10_08-09-23.jpg)

“测试用例运行通过了，别忘了提交代码。”

“很多人对基本类型都有一种偏爱，他们普遍觉得基本类型要比类简洁，但是，别让这种偏爱演变成了 `偏执`。有些时候，我们需要走出传统的洞窟，进入炙手可热的对象世界。”

“这个案例演示了一种很常见的场景，相信你们以后也可以识别基本类型偏执这种坏味道了。”

小李小王疯狂点头。

“我们来看一下重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_09-43-54.jpg)

“那我们继续吧。”

## 重复的 switch（Repeated switch）

```js
class Price {
  constructor(value) {
    this._value = value;
  }

  toString() {
    return `${this.count} ${this.suffix}`;
  }

  get count() {
    return parseFloat(this._value.slice(1));
  }

  get unit() {
    switch (this._value.slice(0, 1)) {
      case '￥':
        return 'cny';
      case '$':
        return 'usd';
      case 'k':
        return 'hkd';
      default:
        throw new Error('un support unit');
    }
  }

  get cnyCount() {
    switch (this.unit) {
      case 'cny':
        return this.count;
      case 'usd':
        return this.count * 7;
      case 'hkd':
        return this.count * 0.8;
      default:
        throw new Error('un support unit');
    }
  }

  get suffix() {
    switch (this.unit) {
      case 'cny':
        return '元';
      case 'usd':
        return '美元';
      case 'hkd':
        return '港币';
      default:
        throw new Error('un support unit');
    }
  }
}
```

“刚才我们提炼了 `Price` 类后，现在发现 `Price` 类有个问题，你们看出来了吗？” 老耿看着小李小王。

小李摇了摇头，小王也没说话。

“重复的 `switch` 语句，每当看到代码里有 `switch` 语句时，就要提高警惕了。当看到重复的 `switch` 语句时，这种坏味道就冒出来了。” 老耿接着说道。 

“重复的 switch 的问题在于：每当你想增加一个选择分支时，必须找到所有的 switch，并逐一更新。”

“并且这种 `switch` 结构是非常脆弱的，频繁的修改 `switch` 语句可能还可能会引发别的问题，相信你们也遇到过这种情况。”

小李此时似乎想起了什么，补充道：“这里的 `switch` 语句还好，有些地方的 `switch` 语句写的太长了，每次理解起来也很困难，所以容易改出问题。”

“小李说的不错，那我们现在来重构这个 `Price`。这里我偷个懒，测试用例接着用之前 `Product` 的测试用例，你们可以在实际项目中针对 `Price` 写用例，测试用例的粒度越小，越容易定位问题。”

“我们先创建一个工厂函数，同时将 `Product` 类的实例方法也使用工厂函数创建。”老耿开始写代码。

```js
class Product {
  constructor(data) {
    this._name = data.name;
    this._price = createPrice(data.price);
    /* ... */
  }

  /* ... */
}

function createPrice(value) {
  return new Price(value);
}
```

“运行一下测试用例... ok，通过了。那我们下一步，把 `Price` 作为超类，创建一个子类 `CnyPrice`，继承于 `Price`，同时修改工厂函数，在货币类型为 `￥` 时，创建并返回 `CnyPrice` 类。”

```js
class CnyPrice extends Price {
  constructor(props) {
    super(props);
  }
}

function createPrice(value) {
  switch (value.slice(0, 1)) {
    case '￥':
      return new CnyPrice(value);
    default:
      return new Price(value);
  }
}
```

“运行一下测试用例... ok，通过了。那我们下一步，把 `Price` 超类中，所有关于 `cny` 的条件逻辑的函数，在 `CnyPrice` 中进行重写。”

```js
class CnyPrice extends Price {
  constructor(props) {
    super(props);
  }

  get unit() {
    return 'cny';
  }

  get cnyCount() {
    return this.count;
  }

  get suffix() {
    return '元';
  }
}
```

“重写完成后，运行一下测试用例... ok，通过了，下一步再把 `Price` 类中，所有关于 `cny` 的条件分支都移除。”

```js
class Price {
  constructor(value) {
    this._value = value;
  }

  toString() {
    return `${this.count} ${this.suffix}`;
  }

  get count() {
    return parseFloat(this._value.slice(1));
  }

  get unit() {
    switch (this._value.slice(0, 1)) {
      case '$':
        return 'usd';
      case 'k':
        return 'hkd';
      default:
        throw new Error('un support unit');
    }
  }

  get cnyCount() {
    switch (this.unit) {
      case 'usd':
        return this.count * 7;
      case 'hkd':
        return this.count * 0.8;
      default:
        throw new Error('un support unit');
    }
  }

  get suffix() {
    switch (this.unit) {
      case 'usd':
        return '美元';
      case 'hkd':
        return '港币';
      default:
        throw new Error('un support unit');
    }
  }
}
```

“移除完成后，运行一下测试用例。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-10_08-31-53.jpg)

“运行通过，接下来我们如法炮制，把 `UsdPrice` 和 `HkdPrice` 也创建好，最后再将超类中的条件分支逻辑相关代码都移除。” 老耿继续写代码。

```js
class Price {
  constructor(value) {
    this._value = value;
  }

  toString() {
    return `${this.count} ${this.suffix}`;
  }

  get count() {
    return parseFloat(this._value.slice(1));
  }

  get suffix() {
    throw new Error('un support unit');
  }
}

class CnyPrice extends Price {
  constructor(props) {
    super(props);
  }

  get unit() {
    return 'cny';
  }

  get cnyCount() {
    return this.count;
  }

  get suffix() {
    return '元';
  }
}

class UsdPrice extends Price {
  constructor(props) {
    super(props);
  }

  get unit() {
    return 'usd';
  }

  get cnyCount() {
    return this.count * 7;
  }

  get suffix() {
    return '美元';
  }
}

class HkdPrice extends Price {
  constructor(props) {
    super(props);
  }

  get unit() {
    return 'hkd';
  }

  get cnyCount() {
    return this.count * 0.8;
  }

  get suffix() {
    return '港币';
  }
}

function createPrice(value) {
  switch (value.slice(0, 1)) {
    case '￥':
      return new CnyPrice(value);
    case '$':
      return new UsdPrice(value);
    case 'k':
      return new HkdPrice(value);
    default:
      throw new Error('un support unit');
  }
}
```

“重构完成后，运行测试用例。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-10_08-38-35.jpg)

“ok，运行通过，别忘了提交代码。”

“这样一来，修改对应的货币逻辑并不影响其他的货币逻辑，并且添加一种新的货币规则也不会影响到其他货币逻辑，修改和添加特性都变得简单了。”

“复杂的条件逻辑是编程中最难理解的东西之一，最好可以将条件逻辑拆分到不同的场景，从而拆解复杂的条件逻辑。这种拆分有时用条件逻辑本身的结构就足以表达，但使用类和多态能把逻辑的拆分表述得更清晰。”

“就像我刚才演示的那样。”

“我们来看一下重构前后的对比。“

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_09-47-54.jpg)

“那我们继续吧。”

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

## 冗赘的元素（Lazy Element）

```js
function reportLines(aCustomer) {
  const lines = [];
  gatherCustomerData(lines, aCustomer);
  return lines;
}

function gatherCustomerData(out, aCustomer) {
  out.push(["name", aCustomer.name]);
  out.push(["location", aCustomer.location]);
}
```

“有些函数不能明确的说存在什么问题，但是可以优化。比如这个函数，能给代码增加结构，设计之初可能是为了支持变化、促进复用或者哪怕只是提供更好的名字，但在这里看来真的不需要这层额外的结构。因为，它的名字就跟实现代码看起来一模一样。”

“有些时候也并不完全是因为过度设计，也可能是因为随着重构的进行越变越小，最后只剩了一个函数。”

“这里我直接用内联函数把它优化掉。先写两个测试用例。”老耿开始写代码。

```js
describe('test reportLines', () => {
  test('reportLines should return correct array struct when input aCustomer', () => {
    const input = {
      name: 'jack',
      location: 'tokyo'
    };

    const result = reportLines(input);

    expect(result).toStrictEqual([
      ['name', 'jack'],
      ['location', 'tokyo']
    ]);
  });

  test('reportLines should return correct array struct when input aCustomer', () => {
    const input = {
      name: 'jackli',
      location: 'us'
    };

    const result = reportLines(input);

    expect(result).toStrictEqual([
      ['name', 'jackli'],
      ['location', 'us']
    ]);
  });
});
```

“运行一下测试用例... ok，没有问题，那我们开始重构吧。” 老耿开始写代码。

```js
function reportLines(aCustomer) {
  const lines = [];
  lines.push(["name", aCustomer.name]);
  lines.push(["location", aCustomer.location]);
  return lines;
}
```

“ok，很简单，重构完成了，我们运行测试用例。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-12_08-41-00.jpg)

“用例测试通过了。如果你想再精简一点，可以再修改一下。”

```js
function reportLines(aCustomer) {
  return [
    ['name', aCustomer.name],
    ['location', aCustomer.location]
  ];
}
```

“运行测试用例... 通过了，提交代码。”

“在重构的过程中会发现越来越多可以重构的新结构，就像我刚才演示的那样。”

“像这类的冗赘的元素存在并没有太多的帮助，所以，让它们慷慨赴义去吧。”

“我们来看看重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_09-51-18.jpg)

“我们继续。”

## 夸夸其谈通用性（Speculative Generality）

```js
class TrackingInformation {
  get shippingCompany() {return this._shippingCompany;}
  set shippingCompany(arg) {this._shippingCompany = arg;}
  get trackingNumber() {return this._trackingNumber;}
  set trackingNumber(arg) {this._trackingNumber = arg;}
  get display() {
    return `${this.shippingCompany}: ${this.trackingNumber}`;
  }
}

class Shipment {
  get trackingInfo() {
    return this._trackingInformation.display;
  }
  get trackingInformation() { return this._trackingInformation; }
  set trackingInformation(aTrackingInformation) {
    this._trackingInformation = aTrackingInformation;
  }
}
```

“嗯... 来看看这个关于这两个物流的类，而 `TrackingInformation` 记录物流公司和物流单号，而 `Shipment` 只是使用 `TrackingInformation` 管理物流信息，并没有其他任何额外的工作。为什么用一个额外的 `TrackingInformation` 来管理物流信息，而不是直接用 `Shipment` 来管理呢？”

“因为 `Shipment` 可能还会有其他的职责。” 小王表示这是自己写的代码。 “所以，我使用了一个额外的类来追踪物流信息。”

“很好，单一职责原则。”

“那这个 `Shipment` 存在多久了，我看看代码提交记录...” 老耿看着 git 信息说道：“嗯，已经存在两年了，目前看来它还没有出现其他的职责，我要再等它几年吗？”

“这个坏味道是十分敏感的。”老耿顿了顿，接着说道：“系统里存在一些 `夸夸其谈通用性` 的设计，常见语句就是 `我们总有一天会用上的`，并因此企图以各式各样的钩子和特殊情况来处理一些非必要的事情，这么做的结果往往造成系统更难理解和维护。“

“在重构之前，我们先写两个测试用例吧。”老耿开始写代码。

```js
describe('test Shipment', () => {
    test('Shipment should return correct trackingInfo when input trackingInfo', () => {
        const input = {
            shippingCompany: '顺丰',
            trackingNumber: '87349189841231'
        };

        const result = new Shipment(input.shippingCompany, input.trackingNumber).trackingInfo;

        expect(result).toBe('顺丰: 87349189841231');
    });

    test('Shipment should return correct trackingInfo when input trackingInfo', () => {
        const input = {
            shippingCompany: '中通',
            trackingNumber: '1281987291873'
        };

        const result = new Shipment(input.shippingCompany, input.trackingNumber).trackingInfo;

        expect(result).toBe('中通: 1281987291873');
    });
});
```

“现在还不能运行测试用例，为什么呀？” 老耿自问自答：“因为这个用例运行是肯定会报错的，`Shipment` 目前的结构根本不支持这么调用的，所以肯定会出错。”

“这里我要引入一个新的概念，那就是 TDD - 测试驱动开发。”

“测试驱动开发是戴两顶帽子思考的开发方式：先戴上实现功能的帽子，在测试的辅助下，快速实现其功能；再戴上重构的帽子，在测试的保护下，通过去除冗余的代码，提高代码质量。测试驱动着整个开发过程：首先，驱动代码的设计和功能的实现；其后，驱动代码的再设计和重构。”

“这里，我们就是先写出我们希望程序运行的方式，再通过测试用例去反推程序设计，在通过测试用例后，功能也算是开发完成了。”

“下面我们进行代码重构。”老耿开始写代码。

```js
class Shipment {
  constructor(shippingCompany, trackingNumber) {
    this._shippingCompany = shippingCompany;
    this._trackingNumber = trackingNumber;
  }

  get shippingCompany() {
    return this._shippingCompany;
  }

  set shippingCompany(arg) {
    this._shippingCompany = arg;
  }

  get trackingNumber() {
    return this._trackingNumber;
  }

  set trackingNumber(arg) {
    this._trackingNumber = arg;
  }

  get trackingInfo() {
    return `${this.shippingCompany}: ${this.trackingNumber}`;
  }
}
```

“我把 `TrackingInformation` 类完全移除了，使用 `Shipment` 直接对物流信息进行管理。在重构完成后，运行测试用例。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-12_09-07-43.jpg)

“用例运行通过了，这时候再把之前应用到 `Shipment` 的地方进行调整。当然，更稳妥的办法是先使用 `ShipmentNew` 类进行替换后，再删除原来的类。这里我还是回退一下代码，你们俩去评估一下影响点，再自己来重构吧。” 老耿回退了代码。

小李小王疯狂点头。

“关于代码通用性设计，如果所有装置都会被用到，就值得那么做；如果用不到，就不值得。用不上的装置只会挡你的路，所以，把它搬开吧。”

“我们来看看重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_09-53-01.jpg)

“我们继续吧。”

## 临时字段（Temporary Field）

```js
class Site {
  constructor(customer) {
    this._customer = customer;
  }

  get customer() {
    return this._customer;
  }
}

class Customer {
  constructor(data) {
    this._name = data.name;
    this._billingPlan = data.billingPlan;
    this._paymentHistory = data.paymentHistory;
  }

  get name() {
    return this._name;
  }
  get billingPlan() {
    return this._billingPlan;
  }
  set billingPlan(arg) {
    this._billingPlan = arg;
  }
  get paymentHistory() {
    return this._paymentHistory;
  }
}

// Client 1
{
  const aCustomer = site.customer;
  // ... lots of intervening code ...
  let customerName;
  if (aCustomer === 'unknown') customerName = 'occupant';
  else customerName = aCustomer.name;
}

// Client 2
{
  const plan = aCustomer === 'unknown' ? registry.billingPlans.basic : aCustomer.billingPlan;
}

// Client 3
{
  if (aCustomer !== 'unknown') aCustomer.billingPlan = newPlan;
}

// Client 4
{
  const weeksDelinquent = aCustomer === 'unknown' ? 0 : aCustomer.paymentHistory.weeksDelinquentInLastYear;
}
```

“这一段代码是，我们的线下商城服务点，在老客户搬走新客户还没搬进来的时候，会出现暂时没有客户的情况。在每个查询客户信息的地方，都需要判断这个服务点有没有客户，然后再根据判断来获取有效信息。”

“`aCustomer === 'unknown'` 这是个特例情况，在这个特例情况下，就会使用到很多临时字段，或者说是特殊值字段。这种重复的判断不仅会来重复代码的问题，也会非常影响核心逻辑的代码可读性，造成理解的困难。”

“这里，我要把所有的重复判断逻辑都移除掉，保持核心逻辑代码的纯粹性。然后，我要把这些临时字段收拢到一个地方，进行统一管理。我们先写两个测试用例。”

```js
describe('test Site', () => {
  test('Site should return correct data when input Customer', () => {
    const input = {
      name: 'jack',
      billingPlan: { num: 100, offer: 50 },
      paymentHistory: { weeksDelinquentInLastYear: 28 }
    };

    const result = new Site(new Customer(input)).customer;

    expect({
      name: result.name,
      billingPlan: result.billingPlan,
      paymentHistory: result.paymentHistory
    }).toStrictEqual(input);
  });

  test('Site should return empty data when input NullCustomer', () => {
    const input = {
      name: 'jack',
      billingPlan: { num: 100, offer: 50 },
      paymentHistory: { weeksDelinquentInLastYear: 28 }
    };

    const result = new Site(new NullCustomer(input)).customer;

    expect({
      name: result.name,
      billingPlan: result.billingPlan,
      paymentHistory: result.paymentHistory
    }).toStrictEqual({
      name: 'occupant',
      billingPlan: { num: 0, offer: 0 },
      paymentHistory: { weeksDelinquentInLastYear: 0 }
    });
  });
});
```

“嗯，这次又是 TDD，第一个用例是可以运行的，运行是可以通过的。”

“接下来，我按这个思路去实现 `NullCustomer`，这个实现起来其实很简单。”

```js
class NullCustomer extends Customer {
  constructor(data) {
    super(data);
    this._name = 'occupant';
    this._billingPlan = { num: 0, offer: 0 };
    this._paymentHistory = {
      weeksDelinquentInLastYear: 0
    };
  }
}
```

“实现完成后，运行一下测试用例。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-12_09-35-35.jpg)

“我引入了这个特例对象后，我只需要在初始化 `Site` 的时候判断老客户搬出新客户还没有搬进来的情况，决定初始化哪一个 `Customer`，而不用在每个调用的地方都判断一次，还引入那么多临时字段了。”

“如果写出来的话，就像是这样一段伪代码。”

```js
// initial.js
const site = customer === 'unknown' ? new Site(new NullCustomer()) : new Site(new Customer(customer));

// Client 1
{
  const aCustomer = site.customer;
  // ... lots of intervening code ...
  const customerName = aCustomer.name;
}

// Client 2
{
  const plan = aCustomer.billingPlan;
}

// Client 3
{
}

// Client 4
{
  const weeksDelinquent = aCustomer.paymentHistory.weeksDelinquentInLastYear;
}
```

“在这里我就不对你们的代码做实际修改了，你们下去以后自己调整一下吧。”

小李小王疯狂点头。

“我们来看一下重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_09-55-50.jpg)

“我们继续下一个。”

## 过长的消息链（Message Chains）

```js
const result = a(b(c(1, d(f()))));
```

“这种坏味道我手写代码演示一下，比如向一个对象请求另一个对象，然后再向后者请求另一个对象，然后再请求另一个对象……这就是消息链。在实际代码中，看到的可能就是一长串取值函数或一长串临时变量。”

“这种一长串的取值函数，可以使用的重构手法就是 `提炼函数`，就像这样。”

```js
const result = goodNameFunc();

function goodNameFunc() {
  return a(b(c(1, d(f()))));
}
```

“再给提炼出来的函数，取一个好名字就行了。”

“还有一种情况，就是委托关系，需要隐藏委托关系。我就不做展开了，你们有兴趣的话去看一看重构那本书吧。“

“我们来看一下重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_09-57-27.jpg)

我们继续下一个。”

## 中间人（Middle Man）

```js
class Product {
  constructor(data) {
    this._name = data.name;
    this._price = createPrice(data.price);
    /* ... */
  }

  get name() {
    return this.name;
  }

  /* ... */

  get price() {
    return this._price.toString();
  }

  get priceCount() {
    return this._price.count;
  }

  get priceUnit() {
    return this._price.unit;
  }

  get priceCnyCount() {
    return this._price.cnyCount;
  }

  get priceSuffix() {
    return this._price.suffix;
  }
}
```

“嗯，这个 `Product` + `Price` 又被我翻出来了，因为经过了两次重构后，它还是存在一些坏味道。”

“现在我要访问 `Product` 价格相关的信息，都是直接通过 `Product` 访问，而 `Product` 负责提供 `price` 的很多接口。随着 `Price` 类的新特性越来越多，更多的转发函数就会使人烦躁，而现在已经有点让人烦躁了。”

“这个 `Product` 类已经快完全变成一个中间人了，那我现在希望调用方应该直接使用 `Price` 类。我们先来写两个测试用例。”老耿开始写代码。

```js
describe('test Product price', () => {
  const products = [
    { name: 'apple', price: '$6' },
    { name: 'banana', price: '￥7' },
    { name: 'orange', price: 'k15' },
    { name: 'cookie', price: '$0.5' }
  ];

  test('Product.price should return correct price when input products', () => {
    const input = [...products];

    const result = input.map(item => new Product(item).price.toString());

    expect(result).toStrictEqual(['6 美元', '7 元', '15 港币', '0.5 美元']);
  });

  test('Product.price should return correct priceCount when input products', () => {
    const input = [...products];

    const result = input.map(item => new Product(item).price.count);

    expect(result).toStrictEqual([6, 7, 15, 0.5]);
  });

  test('Product.price should return correct priceUnit when input products', () => {
    const input = [...products];

    const result = input.map(item => new Product(item).price.unit);

    expect(result).toStrictEqual(['usd', 'cny', 'hkd', 'usd']);
  });

  test('Product.price should return correct priceCnyCount when input products', () => {
    const input = [...products];

    const result = input.map(item => new Product(item).price.cnyCount);

    expect(result).toStrictEqual([42, 7, 12, 3.5]);
  });

  test('Product.price should return correct priceSuffix when input products', () => {
    const input = [...products];

    const result = input.map(item => new Product(item).price.suffix);

    expect(result).toStrictEqual(['美元', '元', '港币', '美元']);
  });
});
```

“写完的测试用例也是不能直接运行的，接下来我们调整 `Product` 类，把中间人移除。”

```js
class Product {
  constructor(data) {
    this._name = data.name;
    this._price = createPrice(data.price);
    /* ... */
  }

  get name() {
    return this.name;
  }

  /* ... */

  get price() {
    return this._price;
  }
}
```

“调整完成后，直接运行测试用例。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-12_10-05-59.jpg)

“测试用例通过了，别忘了把使用到 `Product` 的地方都检查一遍。”

“很难说什么程度的隐藏才是合适的。但是有隐藏委托关系和删除中间人，就可以在系统运行过程中不断进行调整。随着代码的变化，“合适的隐藏程度” 这个尺度也相应改变。”

“我们来看看重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_10-00-07.jpg)

“我们继续下一个吧。”

## 内幕交易（Insider Trading）

```js
class Person {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  get department() {
    return this._department;
  }
  set department(arg) {
    this._department = arg;
  }
}

class Department {
  get code() {
    return this._code;
  }
  set code(arg) {
    this._code = arg;
  }
  get manager() {
    return this._manager;
  }
  set manager(arg) {
    this._manager = arg;
  }
}
```

“在这个案例里，如果要获取 `Person` 的部门代码 `code` 和部门领导 `manager` 都需要先获取 `Person.department`。这样一来，调用者需要额外了解 `Department` 的接口细节，如果 `Department` 类修改了接口，变化会波及通过 `Person` 对象使用它的所有客户端。”

“我们都喜欢在模块之间建起高墙，极其反感在模块之间大量交换数据，因为这会增加模块间的耦合。在实际情况里，一定的数据交换不可避免，但我必须尽量减少这种情况，并把这种交换都放到明面上来。”

“接下来，我们按照我们期望程序运行的方式，来编写两个测试用例。”

```js
describe('test Person', () => {
   test('Person should return 88 when input Department code 88', () => {
       const inputName = 'jack'
       const inputDepartment = new Department();
       inputDepartment.code = 88;
       inputDepartment.manager = 'Tom';

       const result = new Person(inputName, inputDepartment).departmentCode;

       expect(result).toBe(88);
   });

   test('Person should return Tom when input Department manager Tom', () => {
       const inputName = 'jack'
       const inputDepartment = new Department();
       inputDepartment.code = 88;
       inputDepartment.manager = 'Tom';

       const result = new Person(inputName, inputDepartment).manager;

       expect(result).toBe('Tom');
   });
});
```

“在测试用例中，我们可以直接通过 `Person` 得到这个人的部门代码 `departmentCode` 和部门领导 `manager` 了，那接下来，我们把 `Person` 类进行重构。”

```js
class Person {
  constructor(name, department) {
    this._name = name;
    this._department = department;
  }
  get name() {
    return this._name;
  }
  get departmentCode() {
    return this._department.code;
  }
  set departmentCode(arg) {
    this._department.code = arg;
  }
  get manager() {
    return this._department._manager;
  }
  set manager(arg) {
    this._department._manager = arg;
  }
}
```

“这里我直接将修改一步到位，但是你们练习的时候还是要一小步一小步进行重构，发现问题就可以直接回退代码。”老耿语重心长的说道。

小李小王疯狂点头。

“我们回来看代码，在代码里，我把委托关系进行了隐藏，从而客户端对 `Department` 类的依赖。这么一来，即使将来委托关系发生变化，变化也只会影响服务对象 - `Person` 类，而不会直接波及所有客户端。”

“我们运行一下测试代码。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-13_08-43-55.jpg)

“运行通过了，在所有代码替换完成前，可以先保留对 `department` 的访问，在所有代码都修改完成后，再完全移除，提交代码。”

“我们来看看重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_10-01-47.jpg)

“我们继续下一个。”

## 过大的类（Large Class）

“还有一种坏味道叫做 `过大的类`，这里我不用举新的例子了，最早的 `Product` 类其实就存在这样的问题。”

“如果想利用单个类做太多事情，其内往往就会出现太多字段。一旦如此，重复代码也就接踵而至了。二来，过大的类也会造成理解的困难。过大的类和过长的函数都有类似的问题。”

“我们在 `Product` 类中就发现了三个坏味道：基本类型偏执、重复的 switch、中间人。在解决这三个坏味道的过程中，也把 `过大的类` 这个问题给解决了。”

“重构是持续的小步的，你们可以对 `Product` 类除了 `price` 以外的方法再进行多次提炼，我这里就不再演示了。”

小李小王疯狂点头。

“那我们继续讲下一个。”

## 异曲同工的类（Alternative Classes with Different Interfaces）

```js
class Employee {
  constructor(name, id, monthlyCost) {
    this._id = id;
    this._name = name;
    this._monthlyCost = monthlyCost;
  }
  get monthlyCost() {
    return this._monthlyCost;
  }
  get name() {
    return this._name;
  }
  get id() {
    return this._id;
  }
  get annualCost() {
    return this.monthlyCost * 12;
  }
}

class Department {
  constructor(name, staff) {
    this._name = name;
    this._staff = staff;
  }
  get staff() {
    return this._staff.slice();
  }
  get name() {
    return this._name;
  }
  get totalMonthlyCost() {
    return this.staff.map(e => e.monthlyCost).reduce((sum, cost) => sum + cost);
  }
  get headCount() {
    return this.staff.length;
  }
  get totalAnnualCost() {
    return this.totalMonthlyCost * 12;
  }
}
```

“这里有一个坏味道，和重复代码有异曲同工之妙，叫做异曲同工的类。这里我以经典的 `Employee` 案例来讲解一下。”

“在这个案例中，`Employee` 类和 `Department` 都有 `name` 字段，也都有月度成本 `monthlyCost` 和年度成本 `annualCost` 的概念，可以说这两个类其实在做类似的事情。”

“我们可以用提炼超类来组织这种异曲同工的类，来消除重复行为。”

“在此之前，根据我们最后想要实现的效果，我们先编写两个测试用例。”

```js
describe('test Employee and Department', () => {
  test('Employee annualCost should return 600 when input monthlyCost 50', () => {
    const input = {
      name: 'Jack',
      id: 1,
      monthlyCost: 50
    };

    const result = new Employee(input.name, input.id, input.monthlyCost).annualCost;

    expect(result).toBe(600);
  });

  test('Department annualCost should return 888 when input different staff', () => {
    const input = {
      name: 'Dove',
      staff: [{ monthlyCost: 12 }, { monthlyCost: 41 }, { monthlyCost: 24 }, { monthlyCost: 32 }, { monthlyCost: 19 }]
    };

    const result = new Department(input.name, input.staff).annualCost;

    expect(result).toBe(1536);
  });
});
```

“这个测试用例现在运行也是失败的，因为我们还没有把 `Department` 改造完成。接下来，我们先把 `Employee` 和 `Department` 相同的字段和行为提炼出来，提炼成一个超类 `Party`。”

```js
class Party {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  get monthlyCost() {
    return 0;
  }

  get annualCost() {
    return this.monthlyCost * 12;
  }
}
```

“这两个类相同的字段有 `name`，还有计算年度成本 `annualCost` 的方式，因为使用到了 `monthlyCost` 字段，所以我把这个字段也提炼出来，先返回个默认值 0。”

“接下来对 `Employee` 类进行精简，将提炼到超类的部分进行继承。”

```js
class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super(name);
    this._id = id;
    this._monthlyCost = monthlyCost;
  }
  get monthlyCost() {
    return this._monthlyCost;
  }
  get id() {
    return this._id;
  }
}
```

“再接下来对 `Department` 类进行改造，继承 `Party` 类，然后进行精简。”

```js
class Department extends Party {
  constructor(name, staff) {
    super(name);
    this._staff = staff;
  }
  get staff() {
    return this._staff.slice();
  }
  get monthlyCost() {
    return this.staff.map(e => e.monthlyCost).reduce((sum, cost) => sum + cost);
  }
  get headCount() {
    return this.staff.length;
  }
}
```

“这样就完成了改造，运行一下测试用例。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-13_07-45-21.jpg)

“测试通过了。记得把其他使用到这两个类的地方改造完成后再提交代码。”

“如果看见两个异曲同工的类在做相似的事，可以利用基本的继承机制把它们的相似之处提炼到超类。”

“有很多时候，合理的继承关系是在程序演化的过程中才浮现出来的：我发现了一些共同元素，希望把它们抽取到一处，于是就有了继承关系。所以，先尝试用小而快的重构手法，重构后再发现新的可重构结构。”

“我们来看一下重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_10-06-33.jpg)

“我们继续下一个。”

## 纯数据类（Data Class）

```js
class Category {
  constructor(data) {
    this._name = data.name;
    this._level = data.level;
  }

  get name() {
    return this._name;
  }

  set name(arg) {
    this._name = arg;
  }

  get level() {
    return this._level;
  }

  set level(arg) {
    this._level = arg;
  }
}

class Product {
  constructor(data) {
    this._name = data._name;
    this._category = data.category;
  }

  get category() {
    return `${this._category.level}.${this._category.name}`;
  }
}
```

“`Category` 是个纯数据类，像这样的纯数据类，直接使用字面量对象似乎也没什么问题。”

“但是，纯数据类常常意味着行为被放在了错误的地方。比如在 `Product` 有一个应该属于 `Category` 的行为，就是转化为字符串，如果把处理数据的行为从其他地方搬移到纯数据类里来，就能使这个纯数据类有存在的意义。”

“我们先写两个简单的测试用例。”老耿开始写代码。

```js
describe('test Category', () => {
  test('Product.category should return correct data when input category', () => {
    const input = {
      level: 1,
      name: '水果'
    };

    const result = new Product({ name: '苹果', category: new Category(input) }).category;

    expect(result).toBe('1.水果');
  });

  test('Product.category should return correct data when input category', () => {
    const input = {
      level: 2,
      name: '热季水果'
    };

    const result = new Product({ name: '苹果', category: new Category(input) }).category;

    expect(result).toBe('2.热季水果');
  });
});
```

“测试用例写完以后，运行一下... ok，通过了。接下来，我们把本应该属于 `Category` 的行为，挪进来。”

```js
class Category {
  constructor(data) {
    this._name = data.name;
    this._level = data.level;
  }

  get name() {
    return this._name;
  }

  set name(arg) {
    this._name = arg;
  }

  get level() {
    return this._level;
  }

  set level(arg) {
    this._level = arg;
  }

  toString() {
    return `${this._level}.${this._name}`;
  }
}

class Product {
  constructor(data) {
    this._name = data._name;
    this._category = data.category;
  }

  get category() {
    return this._category.toString();
  }
}
```

“然后我们运行一下测试用例。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-12_10-44-19.jpg)

“用例运行成功了，别忘了提交代码。” 老耿打了个 commit。

“我们需要为纯数据赋予行为，或者使用纯数据类来控制数据的读写。否则的话，纯数据类并没有太大存在的意义，应该作为冗赘元素被移除。”

“我们来看一下重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_10-08-24.jpg)

“那我们继续下一个。”

## 被拒绝的遗赠（Refuse Bequest）

```js
class Party {
  constructor(name, staff) {
    this._name = name;
    this._staff = staff;
  }

  get staff() {
    return this._staff.slice();
  }

  get name() {
    return this._name;
  }

  get monthlyCost() {
    return 0;
  }

  get annualCost() {
    return this.monthlyCost * 12;
  }
}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super(name);
    this._id = id;
    this._monthlyCost = monthlyCost;
  }
  get monthlyCost() {
    return this._monthlyCost;
  }
  get id() {
    return this._id;
  }
}

class Department extends Party {
  constructor(name) {
    super(name);
  }
  get monthlyCost() {
    return this.staff.map(e => e.monthlyCost).reduce((sum, cost) => sum + cost);
  }
  get headCount() {
    return this.staff.length;
  }
}
```

“关于这个坏味道，我想改造一下之前那个 `Employee` 和 `Department` 的例子来进行讲解。”

“这个例子可以看到，我把 `staff` 字段从 `Department` 上移到了 `Party` 类，但其实 `Employee` 类并不关心 `staff` 这个字段。这就是 `被拒绝的遗赠` 坏味道。”

“重构手法也很简单，就是把 `staff` 字段下移到真正需要它的子类 `Department` 中就可以了，就像我刚完成提炼超类那时的样子。”

“如果超类中的某个字段或函数只与一个或少数几个子类有关，那么最好将其从超类中挪走，放到真正关心它的子类中去。”

“十有八九这种坏味道很淡，需要对业务熟悉程度较高才能发现。”

“我们来看一下重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_10-11-25.jpg)

“那我们继续下一个。”

## 注释（Comments）

“最后，再提一点，关于 `注释` 的坏味道。”

“我认为，注释并不是坏味道，并且属于一种好味道，但是注释的问题在于很多人是经常把它当作“除臭剂”来使用。”

“你经常会看到，一段代码有着长长的注释，然后发现，这些注释之所以存在乃是因为代码很糟糕，创造它的程序员不想管它了。”

“当你感觉需要写注释时，请先尝试重构，试着让所有注释都变得多余。”

“如果你不知道该做什么，这才是注释的良好运用时机。除了用来记述将来的打算之外，注释还可以用来标记你并无十足把握的区域。你可以在注释里写下自己“为什么做某某事”。这类信息可以帮助将来的修改者，尤其是那些健忘的家伙。”

小李小王疯狂点头。

“好了，那我们这次的特训就到此结束了，你们俩下去以后一定要多多练习，培养识别坏味道的敏感度，然后做到对坏味道的零容忍才行。”

## 小结

虽然标题是 24 大技巧，但是文章却介绍了 24 种代码里常见的坏味道，还有每个坏味道对应的重构手法。

这其实有点类似于设计原则和设计模式的关系，设计原则是道，设计模式是术。

有道者术能长久，无道者术必落空，学术先需明道，方能大成，学术若不明道，终是小器。

这也是本文为什么要介绍 24 种代码里的坏味道，而不是直接介绍重构手法。因为只有识别了代码中的坏味道，才能尽量避免写出坏味道的代码，真正做到尽善尽美，保持软件健康长青。

如果发现了代码里的 `坏味道`，先把这片区域用 `测试用例` 圈起来，然后再利用 `各种重构手法，在不改变软件可观察行为的前提下，调整其结构`，在 `通过测试` 后，第一时间 `提交代码`，保证你的系统随时都处于 `可发布` 状态。

文中的老耿原型其实就是《重构：改善既有代码的设计》的作者们，小王小李指的是团队中那些经常容易把代码写的像打补丁，然后过了一段时间老是想推翻重来的编程新人们（可能是老人），而大宝则像是一名手握屠龙术却不敢直面恶龙的高级工程师。

我以为，重构也需要勇气，开始尝试的勇气。

## 配套练习

我将文中所有的案例都整理到了 `github` 上，每个坏味道都有一个独立的目录，每个目录的结构看起来就像是这样。

- `xx.before.js`：重构前的代码
- `xx.js`：重构后的代码
- `xx.test.js`：配套的测试代码

强烈建议读者们按照文章教程，自行完成一次重构练习，这样可以更好的识别坏味道和掌握重构手法。

下面是对应的链接：

- [神秘命名（Mysterious Name）](https://github.com/a1029563229/Blogs/tree/master/Introduction/refactor/practice/src/神秘命名)
- [重复代码（Repeat Code）](https://github.com/a1029563229/Blogs/tree/master/Introduction/refactor/practice/src/重复代码)
- [过长函数（Long Function）](https://github.com/a1029563229/Blogs/tree/master/Introduction/refactor/practice/src/过长函数)
- [过长参数列表（Long Parameter List）](https://github.com/a1029563229/Blogs/tree/master/Introduction/refactor/practice/src/过长参数列表)
- [全局数据（Global Data）](https://github.com/a1029563229/Blogs/tree/master/Introduction/refactor/practice/src/全局数据)
- [可变数据（Mutable Data）](https://github.com/a1029563229/Blogs/tree/master/Introduction/refactor/practice/src/可变数据)
- [发散式变化（Divergent Change）](https://github.com/a1029563229/Blogs/tree/master/Introduction/refactor/practice/src/发散式变化)
- [霰弹式修改（Shotgun Surgery）](https://github.com/a1029563229/Blogs/tree/master/Introduction/refactor/practice/src/霰弹式修改)
- [依恋情节（Feature Envy）](https://github.com/a1029563229/Blogs/tree/master/Introduction/refactor/practice/src/依恋情节)
- [数据泥团（Data Clumps）](https://github.com/a1029563229/Blogs/tree/master/Introduction/refactor/practice/src/数据泥团)
- [基本类型偏执（Primitive Obsession）](https://github.com/a1029563229/Blogs/tree/master/Introduction/refactor/practice/src/基本类型偏执)
- [重复的 switch（Repeated switch）](https://github.com/a1029563229/Blogs/tree/master/Introduction/refactor/practice/src/重复的switch)
- [循环语句（Loop）](https://github.com/a1029563229/Blogs/tree/master/Introduction/refactor/practice/src/循环语句)
- [冗赘的元素（Lazy Element）](https://github.com/a1029563229/Blogs/tree/master/Introduction/refactor/practice/src/冗赘的元素)
- [夸夸其谈通用性（Speculative Generality）](https://github.com/a1029563229/Blogs/tree/master/Introduction/refactor/practice/src/夸夸其谈通用性)
- [临时字段（Temporary Field）](https://github.com/a1029563229/Blogs/tree/master/Introduction/refactor/practice/src/临时字段)
- [过长的消息链（Message Chains）](https://github.com/a1029563229/Blogs/tree/master/Introduction/refactor/practice/src/过长的消息链)
- [中间人（Middle Man）](https://github.com/a1029563229/Blogs/tree/master/Introduction/refactor/practice/src/中间人)
- [内幕交易（Insider Trading）](https://github.com/a1029563229/Blogs/tree/master/Introduction/refactor/practice/src/内幕交易)
- [过大的类（Large Class）](https://github.com/a1029563229/Blogs/tree/master/Introduction/refactor/practice/src/过大的类)
- [异曲同工的类（Alternative Classes with Different Interfaces）](https://github.com/a1029563229/Blogs/tree/master/Introduction/refactor/practice/src/异曲同工的类)
- [纯数据类（Data Class）](https://github.com/a1029563229/Blogs/tree/master/Introduction/refactor/practice/src/纯数据类)
- [被拒绝的遗赠（Refuse Bequest）](https://github.com/a1029563229/Blogs/tree/master/Introduction/refactor/practice/src/被拒绝的遗赠)
- [注释（Comments）](https://github.com/a1029563229/Blogs/tree/master/Introduction/refactor/practice/src/注释)

## 最后一件事

如果您已经看到这里了，希望您还是点个赞再走吧~

您的点赞是对作者的最大鼓励，也可以让更多人看到本篇文章！

如果觉得本文对您有帮助，请帮忙在 [github](https://github.com/a1029563229/Blogs) 上点亮 `star` 鼓励一下吧！