const { getUserAuthInfo, setToken } = require('./global_data');

describe("test global data", () => {
    test('getUserAuthInfo.platform should return pc when modify reference', () => {
        const userAuthInfo = getUserAuthInfo();
        userAuthInfo.platform = 'app';

        const result = getUserAuthInfo().platform;

        expect(result).toBe('pc');
    });

    test('getUserInfo.token should return test-token when setToken test-token', () => {
       setToken('test-token');

       const result = getUserAuthInfo().token;

       expect(result).toBe('test-token');
    });
});