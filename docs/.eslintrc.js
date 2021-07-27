module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-multiple-template-root': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': [
      'warn',
      {
        printWidth: 120,
        endOfLine: 'auto',
        htmlWhitespaceSensitivity: 'ignore', //指定 HTML 文件的全局空白区域敏感度。空格被认为是不敏感的
        singleQuote: true, //单引号
        semi: false, //语句末尾打印分号。不加
        trailingComma: 'none', //多行时尽可能打印尾随逗号。不尾随
        bracketSpacing: true, //括号之间的空格
        jsxBracketSameLine: true //将 > 多行 JSX 元素放在最后一行的末尾
      }
    ]
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    },
    {
      files: '*.vue',
      globals: {
        GenericObject: 'readable',
        GenericFunction: 'readable'
      }
    }
  ]
}
