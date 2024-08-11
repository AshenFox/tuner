module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.app.json', './server/tsconfig.server.json'],
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    'linebreak-style': [1, 'unix'],
    'react/react-in-jsx-scope': 0,
    'react/function-component-definition': [
      1,
      {
        namedComponents: 'arrow-function',
      },
    ],
    '@typescript-eslint/comma-dangle': [
      1,
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    'arrow-parens': ['error', 'as-needed'],
    '@typescript-eslint/indent': [
      'error',
      2,
      {
        ignoredNodes: ['TSTypeParameterInstantiation'],
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variableLike',
        format: ['camelCase', 'PascalCase', 'strictCamelCase', 'snake_case'],
      },
    ],
    'no-console': [
      'error',
      {
        allow: ['info', 'error'],
      },
    ],
    'no-restricted-exports': [
      'error',
      {
        restrictDefaultExports: {
          defaultFrom: false,
        },
      },
    ],
    'object-curly-newline': 'off',
    'react/jsx-one-expression-per-line': ['error', { allow: 'single-child' }],
    curly: 'off',
    'operator-linebreak': 'off',
    'nonblock-statement-body-position': 'off',
  },
};
