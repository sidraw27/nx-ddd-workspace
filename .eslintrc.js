module.exports = {
  root: true,
  ignorePatterns: ['.eslintrc.js', '.eslintrc.json'],
  plugins: [
    '@nrwl/nx',
    'import',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/no-shadow': 2,
        '@typescript-eslint/type-annotation-spacing': 2,
        '@nrwl/nx/enforce-module-boundaries': [
          'error',
          {
            'enforceBuildableLibDependency': true,
            'allow': [],
            'depConstraints': [
              {
                'sourceTag': '*',
                'onlyDependOnLibsWithTags': ['*']
              }
            ]
          }
        ],
        'no-shadow': 0,
        'no-multiple-empty-lines': [
          'error',
          {
            max: 1,
            maxEOF: 0,
          }
        ],
        'semi': [2, 'always'],
        'object-curly-spacing': [2, 'always'],
        'quotes': [2, 'single'],
        'import/order': [
          2,
          {
            groups: [
              'index',
              'sibling',
              'parent',
              'internal',
              'external',
              'builtin',
              'object',
              'type',
            ],
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
            warnOnUnassignedImports: true,
          }
        ],
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@nrwl/nx/typescript'],
      rules: {}
    },
    {
      files: ['*.js', '*.jsx'],
      extends: ['plugin:@nrwl/nx/javascript'],
      rules: {}
    },
    {
      files: ['*.spec.ts', '*.spec.tsx', '*.spec.js', '*.spec.jsx'],
      env: {
        'jest': true
      },
      rules: {}
    }
  ]
}
