module.exports = {
  extends: ['airbnb-typescript-prettier'],
  plugins: ['testing-library'],
  rules: {
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
  ],
  parserOptions: {
    project: 'tsconfig.eslint.json',
  },
};
