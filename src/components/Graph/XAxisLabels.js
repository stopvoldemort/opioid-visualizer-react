import React from "react";
import cuid from "cuid";

export const XAxisLabels = ({
  xLabelIncrement,
  xAxisMax,
  xAxisMin,
  xTickSize,
  fontSize,
  graphHeight,
  graphWidth,
  xLabelHeight,
  xOrigin,
  yOrigin,
  xAxisLabelPlacement
}) => {
  const numTicksAboveZero = Math.floor(Math.abs(xAxisMax) / xLabelIncrement);
  const numTicksBelowZero = Math.floor(Math.abs(xAxisMin) / xLabelIncrement);
  const svgIncrement = graphWidth / ((xAxisMax - xAxisMin) / xLabelIncrement);

  const getIntervals = () => {
    let intervals = [];
    for (let i = -numTicksBelowZero; i <= numTicksAboveZero; i++) {
      intervals.push(i);
    }
    return intervals;
  };

  const location = () => {
    if (xAxisLabelPlacement === "axis") return yOrigin;
    else if (xAxisLabelPlacement === "edge") return graphHeight;
    else return yOrigin;
  };

  const makeLabels = () => {
    const intervals = getIntervals();
    const labels = intervals.map(i => i * xLabelIncrement);

    return intervals.map((interval, i) => {
      const x = xOrigin + svgIncrement * interval;
      return (
        <g key={cuid()}>
          <line
            className="graph-axis"
            x1={x}
            y1={location()}
            x2={x}
            y2={location() + xTickSize}
            stroke="#bdc3c7"
          />
          <text
            x={x}
            y={location() + xTickSize + fontSize + 5}
            className="x-axis-label"
            fontSize={fontSize}
          >
            {labels[i]}
          </text>
        </g>
      );
    });
  };

  return <g className="x_axis">{makeLabels()}</g>;
};
