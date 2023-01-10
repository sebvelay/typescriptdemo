module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: 'standard-with-typescript',
  overrides: [],
  ignorePatterns: ['**/built/*.js'],
  rules: {},
  parserOptions: {
    ecmaVersion: 'latest',
    project:
            ['./tsconfig.json']
  }
}
