// global.js
// ...
let userAuthInfo = {
  platform: 'pc',
  token: ''
}

export {
  userAuthInfo
};

// main.js
userAuthInfo.token = localStorage.token;

// request.js
const reply = await login();
userAuthInfo.token = reply.data.token;

// business.js
await request({ authInfo: userAuthInfo });