import query from '@tanstack/eslint-plugin-query';
import _import from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import reactReflesh from 'eslint-plugin-react-refresh';
import unusedImport from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    // files: ["src/**/*.ts", "src/**/*.tsx", "**/*.mjs"],
    ignores: ['docs/**', 'node_modules/**', 'coverage/**'],
    languageOptions: {
      parser: tseslint.parser,
    },
    plugins: {
      'import': _import,
      'react-hooks': reactHooks,
      'react-reflesh': reactReflesh,
      'unused-imports': unusedImport,
      '@tanstack/query': query,
    },
    rules: {
      ...tseslint.configs.strictTypeChecked.rules,
      ...tseslint.configs.stylisticTypeChecked.rules,
      ...reactHooks.configs.recommended.rules,
      ..._import.configs.rules,
      ...query.configs.recommended.rules,
      'no-useless-escape': 'warn',
      'linebreak-style': ['error', 'unix'],
      'quotes': ['warn', 'single'],
      'import/order': [
        'error',
        {
          'groups': [
            'builtin',
            'external',
            'internal',
            [
              'parent',
              'sibling',
            ],
            'object',
            'type',
            'index',
          ],
          'alphabetize': {
            'order': 'asc',
            'caseInsensitive': true,
          },
        },
      ],
      'react-reflesh/only-export-components': [
        'error',
        {
          'allowConstantExport': true,
        },
      ],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          'vars': 'all',
          'varsIgnorePattern': '^_',  
          'args': 'after-used',
          'argsIgnorePattern': '^_',
        },
      ],
    },
  },
);
