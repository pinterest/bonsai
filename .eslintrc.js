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
  'rules': {
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1,
      },
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'quotes': [
      'error',
      'single',
      {
        'allowTemplateLiterals': true,
        'avoidEscape': true,
      },
    ],
    'semi': [
      'error',
      'always',
    ],
    'comma-dangle': [
      'error',
      'only-multiline',
    ],
    'no-console': [
      'warn',
    ],
    'react/prop-types': [
      'off',
    ],
  },
};
