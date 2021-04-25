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
    'import/prefer-default-export': ['warn'],
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '_' }],
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
        'cypress/no-unnecessary-waiting': 'warn',
      },
    },
  ],
  parserOptions: {
    project: 'tsconfig.eslint.json',
  },
};
