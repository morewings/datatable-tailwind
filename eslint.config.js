import eslint from '@eslint/js';
import eslintTS from 'typescript-eslint';
import tailwindPlugin from 'eslint-plugin-tailwindcss';
import configReactRecommended from 'eslint-plugin-react/configs/recommended.js';
import configReactJSXRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';
import {fixupPluginRules} from '@eslint/compat';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';

export default [
    eslint.configs.recommended,
    ...eslintTS.configs.recommended,
    ...eslintTS.configs.stylistic,
    ...tailwindPlugin.configs['flat/recommended'],
    configReactRecommended,
    configReactJSXRuntime,
    {
        files: ['**/*.{js,ts,tsx,cjs}'],
        plugins: {
            'react-hooks': fixupPluginRules(pluginReactHooks),
            'react-refresh': pluginReactRefresh,
        },
        rules: {
            ...pluginReactHooks.configs.recommended.rules,
            /**
             * Allow empty arrow functions `() => {}`, while keeping other empty functions restricted
             * @see https://eslint.org/docs/latest/rules/no-empty-function#allow-arrowfunctions
             */
            '@typescript-eslint/no-empty-function': ['error', {allow: ['arrowFunctions']}],
            /* Required by vite */
            'react-refresh/only-export-components': ['warn', {allowConstantExport: true}],
            '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
            /**
             * Allow unused variables with names stating with '_'
             * @see https://eslint.org/docs/latest/rules/no-unused-vars
             * @see https://typescript-eslint.io/rules/no-unused-vars/
             */
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                    args: 'after-used',
                },
            ],
        },
    }
]

// export default tseslint.config(
//   { ignores: ['dist'] },
//   {
//     extends: [js.configs.recommended, ...tseslint.configs.recommended],
//     files: ['**/*.{ts,tsx}'],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//     },
//     plugins: {
//       'react-hooks': reactHooks,
//       'react-refresh': reactRefresh,
//     },
//     rules: {
//       ...reactHooks.configs.recommended.rules,
//       'react-refresh/only-export-components': [
//         'warn',
//         { allowConstantExport: true },
//       ],
//     },
//   },
// )
