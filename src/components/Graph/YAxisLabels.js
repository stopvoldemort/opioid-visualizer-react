import React from "react";
import cuid from "cuid";
import "../../style/Graph.css";

export const YAxisLabels = ({
  yTickSize,
  fontSize,
  graphHeight,
  yLabelWidth,
  yLabelIncrement,
  yAxisMin,
  yAxisMax,
  yOrigin,
  xOrigin,
  yAxisLabelPlacement
}) => {
  const numTicksAboveZero = Math.floor(Math.abs(yAxisMax) / yLabelIncrement);
  const numTicksBelowZero = Math.floor(Math.abs(yAxisMin) / yLabelIncrement);
  const svgIncrement = graphHeight / ((yAxisMax - yAxisMin) / yLabelIncrement);

  const getIntervals = () => {
    let intervals = [];
    for (let i = -numTicksBelowZero; i <= numTicksAboveZero; i++) {
      intervals.push(i);
    }
    return intervals;
  };

  const location = () => {
    if (yAxisLabelPlacement === "axis") return xOrigin;
    else if (yAxisLabelPlacement === "edge") return 0;
    else return xOrigin;
  };

  const makeLabels = () => {
    const intervals = getIntervals();
    const labels = intervals.map(i => i * yLabelIncrement);
    return intervals.map((interval, i) => {
      const y = yOrigin - svgIncrement * interval;
      return (
        <g key={cuid()}>
          <line
            className="graph-axis"
            x1={location()}
            y1={y}
            x2={location() - yTickSize}
            y2={y}
            stroke="#bdc3c7"
          />
          <text
            x={location() - yTickSize - 5}
            y={y + fontSize / 2}
            className="y-axis-label"
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
