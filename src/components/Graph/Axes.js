import React from 'react'

export const Axes = ({ xOrigin, yOrigin, xMin, xMax, yMin, yMax }) => {

  return (
    <g className="graph_axis">
      <line
        x1={ xOrigin } y1={ yOrigin }
        x2={ xMax } y2={ yOrigin } />
      <line
        x1={ xOrigin } y1={ yMin }
        x2={ xOrigin } y2={ yMax } />
    </g>
  )
}
