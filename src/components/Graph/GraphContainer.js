import React, { Component } from "react";
import Graph from "./Graph.js";
import { DATA } from "../../assets/data.js";

export default class GraphContainer extends Component {
  render() {
    return (
      <div>
        <Graph
          colors={["blue", "red", "green", "blue", "brown", "black"]}
          xAxisLabelPlacement="edge"
          data={DATA}
        />
      </div>
    );
  }
}
