const tsEslint = require('typescript-eslint');
const eslint = require('@eslint/js');
const eslintConfigPrettier = require('eslint-config-prettier');
const reactRefresh = require('eslint-plugin-react-refresh');

module.exports = [
    eslint.configs.recommended,
    ...tsEslint.configs.recommended,
    {
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
    {
        files: ['./apps/frontend/**/*.ts', './apps/frontend/**/*.tsx'],
        env: { browser: true, es2020: true },
        rules: {
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
        },
        ...reactRefresh,
    },
    eslintConfigPrettier,
];
