const Shipment = require('./speculative_generality');

describe('test Shipment', () => {
    test('Shipment should return correct trackingInfo when input trackingInfo', () => {
        const input = {
            shippingCompany: '顺丰',
            trackingNumber: '87349189841231'
        };

        const result = new Shipment(input.shippingCompany, input.trackingNumber).trackingInfo;

        expect(result).toBe('顺丰: 87349189841231');
    });

    test('Shipment should return correct trackingInfo when input trackingInfo', () => {
        const input = {
            shippingCompany: '中通',
            trackingNumber: '1281987291873'
        };

        const result = new Shipment(input.shippingCompany, input.trackingNumber).trackingInfo;

        expect(result).toBe('中通: 1281987291873');
    });
});