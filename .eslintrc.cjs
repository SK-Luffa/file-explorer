/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'prettier/prettier': [
      'error',
      {
        printWidth: 80,
        trailingComma: 'all',
        singleQuote: true,
      },
    ],
  },
  plugins: ['prettier'],
};
