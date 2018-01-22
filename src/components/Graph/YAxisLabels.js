import React from 'react'
import cuid from 'cuid'
import '../../style/Graph.css'

export const YAxisLabels = ( { tickSize, fontSize, graphHeight, yLabelWidth, minY, maxY, yOrigin }) => {

  // Need to make this a prop
  const numTicks = 8
  const numTicksAboveZero = Math.floor(maxY / (maxY - minY) * numTicks)
  const svgIncrement = ( graphHeight / numTicks )

  const getIncrement = () => {
    const increments = [1, 2, 3, 5, 10, 15, 25, 50, 75, 100, 150, 200, 250, 300, 400, 500, 600, 750, 1000, 1500, 2000, 3000, 4000, 5000, 7500]
    return increments.find(inc => ((maxY - minY) / inc) <= numTicks)
  }

  const numIncrement = getIncrement()
  const numTicksBelowZero = Math.floor(-minY / numIncrement)
  console.log(maxY, minY, numTicksAboveZero, numTicksBelowZero)

  const getIntervals = () => {
    let intervals = []
    for (let i = -numTicksBelowZero; i <= numTicksAboveZero; i++) {
      intervals.push(i)
    }
    return intervals
  }

  const makeLabels = () => {
    const intervals = getIntervals()
    const labels = intervals.map(i => i * numIncrement)
    return intervals.map((interval, i) => {
      const y = yOrigin - ((svgIncrement * interval))
      return (
        <g key={cuid()}>
          <line className="graph-axis"
            x1={0} y1={y}
            x2={0 - tickSize} y2={y}
            stroke="#bdc3c7" />
          <text x={0 - tickSize - 5} y={y + fontSize / 2}
            className="y-axis-label" fontSize={fontSize}>{labels[i]}</text>
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
