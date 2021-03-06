module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'jest/globals': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:flowtype/recommended',
    'plugin:jest/recommended',
    'plugin:react/recommended',
  ],
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
      'jsx': true,
    },
    'sourceType': 'module',
  },
  'plugins': [
    'eslint-comments',
    'flowtype',
    'jest',
    'react',
  ],
  'settings': {
    'react': {
      'version': 'detect',
      'flowVersion': '0.104'
    }
  },
  'rules': {
    'array-callback-return': [ 'error', ],
    'comma-dangle': [ 'error', 'only-multiline', ],
    'curly': [ 'error', ],
    'dot-location': [ 'error', 'property', ],
    'dot-notation': [ 'error', ],
    'eqeqeq': [ 'error', ],
    'guard-for-in': [ 'error', ],
    'indent': [ 'error', 2, { 'SwitchCase': 1, }, ],
    'linebreak-style': [ 'error', 'unix', ],
    'no-await-in-loop': [ 'error', ],
    'no-console': [ 'warn', ],
    'no-eval': [ 'error', ],
    'no-extra-bind': [ 'error', ],
    'no-extra-label': [ 'error', ],
    'no-floating-decimal': [ 'error', ],
    'quotes': [ 'error', 'single', { 'allowTemplateLiterals': true, 'avoidEscape': true, }, ],
    'react/prop-types': [ 'off', ],
    'semi': [ 'error', 'always', ],
    'wrap-iife': [ 'error', ],
    'yoda': [ 'error', ],
  },
};
