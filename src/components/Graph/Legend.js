import React from 'react'
import '../../style/Graph.css'
import cuid from 'cuid'
import { DATA } from '../../assets/data.js'

export const Legend = () => {

  const colors = ['blue', 'red', 'green', 'blue', 'brown', 'black']
  const states = Object.keys(DATA)
  const rows = Math.floor(states.length / 4) + 1

  const labelToPrint = (str) => {
    if (str.length > 4) return `${str.slice(0,3)}...`
    return str
  }

  const makeLegendEntries = () => {
    return states.map((state, i) => {
      const lineStart = 5 + (i % 4) * 20
      const lineEnd = lineStart + 10
      const textStart = lineEnd + 1
      const y = Math.floor(i / 4) * 5 + 2
      const color = colors[i]
      return (
        <g key={cuid()} className="legend-entry">
          <line x1={lineStart} y1={y} x2={lineEnd} y2={y} stroke={color}  />
          <text className="legend-text" x={textStart} y={y + 1} fontSize="3">
            {labelToPrint(state)}</text>
        </g>
      )
    })
  }


  return (
    <svg viewBox={`0 0 100 ${5 + rows * 3}`}>
      {makeLegendEntries()}
    </svg>
  )
}
