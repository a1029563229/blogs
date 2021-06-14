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

module.exports = Shipment;