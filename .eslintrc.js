module.exports = {
  extends: ['airbnb-typescript-prettier'],
  plugins: ['testing-library', 'cypress'],
  rules: {
    'import/no-extraneous-dependencies': [
      'warn',
      {
        devDependencies: false,
      },
    ],
    'react/jsx-props-no-spreading': ['warn'],
    '@typescript-eslint/ban-types': ['warn'],
    'no-use-before-define': 'off',
    'import/prefer-default-export': ['off'],
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '_' }],
    '@typescript-eslint/no-empty-function': ['off'],
    'react/require-default-props': ['off'],
    'no-debugger': 'warn',
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
    {
      files: ['**/cypress/**/*.[jt]s?(x)'],
      extends: ['plugin:testing-library/react', 'plugin:cypress/recommended'],
      rules: {
        'testing-library/await-async-utils': 'off',
        'cypress/no-unnecessary-waiting': 'warn',
        'testing-library/prefer-screen-queries': 'off',
        'testing-library/await-async-query': 'off',
      },
    },
  ],
  parserOptions: {
    project: 'tsconfig.eslint.json',
  },
};
