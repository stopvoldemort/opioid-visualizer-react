import React from 'react'

export const Axes = ({ xRoot, yRoot, xRight, yTop }) => {

  return (
    <g className="graph_axis">
      <line
        x1={ xRoot } y1={ yRoot }
        x2={ xRight } y2={ yRoot } />
      <line
        x1={ xRoot } y1={ yRoot }
        x2={ xRoot } y2={ yTop } />
    </g>
  )
}
