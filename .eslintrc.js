module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    indent: ['ignore', 4],
    'linebreak-style': ['ignore', 'unix'],
    quotes: ['ignore', 'single'],
    semi: ['ignore', 'never'],
  },
};
