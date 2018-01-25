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

      // Y axis
      yAxisMin: this.props.yAxisMin || -1,
      yAxisMax: this.props.yAxisMax || 1,
      yLabelIncrement: this.props.yLabelIncrement || 1,
      yAxisFontSize: this.props.yAxisFontSize || 10,
      yTickSize: this.props.yTickSize || 10,
      // Not needed -- can be calculated from font and tick size
      yLabelWidth: this.props.yLabelWidth || 50,

      // X axis: Need to add xAxisMax, xAxisMin
      xAxisMin: this.props.xAxisMin || -1,
      xAxisMax: this.props.xAxisMax || 1,
      xLabelIncrement: this.props.xLabelIncrement || 1,
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
    const minMax = this.getMinMax();
    const minDataY = minMax.yMin;
    const maxDataY = minMax.yMax;
    const yLabelIncrement =
      this.props.yLabelIncrement || this.calcIncrements(minDataY, maxDataY);
    const yAxisMax =
      this.props.yAxisMax || this.calcAxisMax(yLabelIncrement, maxDataY);
    const yAxisMin =
      this.props.yAxisMin || this.calcAxisMin(yLabelIncrement, minDataY);
    const rows = this.calcLegendRows();
    const rowBreak = this.calcLegendRowBreak();
    this.setState({
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

  calcAxisMax = (increment, maxData) =>
    Math.ceil(maxData / increment) * increment;

  calcAxisMin = (increment, minData) =>
    Math.floor(minData / increment) * increment;

  calcLegendRowBreak = () => {
    const { legendFontSize } = this.state;
    return legendFontSize < 15 ? 4 : 3;
  };

  calcLegendRows = rows => {
    const rowBreak = this.calcLegendRowBreak();
    return Math.floor(DATA.inputs.length / rowBreak) + 1;
  };

  getMinMax() {
    let xMin = 0;
    let xMax = 0;
    let yMin = 0;
    let yMax = 0;
    DATA.inputs.forEach(input => {
      input.data.forEach(point => {
        xMin = Math.min(xMin, point.x);
        xMax = Math.max(xMax, point.x);
        yMin = Math.min(yMin, point.y);
        yMax = Math.max(yMax, point.y);
      });
    });
    return { xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax };
  }

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
    return DATA.inputs.map((input, i) => {
      return this.makePath(input.data, colors[i]);
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
