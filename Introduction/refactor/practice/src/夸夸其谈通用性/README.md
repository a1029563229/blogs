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