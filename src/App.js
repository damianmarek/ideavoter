import React, { Component } from 'react';
import './App.css';
import IdeasContainer from './containers/IdeasContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to IdeaVoter</h2>
        </div>
        <IdeasContainer />
      </div>
    );
  }
}

export default App;
