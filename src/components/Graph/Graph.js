import React, { Component } from "react";
import { Axes } from "./Axes.js";
import { XAxisLabels } from "./XAxisLabels.js";
import { YAxisLabels } from "./YAxisLabels.js";
import { Legend } from "./Legend.js";
import { Lines } from "./Lines.js";
import { increments } from "../../assets/increments.js";
import "../../style/Graph.css";

export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Should have a test for whether the data object is valid
      data: this.props.data || {
        xLabel: "no data",
        yLabel: "no data",
        inputs: [
          {
            name: "no data",
            data: [{ x: -1, y: -1 }, { x: 1, y: 1 }]
          }
        ]
      },
      // Line info: add dotted line, line breaks
      colors: [],

      // Graph area info: add background color, gridlines
      graphHeight: this.props.graphHeight || 200,
      graphWidth: this.props.graphWidth || 400,

      // Axes: Would be good to abstract axis label behavior into a class
      // Y axis
      yAxisMin: this.props.yAxisMin || -1,
      yAxisMax: this.props.yAxisMax || 1,
      yLabelIncrement: this.props.yLabelIncrement || 1,
      yAxisFontSize: this.props.yAxisFontSize || 10,
      yTickSize: this.props.yTickSize || 10,
      yAxisLabelPlacement: this.props.yAxisLabelPlacement || "edge",
      yLabelWidth: 1,

      // X axis
      xAxisMin: this.props.xAxisMin || -1,
      xAxisMax: this.props.xAxisMax || 1,
      xLabelIncrement: this.props.xLabelIncrement || 1,
      xAxisFontSize: this.props.xAxisFontSize || 10,
      xTickSize: this.props.xTickSize || 10,
      xAxisLabelPlacement: this.props.xAxisLabelPlacement || "edge",
      xLabelHeight: 1,

      // Legend: Make the row calculation and spacing more robust
      legendFontSize: this.props.legendFontSize || 10,
      legendRows: 1,
      legendRowBreak: 1,
      legendRowHeight: 1,
      legendLabels: []
    };
  }

  componentDidMount = () => {
    const colors = this.props.colors || this.defaultColors();
    const minMax = this.getMinMax();
    const minDataY = minMax.yMin;
    const maxDataY = minMax.yMax;
    const yLabelIncrement =
      this.props.yLabelIncrement || this.calcIncrements(minDataY, maxDataY);
    const yAxisMax =
      this.props.yAxisMax || this.calcAxisMax(yLabelIncrement, maxDataY);
    const yAxisMin =
      this.props.yAxisMin || this.calcAxisMin(yLabelIncrement, minDataY);
    const yLabelWidth =
      (this.state.yAxisFontSize + this.state.yTickSize + 5) * 2;

    const minDataX = minMax.xMin;
    const maxDataX = minMax.xMax;
    const xLabelIncrement =
      this.props.xLabelIncrement || this.calcIncrements(minDataX, maxDataX);
    const xAxisMax =
      this.props.xAxisMax || this.calcAxisMax(xLabelIncrement, maxDataX);
    const xAxisMin =
      this.props.xAxisMin || this.calcAxisMin(xLabelIncrement, minDataX);
    const xLabelHeight = this.state.xAxisFontSize + this.state.xTickSize + 5;

    const legendRows = this.calcLegendRows();
    const legendRowBreak = this.calcLegendRowBreak();
    const legendLabels = this.state.data.inputs.map(input => input.name);
    const legendRowHeight = this.state.legendFontSize * 2;

    this.setState({
      colors: colors,
      yAxisMax: yAxisMax,
      yAxisMin: yAxisMin,
      xAxisMax: xAxisMax,
      xAxisMin: xAxisMin,
      yLabelIncrement: yLabelIncrement,
      xLabelIncrement: xLabelIncrement,
      yLabelWidth: yLabelWidth,
      xLabelHeight: xLabelHeight,
      legendRows: legendRows,
      legendRowBreak: legendRowBreak,
      legendLabels: legendLabels,
      legendRowHeight: legendRowHeight
    });
  };

  defaultColors = () => {
    const defaultColors = ["blue", "red", "green", "brown", "purple", "black"];
    const selectedColors = [];
    for (let i = 0; i < this.state.data.inputs.length; i++) {
      selectedColors.push(defaultColors[i % defaultColors.length]);
    }
    return selectedColors;
  };

  calcIncrements = (minData, maxData) =>
    // Default assumption is 8 axis labels
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
    return Math.floor(this.state.data.inputs.length / rowBreak) + 1;
  };

  getMinMax() {
    let xMin = 0;
    let xMax = 0;
    let yMin = 0;
    let yMax = 0;
    this.state.data.inputs.forEach(input => {
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
    const { graphWidth, xAxisMin, xAxisMax } = this.state;
    return graphWidth * (x - xAxisMin) / (xAxisMax - xAxisMin);
  }

  getSvgY(y) {
    const { graphHeight, yAxisMin, yAxisMax } = this.state;
    return graphHeight - (y - yAxisMin) / (yAxisMax - yAxisMin) * graphHeight;
  }

  render() {
    const {
      graphHeight,
      graphWidth,
      yAxisMax,
      yAxisMin,
      yLabelIncrement,
      yLabelWidth,
      yTickSize,
      yAxisFontSize,
      yAxisLabelPlacement,
      xAxisMax,
      xAxisMin,
      xLabelIncrement,
      xLabelHeight,
      xTickSize,
      xAxisFontSize,
      xAxisLabelPlacement,
      legendRows,
      legendRowHeight,
      legendRowBreak,
      legendLabels,
      legendFontSize,
      data,
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
          <Lines
            colors={colors}
            data={data}
            graphWidth={graphWidth}
            graphHeight={graphHeight}
            xAxisMin={xAxisMin}
            xAxisMax={xAxisMax}
            yAxisMin={yAxisMin}
            yAxisMax={yAxisMax}
          />

          <Legend
            labels={legendLabels}
            rows={legendRows}
            rowHeight={legendRowHeight}
            rowBreak={legendRowBreak}
            fontSize={legendFontSize}
            colors={colors}
          />

          <Axes
            xOrigin={xAxisMin < 0 ? this.getSvgX(0) : this.getSvgX(xAxisMin)}
            yOrigin={yAxisMin < 0 ? this.getSvgY(0) : this.getSvgY(yAxisMin)}
            xAxisMin={this.getSvgX(xAxisMin)}
            xAxisMax={this.getSvgX(xAxisMax)}
            yAxisMin={this.getSvgY(yAxisMin)}
            yAxisMax={this.getSvgY(yAxisMax)}
          />

          <XAxisLabels
            xLabelIncrement={xLabelIncrement}
            xAxisMin={xAxisMin}
            xAxisMax={xAxisMax}
            xOrigin={xAxisMin < 0 ? this.getSvgX(0) : this.getSvgX(xAxisMin)}
            yOrigin={yAxisMin < 0 ? this.getSvgY(0) : this.getSvgY(yAxisMin)}
            xTickSize={xTickSize}
            xAxisLabelPlacement={xAxisLabelPlacement}
            fontSize={xAxisFontSize}
            graphHeight={graphHeight}
            graphWidth={graphWidth}
            xLabelHeight={xLabelHeight}
          />

          <YAxisLabels
            yLabelIncrement={yLabelIncrement}
            yTickSize={yTickSize}
            fontSize={yAxisFontSize}
            graphHeight={graphHeight}
            yLabelWidth={yLabelWidth}
            yOrigin={yAxisMin < 0 ? this.getSvgY(0) : this.getSvgY(yAxisMin)}
            xOrigin={xAxisMin < 0 ? this.getSvgX(0) : this.getSvgX(xAxisMin)}
            yAxisLabelPlacement={yAxisLabelPlacement}
            yAxisMin={yAxisMin}
            yAxisMax={yAxisMax}
          />
        </svg>
      </div>
    );
  }
}
