import React, { Component } from 'react';
import './App.css';
import IdeasContainer from './containers/IdeasContainer'
import LoginContainer from './containers/LoginContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoginContainer />
        <IdeasContainer />
      </div>
    );
  }
}

export default App;
