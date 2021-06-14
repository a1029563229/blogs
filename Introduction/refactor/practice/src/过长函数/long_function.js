function printBanner() {
  console.log('***********************');
  console.log('**** Customer Owes ****');
  console.log('***********************');
}

function calOutstanding(invoice) {
  let outstanding = 0;
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }
  return outstanding;
}

function recordDueDate(invoice) {
  const today = new Date(Date.now());
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
}

function printDetails(invoice, outstanding) {
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
  console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
}

function printOwing(invoice) {
  printBanner();
  let outstanding = calOutstanding(invoice);
  recordDueDate(invoice);
  printDetails(invoice, outstanding);
}

module.exports = printOwing;
