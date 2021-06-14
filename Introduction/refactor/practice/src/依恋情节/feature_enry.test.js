const { Account, AccountType } = require('./feature_enry');

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
