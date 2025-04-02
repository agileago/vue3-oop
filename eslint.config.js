import { defineConfig } from '@configurajs/eslint'

export default defineConfig({
  ignores: ['docs'],
  rules: {
    curly: 'off',
    eqeqeq: 'warn',
    'vue/multi-word-component-names': 'off',
    'vue/no-deprecated-v-on-native-modifier': 'off',
    'vue/no-mutating-props': 'off',
    'no-unused-vars': 'off',
    'no-loss-of-precision': 'off',
    'no-undef': 'off',
    'no-empty': 'off',
    'no-func-assign': 'off',
    'no-prototype-builtins': 'off',
    'no-cond-assign': 'off',
    'no-debugger': 'off',
    'eslint-comments/no-unlimited-disable': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
  },
})
