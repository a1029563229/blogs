module.exports = {
  "root": true,
  "parserOptions": {
    "sourceType": "module",
    "parser": "babel-eslint"
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "extends": [
    "standard",
    "prettier"
  ],
  "rules": {
    "no-debugger": "error",
    "no-console": "off",
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "eqeqeq": "warn"
  }
};