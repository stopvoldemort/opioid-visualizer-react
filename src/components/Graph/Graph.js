import React, { Component } from "react";
import { Axes } from "./Axes.js";
import { XAxisLabels } from "./XAxisLabels.js";
import { YAxisLabels } from "./YAxisLabels.js";
import { Legend } from "./Legend.js";
import { DATA } from "../../assets/data.js";
import { increments } from "../../assets/increments.js";
import cuid from "cuid";
import "../../style/Graph.css";

export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Line info: add dotted line, line breaks
      colors: this.props.colors || [
        "blue",
        "red",
        "green",
        "blue",
        "brown",
        "black"
      ],

      // Graph area info: add background color, gridlines
      graphHeight: this.props.graphHeight || 200,
      graphWidth: this.props.graphWidth || 400,

      // Not sure these are needed
      minDataX: this.props.minDataX || 1999,
      maxDataX: this.props.maxDataX || 2016,
      // minDataY: this.props.minDataY || -1,
      // maxDataY: this.props.maxDataX || 1,

      // Y axis: Need to add yAxisMax, yAxisMin
      yAxisMin: this.props.yAxisMin || -1,
      yAxisMax: this.props.yAxisMax || 1,
      yLabelIncrement: this.props.yLabelIncrement || 1,
      yAxisFontSize: this.props.yAxisFontSize || 10,
      yTickSize: this.props.yTickSize || 10,
      // Not needed -- can be calculated from font and tick size
      yLabelWidth: this.props.yLabelWidth || 50,

      // X axis: Need to add xAxisMax, xAxisMin
      xAxisFontSize: this.props.xAxisFontSize || 10,
      xTickSize: this.props.xTickSize || 10,
      // Not needed -- can be calculated from font and tick size
      xLabelHeight: this.props.xLabelHeight || 25,

      // Legend
      legendRows: this.props.legendRows || 1,
      legendRowHeight: this.props.legendRowHeight || 20,
      legendRowBreak: this.props.legendRowBreak || 4,
      legendFontSize: this.props.legendFontSize || 10
    };
  }

  componentDidMount = () => {
    const maxDataY = this.getMaxY();
    const minDataY = this.getMinY();
    const yLabelIncrement =
      this.props.yLabelIncrement || this.calcIncrements(minDataY, maxDataY);
    const yAxisMax =
      this.props.yAxisMax || this.calcAxisMax(yLabelIncrement, maxDataY);
    const yAxisMin =
      this.props.yAxisMin || this.calcAxisMin(yLabelIncrement, minDataY);
    const rows = this.calcLegendRows();
    const rowBreak = this.calcLegendRowBreak();
    this.setState({
      // maxDataY: maxDataY,
      // minDataY: minDataY,
      yAxisMax: yAxisMax,
      yAxisMin: yAxisMin,
      yLabelIncrement: yLabelIncrement,
      legendRows: rows,
      legendRowBreak: rowBreak
    });
  };

  calcIncrements = (minData, maxData) =>
    // Default assumes 8 axis labels
    increments.find(inc => (maxData - minData) / inc <= 8);

  calcAxisMax = (increment, dataLimit) =>
    Math.ceil(dataLimit / increment) * increment;

  calcAxisMin = (increment, dataLimit) =>
    Math.floor(dataLimit / increment) * increment;

  calcLegendRowBreak = () => {
    const { legendFontSize } = this.state;
    return legendFontSize < 15 ? 4 : 3;
  };

  calcLegendRows = rows => {
    const states = Object.keys(DATA);
    const rowBreak = this.calcLegendRowBreak();
    return Math.floor(states.length / rowBreak) + 1;
  };

  getMaxY() {
    let max = 0;
    const states = Object.keys(DATA);
    states.forEach(state => {
      DATA[state].forEach(year => {
        max = Math.max(max, year.deaths);
      });
    });
    return max;
  }

  getMinY() {
    let min = 0;
    const states = Object.keys(DATA);
    states.forEach(state => {
      DATA[state].forEach(year => {
        min = Math.min(min, year.deaths);
      });
    });
    return min;
  }

  rawToCoordinates = data => data.map(el => ({ x: el.year, y: el.deaths }));

  getSvgX(x) {
    const { graphWidth, minDataX, maxDataX } = this.state;
    return graphWidth * (x - minDataX) / (maxDataX - minDataX);
  }

  getSvgY(y) {
    const { graphHeight, yAxisMin, yAxisMax } = this.state;
    return graphHeight - (y - yAxisMin) / (yAxisMax - yAxisMin) * graphHeight;
  }

  makePaths() {
    const { colors } = this.state;
    const states = Object.keys(DATA);
    return states.map((state, i) => {
      const pathData = this.rawToCoordinates(DATA[state]);
      return this.makePath(pathData, colors[i]);
    });
  }

  makePath(data, color) {
    let pathD =
      "M " + this.getSvgX(data[0].x) + " " + this.getSvgY(data[0].y) + " ";
    pathD += data.map((point, i) => {
      return "L " + this.getSvgX(point.x) + " " + this.getSvgY(point.y) + " ";
    });
    return (
      <path
        key={cuid()}
        className="graph_path"
        d={pathD}
        style={{ stroke: color }}
      />
    );
  }

  render() {
    const {
      graphHeight,
      graphWidth,
      yAxisMax,
      yAxisMin,
      yLabelIncrement,
      yLabelWidth,
      xLabelHeight,
      yTickSize,
      xTickSize,
      xAxisFontSize,
      yAxisFontSize,
      // maxDataY,
      // minDataY,
      maxDataX,
      minDataX,
      legendRows,
      legendRowHeight,
      legendRowBreak,
      legendFontSize,
      colors
    } = this.state;
    return (
      <div>
        <svg
          viewBox={`
            ${-yLabelWidth}
            ${-(legendRows * legendRowHeight)}
            ${graphWidth + 2 * yLabelWidth}
            ${graphHeight + xLabelHeight + legendRows * legendRowHeight}`}
        >
          <Legend
            rows={legendRows}
            rowHeight={legendRowHeight}
            rowBreak={legendRowBreak}
            fontSize={legendFontSize}
            colors={colors}
          />

          {this.makePaths()}

          <Axes
            xOrigin={minDataX < 0 ? this.getSvgX(0) : this.getSvgX(minDataX)}
            yOrigin={yAxisMin < 0 ? this.getSvgY(0) : this.getSvgY(yAxisMin)}
            minDataX={this.getSvgX(minDataX)}
            maxDataX={this.getSvgX(maxDataX)}
            yAxisMin={this.getSvgY(yAxisMin)}
            yAxisMax={this.getSvgY(yAxisMax)}
          />

          <XAxisLabels
            xTickSize={xTickSize}
            fontSize={xAxisFontSize}
            graphHeight={graphHeight}
            graphWidth={graphWidth}
            yLabelWidth={yLabelWidth}
            xLabelHeight={xLabelHeight}
            numTicks={18}
          />

          <YAxisLabels
            yLabelIncrement={yLabelIncrement}
            yTickSize={yTickSize}
            fontSize={yAxisFontSize}
            graphHeight={graphHeight}
            yLabelWidth={yLabelWidth}
            yOrigin={yAxisMin < 0 ? this.getSvgY(0) : this.getSvgY(yAxisMin)}
            yAxisMin={yAxisMin}
            yAxisMax={yAxisMax}
          />
        </svg>
      </div>
    );
  }
}
