const tsEslint = require('typescript-eslint');
const eslint = require('@eslint/js');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = [
    eslint.configs.recommended,
    ...tsEslint.configs.recommended,
    {
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
    eslintConfigPrettier,
];
