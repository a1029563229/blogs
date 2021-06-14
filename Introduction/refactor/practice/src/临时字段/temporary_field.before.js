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