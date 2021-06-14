// range.js
function priceRange(products, min, max, isOutSide) {
  if (isOutSide) {
    return products
      .filter(r => r.price < min || r.price > max);
  } else {
    return products
      .filter(r => r.price > min && r.price < max);
  }
}

// a.js
const range = { min: 1, max: 10 }
const outSidePriceProducts = priceRange(
  [ /* ... */ ],
  range.min,
  range.max,
  true
)

// b.js
const range = { min: 5, max: 8 }
const insidePriceProducts = priceRange(
  [ /* ... */ ],
  range.min,
  range.max,
  false
)