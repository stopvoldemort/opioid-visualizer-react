import React from "react";
import cuid from "cuid";

export const Lines = ({
  data,
  colors,
  graphWidth,
  graphHeight,
  xAxisMin,
  xAxisMax,
  yAxisMin,
  yAxisMax
}) => {
  const getSvgX = x => {
    return graphWidth * (x - xAxisMin) / (xAxisMax - xAxisMin);
  };

  const getSvgY = y => {
    return graphHeight - (y - yAxisMin) / (yAxisMax - yAxisMin) * graphHeight;
  };

  const makePaths = () =>
    data.inputs.map((input, i) => makePath(input.data, colors[i]));

  const makePath = (data, color) => {
    let pathD = "M " + getSvgX(data[0].x) + " " + getSvgY(data[0].y) + " ";
    pathD += data.map((point, i) => {
      return "L " + getSvgX(point.x) + " " + getSvgY(point.y) + " ";
    });
    return (
      <path
        key={cuid()}
        className="graph_path"
        d={pathD}
        style={{ stroke: color }}
      />
    );
  };

  return <g>{makePaths()}</g>;
};
