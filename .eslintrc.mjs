/* eslint-env node */
import '@rushstack/eslint-patch/lib/patch-eslint';

export default {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript',
    'plugin:tailwindcss/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/script-setup-uses-vars': 'error',
    'tailwindcss/classnames-order': 'warn',
    'tailwindcss/no-custom-classname': 'off',
  },
};
