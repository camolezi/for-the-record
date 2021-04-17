module.exports = {
  extends: ['airbnb-typescript-prettier'],
  rules: {
    '@typescript-eslint/ban-types': ['warn'],
    'no-use-before-define': 'off',
    'import/prefer-default-export': ['warn'],
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '_' }],
  },
  parserOptions: {
    project: 'tsconfig.eslint.json',
  },
};
