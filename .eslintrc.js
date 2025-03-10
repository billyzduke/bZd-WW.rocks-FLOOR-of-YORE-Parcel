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
    'default-case': 'off',
    'func-names': 'off',
    'import/no-cycle': 'off',
    'import/no-named-as-default': 0,
    'import/prefer-default-export': 'off',
    indent: [ 'error',
      2,
      {
        SwitchCase: 1,
      } ],
    'max-len': 'off',
    'multiline-ternary': [ 'error', 'always-multiline' ],
    'no-console': 'off',
    'no-multi-assign': 'off',
    'no-multiple-empty-lines': [ 'error',
      {
        max: 2,
        maxBOF: 0,
        maxEOF: 1,
      } ],
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-trailing-spaces': [ 'error', {} ],
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'one-var': 'off',
    'one-var-declaration-per-line': 'off',
    'object-curly-spacing': [ 'error', 'always' ],
    'object-shorthand': 'off',
    'prefer-arrow-callback': [ 'warn', { allowNamedFunctions: true } ],
    quotes: [ 'error',
      'single',
      {
        allowTemplateLiterals: true,
        avoidEscape: true,
      } ],
    semi: [ 'error', 'never' ],
    'space-in-parens': [ 'error', 'always' ],
  },
}
