import React, { Component } from "react";
import Graph from "./Graph.js";
import { DATA } from "../../assets/data.js";

export default class GraphContainer extends Component {
  render() {
    return (
      <div>
        <Graph xAxisLabelPlacement="edge" data={DATA} xAxisMin={1998} />
      </div>
    );
  }
}
