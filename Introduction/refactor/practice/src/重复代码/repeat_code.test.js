const { renderPerson, photoDiv } = require('./repeat_code');

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
