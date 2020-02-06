module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended'],
  plugins: [],
  // add your custom rules here

  rules: {
    'no-console': 'off',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'arrow-parens': ['error', 'as-needed'],
    'no-unexpected-multiline': ['error', 'no-spaced-func'],
    'no-multiple-empty-lines': ['error', { max: 2 }],
    'vue/max-attributes-per-line': [2, { singleline: 7 }]
  }
}
