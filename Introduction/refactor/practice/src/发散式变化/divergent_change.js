function calBasePrice(order) {
    return order.quantity * order.itemPrice;
}

function calDiscount(order) {
    return Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
}

function calShipping(basePrice) {
    return Math.min(basePrice * 0.1, 100);
}

function getPrice(order) {
    return calBasePrice(order) - calDiscount(order) + calShipping(calBasePrice(order));
}

module.exports = getPrice;