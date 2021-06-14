const { Employee, Department } = require('./alternative_classes_with_different_interfaces');

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
