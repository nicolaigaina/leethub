module.exports = {
  extends: "../../eslint-config-global.js",
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
        require('path').resolve(__dirname, './'),
        require('path').resolve(__dirname, '../../')]
      }
    ]
  }
}
