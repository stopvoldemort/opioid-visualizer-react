import React, { Component } from 'react'
import Graph from './Graph.js'


export default class GraphContainer extends Component {


  render() {
    return (
      <div className="graph-container">
        <h4 className="text-center">Deaths due to drug overdoses</h4>
        <Graph

          colors = {['blue', 'red', 'green', 'blue', 'brown', 'black']}

        />
      </div>
    )
  }
}
