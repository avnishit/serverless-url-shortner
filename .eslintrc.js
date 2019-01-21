module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true,
    commonjs: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'plugin:flowtype/recommended'],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
    sourceType: 'module',
  },
  globals: {},
  settings: {},
  plugins: ['flowtype'],
  rules: {
    'no-unused-vars': ['error', { args: 'all', argsIgnorePattern: '^_' }],
    'linebreak-style': ['error', 'unix'],
    quotes: 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    semi: ['error', 'always'],
    'react/display-name': 'off',
    'flowtype/generic-spacing': 'off',
    'flowtype/space-after-type-colon': 'off',
  },
};
