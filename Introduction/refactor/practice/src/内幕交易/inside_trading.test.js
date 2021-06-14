const { Person, Department } = require('./inside_trading');

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