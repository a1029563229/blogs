const { Site, Customer, NullCustomer } = require('./temporary_field');

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
