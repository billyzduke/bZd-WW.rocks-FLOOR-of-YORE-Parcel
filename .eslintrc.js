module.exports = {
  extends: 'airbnb-base',
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      modules: true,
    },
  },
  rules: {
    'array-bracket-newline': [ 'error',
      {
        minItems: 4,
      } ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'array-element-newline': [ 'error',
      {
        minItems: 4,
        multiline: true,
      } ],
    'arrow-parens': [ 'error', 'as-needed' ],
    'comma-spacing': [ 'error',
      {
        before: false,
        after: true,
      } ],
    'comma-dangle': [ 'error', 'always-multiline' ],
    'import/no-named-as-default': 0,
    indent: [ 'error',
      2,
      {
        SwitchCase: 1,
      } ],
    'max-len': 'off',
    'multiline-ternary': [ 'error', 'always-multiline' ],
    'no-console': 'off',
    'no-multiple-empty-lines': [ 'error',
      {
        max: 2,
        maxBOF: 0,
        maxEOF: 1,
      }],
    'no-plusplus': 'off',
    'no-trailing-spaces': [ 'error', {} ],
    'object-curly-spacing': [ 'error', 'always' ],
    quotes: [ 'error',
      'single',
      {
        allowTemplateLiterals: true,
        avoidEscape: true,
      } ],
    semi: [ 'error', 'never' ],
  },
}
