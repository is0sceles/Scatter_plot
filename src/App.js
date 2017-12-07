import React, { Component } from 'react';
import Scatterplot from './scatterplot';

import data from './data';


class App extends Component {

  render() {
    console.log('data is ', data);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Parent El.</h1>
        </header>
        <Scatterplot />
      </div>
    );
  }
}

export default App;
