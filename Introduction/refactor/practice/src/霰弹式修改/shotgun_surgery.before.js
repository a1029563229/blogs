// File Reading.js
const reading = {customer: "ivan", quantity: 10, month: 5, year: 2017};
function acquireReading() { return reading };
function baseRate(month, year) {
    /* */
}

// File 1
const aReading = acquireReading();
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;

// File 2
const aReading = acquireReading();
const base = (baseRate(aReading.month, aReading.year) * aReading.quantity);
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));
function taxThreshold(year) { /* */ }

// File 3
const aReading = acquireReading();
const basicChargeAmount = calculateBaseCharge(aReading);
function calculateBaseCharge(aReading) {
  return baseRate(aReading.month, aReading.year) * aReading.quantity;
}