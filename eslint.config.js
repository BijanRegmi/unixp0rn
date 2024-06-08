const tsEslint = require('typescript-eslint');
const eslint = require('@eslint/js');

module.exports = [
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
