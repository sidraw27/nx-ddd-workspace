module.exports = {
  extends: [
    '../../.eslintrc.node.js',
  ],
  overrides: [
    {
      files: ['*.ts', '*.js'],
      rules: {
        'indent': ['error', 2, { 'ignoredNodes': ['PropertyDefinition'] }],
      },
      settings: {
        "import/resolver": {
          node: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
            moduleDirectory: ['src', 'node_modules'],
          },
        },
      },
    }
  ],
};
