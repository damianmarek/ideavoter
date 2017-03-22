import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import getStore from './redux'
import App from './App';
import './index.css';
import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDMjvJzsS__DQUPXnetVFGnHm9x-hjJ89o',
  authDomain: 'ideavoter.firebaseapp.com',
  databaseURL: 'https://ideavoter.firebaseio.com',
  storageBucket: 'ideavoter.appspot.com',
  messagingSenderId: '259884651037',
}

firebase.initializeApp(config)

const app = (
  <Provider store={getStore()}>
    <App />
  </Provider>
)

ReactDOM.render(
  app,
  document.getElementById('root')
);
