function reportLines(aCustomer) {
  return [
    ['name', aCustomer.name],
    ['location', aCustomer.location]
  ];
}

module.exports = reportLines;
