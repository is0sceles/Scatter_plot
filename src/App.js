import React, { Component } from 'react';
import Scatterplot from './scatterplot';
import fileData from './data';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Scatterplot data={fileData} />
      </div>
    );
  }
}

export default App;
