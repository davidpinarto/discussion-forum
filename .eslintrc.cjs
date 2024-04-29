module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'import/prefer-default-export': 'off',
    'react/button-has-type': 'off',
    'react/prop-types': 'off',
    'no-alert': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'no-case-declarations': 'off',
    'consistent-return': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
