function acquireCityData(input, country) {
  let lines = input.split('\n');
  return lines
    .slice(1)
    .filter(line => line.trim() !== '')
    .map(line => line.split(','))
    .filter(record => record[1].trim() === country)
    .map(record => ({ city: record[0].trim(), phone: record[2].trim() }));
}

module.exports = acquireCityData;
