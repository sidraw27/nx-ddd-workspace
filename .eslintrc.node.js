module.exports = {
  extends: [
    '.eslintrc.js',
  ],
  overrides: [
    {
      files: ['*.ts', '*.js'],
      rules: {
        '@typescript-eslint/interface-name-prefix': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-explicit-any': 0,
        'class-methods-use-this': 0,
        'lines-between-class-members': [
          2,
          'always',
          {
            'exceptAfterSingleLine': true
          },
        ],
        'no-useless-constructor': 0,
        'import/no-cycle': 0,
        'import/prefer-default-export': 0,
        'indent': [
          'error', 2, {
            'ignoredNodes': [
              'PropertyDefinition',
            ],
          },
        ],
      },
    }
  ],
}
