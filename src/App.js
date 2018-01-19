import React, { Component } from 'react';
import Header from './components/Header.js'
import GraphContainer from './components/Graph/GraphContainer.js'
import FilterContainer from './components/Filter/FilterContainer.js'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <FilterContainer />
        <GraphContainer />
      </div>
    );
  }
}

export default App;
