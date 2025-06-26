module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended' // 如果是 React 项目
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true // 如果使用 JSX
    }
  },
  rules: {
    // 自定义规则
    'no-console': 'warn',
    'react/prop-types': 'off' // 示例：关闭 prop-types 检查
  },
  settings: {
    react: {
      version: 'detect' // 自动检测 React 版本
    }
  }
};