import React, { Component } from 'react';
import './App.css';
import IdeasContainer from './containers/IdeasContainer'
import LoginContainer from './containers/LoginContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to IdeaVoter</h2>
        </div>
        <LoginContainer />
        <IdeasContainer />
      </div>
    );
  }
}

export default App;
