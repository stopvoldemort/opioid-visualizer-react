import React from 'react'
import cuid from 'cuid'

export const XAxisLabels = ( { tickSize, fontSize, years, graphHeight, graphWidth, yLabelWidth, xLabelHeight, numTicks }) => {

  const xIncrement = graphWidth / (numTicks - 1)

  const makeLabels = () => {
    const labels = [2000, 2004, 2008, 2012, 2016]
    const intervals = [1, 5, 9, 13, 17]
    return intervals.map((interval, i) => {
      const x = yLabelWidth + (xIncrement * interval)
      return (
        <g key={cuid()}>
          <line className="graph-axis"
            x1={x} y1={graphHeight}
            x2={x} y2={graphHeight + tickSize}
            stroke="#bdc3c7" />
          <text x={x} y={graphHeight + tickSize + fontSize + 5}
            className="x-axis-label">{labels[i]}</text>
        </g>
      )
    })
  }

  return (
    <g className="x_axis">
      {makeLabels()}
    </g>
  )
}
