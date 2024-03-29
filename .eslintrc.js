module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'plugin:compat/recommended'],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  globals: {
    APP_TYPE: true,
  },
  rules: {
    'no-unused-vars': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'react/jsx-wrap-multilines': 0,
    'react/jsx-closing-bracket-location': [
      1,
      {
        selfClosing: 'after-props',
        nonEmpty: 'after-props',
      },
    ],
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-one-expression-per-line': 0,
    'import/no-unresolved': [2, { ignore: ['^@/', '^umi/'] }],
    'import/no-extraneous-dependencies': [2, { optionalDependencies: true }],
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/alt-text': 0,
    'linebreak-style': 0,
  },
  settings: {
    polyfills: ['fetch', 'promises', 'url'],
  },
};
