import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import getStore from './redux'
import App from './App';
import './index.css';

const app = (
  <Provider store={getStore()}>
    <App />
  </Provider>
)

ReactDOM.render(
  app,
  document.getElementById('root')
);
