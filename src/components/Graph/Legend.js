import React from "react";
import "../../style/Graph.css";
import cuid from "cuid";

export const Legend = ({
  rows,
  rowHeight,
  rowBreak,
  labels,
  fontSize,
  colors
}) => {
  const yAnchor = -(rows * rowHeight);

  const labelToPrint = str => {
    if (str.length > 8) return `${str.slice(0, 3)}...`;
    return str;
  };

  const makeLegendEntries = () => {
    return labels.map((state, i) => {
      const lineStart = 5 + (i % rowBreak) * (400 / rowBreak);
      const lineEnd = lineStart + 25;
      const textStart = lineEnd + 5;
      const y = yAnchor + Math.floor(i / rowBreak) * rowHeight + 10;
      const color = colors[i];
      return (
        <g key={cuid()} className="legend-entry">
          <line x1={lineStart} y1={y} x2={lineEnd} y2={y} stroke={color} />
          <text
            className="legend-text"
            x={textStart}
            y={y + 5}
            fontSize={fontSize}
          >
            {labelToPrint(state)}
          </text>
        </g>
      );
    });
  };

  return <g>{makeLegendEntries()}</g>;
};
