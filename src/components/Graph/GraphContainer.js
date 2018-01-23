import React, { Component } from 'react'
import Graph from './Graph.js'


export default class GraphContainer extends Component {


  render() {
    return (
      <div>
        <Graph

          colors = {['blue', 'red', 'green', 'blue', 'brown', 'black']}

        />
      </div>
    )
  }
}
