import '@/index.css'
import '@/test.scss'
import React from 'react';
import ReactDOM from 'react-dom/client'; // 注意是client而非react-dom
import App from '@/App';
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);