import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import getStore from './redux'
import App from './App';

const app = (
  <Provider store={getStore()}>
    <App />
  </Provider>
)

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(app, div);
});
