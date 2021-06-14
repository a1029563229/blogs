const Person = require('./data_clump');

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
