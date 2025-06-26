import './index.css'
import './index.scss'
import React from 'react';
// 从 react-dom/client 导入 createRoot
import { createRoot } from 'react-dom/client';
import App from './App';
const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // 创建 root 实例

root.render(<App />); // 使用 root.render 代替 ReactDOM.ren
