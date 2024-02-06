module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'standard', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'array-callback-return': 'off',
    'react/prop-types': 'off',
    'no-extra-boolean-cast': 'off',
    'eslint-disable-next-line': 'off',
    camelcase: 'off',
  },
}
