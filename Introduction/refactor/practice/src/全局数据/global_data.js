let userAuthInfo = {
  platform: 'pc',
  token: ''
};

function getUserAuthInfo() {
  return { ...userAuthInfo };
}

function setToken(token) {
  userAuthInfo.token = token;
}

module.exports = {
  getUserAuthInfo,
  setToken
};
