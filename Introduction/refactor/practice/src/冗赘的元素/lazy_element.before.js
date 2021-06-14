function reportLines(aCustomer) {
  const lines = [];
  gatherCustomerData(lines, aCustomer);
  return lines;
}

function gatherCustomerData(out, aCustomer) {
  out.push(['name', aCustomer.name]);
  out.push(['location', aCustomer.location]);
}
