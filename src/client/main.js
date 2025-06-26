import './index.css'
import './index.scss'
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../shared/App';

ReactDOM.hydrate(
  <App />,
  document.getElementById('root')
);
