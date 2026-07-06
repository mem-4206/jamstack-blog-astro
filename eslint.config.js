import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import * as astroEslintParser from 'astro-eslint-parser';
import eslintPluginAstro from 'eslint-plugin-astro';
import globals from 'globals';
import configPrettier from 'eslint-config-prettier';

export default [
    {
        languageOptions: {
            globals: {
                // グローバル変数を設定
                ...globals.browser,
                ...globals.node
            }
        }
    },
    eslint.configs.recommended, // JavaScriptのおすすめ設定を追加
    ...tseslint.configs.recommended, // TypeScriptのおすすめ設定を追加
    ...eslintPluginAstro.configs['flat/recommended'], // Astroのおすすめ設定を追加

    {
        files: ['**/*.astro'], // .astroの設定
        languageOptions: {
            parser: astroEslintParser, // パーサーを設定
            parserOptions: {
                parser: '@typescript-eslint/parser', // TypeScriptのパーサーを設定
                extraFileExtensions: ['.astro']
            }
        },
        rules: {
            // 手動で好みの設定を追加
            'prefer-const': 2, // 再代入がない限り const を強制
            'no-console': 'off', // console.log();OK
            'no-var': 2, // var禁止
            'no-unused-vars': 'off', // 使っていない変数あってもOK
            'computed-property-spacing': 2, // 配列のindexには空白入れない
            '@typescript-eslint/no-explicit-any': 2 // any禁止
        }
    },
    {
        ignores: ['dist', 'node_modules', '.github', '.astro'] // ESLintの対象外を指定
    },
    configPrettier // Prettierとの競合をなくす
];
