module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    quotes: [
      'error',
      'single',
    ],
    semi: [
      'error',
      'always',
    ],
    'object-curly-spacing': [
      'error',
      'always',
    ],
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
        mode: 'strict',
      },
    ],
    'space-before-function-paren': [
      'error', {
        anonymous: 'ignore',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'space-infix-ops': [
      'error',
    ],
    'no-trailing-spaces': [
      'error', {
        skipBlankLines: false,
        ignoreComments: true,
      },
    ],
    'arrow-parens': [
      'error',
      'as-needed',
    ],
    indent: [
      'error',
      2,
      { SwitchCase: 1 },
    ],
    'object-curly-newline': 0,
    'import/no-cycle': 0,
    'linebreak-style': 0,
  },
};
