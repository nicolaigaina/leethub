const path = require('path');

module.exports = {
  extends: "../../.eslintrc.json",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        packageDir: [process.cwd(),
        path.resolve(__dirname, './')]
      }
    ]
  }
}
