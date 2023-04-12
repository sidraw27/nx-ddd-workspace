module.exports = {
  extends: [
    '.eslintrc.js',
    'plugin:@nrwl/nx/react-typescript',
    'next',
  ],
  overrides: [
    {
      files: ['*.tsx', '*.jsx'],
      rules: {
        'jsx-quotes': [2, 'prefer-double'],
        'react/button-has-type': [2],
        'react/jsx-uses-react': [2],
        'react/jsx-uses-vars': [2],
        'react/hook-use-state': [2, {
          allowDestructuredState: true
        }],
        'react/jsx-closing-bracket-location': [2, {
          nonEmpty: 'tag-aligned',
          selfClosing: 'tag-aligned'
        }],
        'react/jsx-closing-tag-location': [2],
        'react/jsx-max-props-per-line': [2, {
          maximum: 1,
          when: 'multiline',
        }],
        'react/jsx-first-prop-new-line': [2, 'multiline-multiprop'],
        'react/jsx-indent': [2, 2],
        'react/jsx-indent-props': [2, 2],
        'react/jsx-props-no-multi-spaces': [2],
        'react/jsx-sort-props': [2, {
          noSortAlphabetically: true,
          callbacksLast: true,
          reservedFirst: ['dangerouslySetInnerHTML'],
        }],
        'react/jsx-tag-spacing': [2, {
          beforeSelfClosing: 'always'
        }],
        'react/self-closing-comp': [2, {
          component: true,
          html: true,
        }]
      }
    }
  ]
}
