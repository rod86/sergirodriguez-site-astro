import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

export default defineConfig(
    {
        ignores: ['dist/', '.astro/', 'coverage/', 'node_modules/'],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...astro.configs['flat/recommended'],
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser,
            },
        },
    },
    {
        rules: {
            indent: ['error', 4],
        },
    },
);
