module.exports = { //eslint-disable-line
  'env': {
    'browser': true,
    'es6': true,
    'jest/globals': true // ,
    //'cypress/globals': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': [
    'react', 'jest'// , 'cypress'
  ],
  'rules': {
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'no-console': 0,
  },
  'settings': {
    'react': {
      'version': 'detect'
    }
  }
};
