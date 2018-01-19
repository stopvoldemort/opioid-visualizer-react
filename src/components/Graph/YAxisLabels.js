import React from 'react'
import cuid from 'cuid'
import '../../style/Graph.css'

export const YAxisLabels = ( { tickSize, fontSize, graphHeight, yLabelWidth, maxY }) => {

  const numTicks = 11
  const svgIncrement = graphHeight / (numTicks)

  const increments = [1, 5, 10, 20, 30, 40, 50, 75, 100, 120, 150, 200, 250, 300, 400, 500, 600, 750, 1000, 1500, 2000, 3000, 4000, 5000, 7500]
  const numIncrement = increments.find(inc => maxY / inc <=5)


  const makeLabels = () => {
    const labels = [1,2,3,4,5].map(i => i * numIncrement)
    const intervals = [2, 4, 6, 8, 10]
    return intervals.map((interval, i) => {
      const y = graphHeight - ((svgIncrement * interval))
      return (
        <g key={cuid()}>
          <line className="graph-axis"
            x1={yLabelWidth} y1={y}
            x2={yLabelWidth - tickSize} y2={y}
            stroke="#bdc3c7" />
          <text x={yLabelWidth - tickSize - 5} y={y + fontSize / 2}
            className="y-axis-label">{labels[i]}</text>
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
