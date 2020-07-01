module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    sourceType: 'module'
  },
  extends: [
    'plugin:react/recommended',
    'airbnb'
  ],
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'js': 'never',
        'jsx': 'never',
        'ts': 'never',
        'tsx': 'never'
      }
    ],
    'react/jsx-filename-extension': [
      1,
      {
        'extensions': [
          '.ts',
          '.tsx'
        ]
      }
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        packageDir: [process.cwd(),
        require('path').resolve(__dirname, './')]
      }
    ]
  },
  settings: {
    'import/extensions': [
      '.js',
      '.jsx',
      '.ts',
      '.tsx'
    ],
    'import/parsers': {
      '@typescript-eslint/parser': [
        '.ts',
        '.tsx'
      ]
    },
    'import/resolver': {
      'node': {
        'extensions': [
          '.js',
          '.jsx',
          '.ts',
          '.tsx'
        ]
      }
    }
  }
}
