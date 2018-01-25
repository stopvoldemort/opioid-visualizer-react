import React from "react";

export const Axes = ({
  xOrigin,
  yOrigin,
  xAxisMin,
  xAxisMax,
  yAxisMin,
  yAxisMax
}) => {
  return (
    <g className="graph_axis">
      <line x1={xAxisMin} y1={yOrigin} x2={xAxisMax} y2={yOrigin} />
      <line x1={xOrigin} y1={yAxisMin} x2={xOrigin} y2={yAxisMax} />
    </g>
  );
};
