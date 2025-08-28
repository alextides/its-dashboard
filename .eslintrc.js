module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/recommended', '@vue/airbnb'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: 'off',
    'max-len': 'off',
    'linebreak-style': 'off',
    camelcase: 'off',
    'arrow-parens': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'eol-last': 'off',
    'no-trailing-spaces': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/html-self-closing': 'off',
  },
}
