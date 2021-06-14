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

module.exports = {
    Site,
    Customer,
    NullCustomer
}