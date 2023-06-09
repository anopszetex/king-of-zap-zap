module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'google',
    'eslint:recommended',
    'plugin:import/recommended',
    'prettier',
    'plugin:promise/recommended',
    'eslint-config-prettier',
    'plugin:node/recommended',
    'plugin:security-node/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'new-cap': 'off',
    'no-invalid-this': 'off',
    'require-jsdoc': 'off',
    'valid-jsdoc': 'off',
    'no-console': 2,
  },
};
