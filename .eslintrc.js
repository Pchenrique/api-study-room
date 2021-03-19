module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'class-methods-use-this': 'off',
    strict: [0, 'global'],
    'consistent-return': 'off',
    'no-param-reasssign': 'off',
    typeof: false
  }
}
