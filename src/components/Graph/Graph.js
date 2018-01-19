import React, { Component } from 'react'
import { Axes } from './Axes.js'
import { XAxisLabels } from './XAxisLabels.js'
import { YAxisLabels } from './YAxisLabels.js'
import { DATA } from '../../assets/data.js'
import cuid from 'cuid'
import '../../style/Graph.css'



export default class Graph extends Component {

  state = {
    colors: ['blue', 'red', 'green', 'blue', 'brown', 'black'],
    graphHeight: 300,
    graphWidth: 700,
    yLabelWidth: 50,
    xLabelHeight: 25,
    tickSize: 10,
    fontSize: 10,
    minX: 1999,
    maxX: 2016,
    minY: 0,
    maxY: 1
  }

  componentDidMount = () => {
    const maxY = this.getMaxY()

    this.setState({ maxY: maxY })
  }

  getMaxY() {
    let max = 0
    const states = Object.keys(DATA)
    states.forEach(state => {
      DATA[state].forEach(year => {
        max = Math.max(max, year.deaths)
      })
    })
    return max
  }

  rawToCoordinates = (data) => (data.map(el => ({ x: el.year, y: el.deaths} )))

  getSvgX(x) {
    const { graphWidth, minX, maxX } = this.state
    const diff = x - minX
    const possibleDiff = maxX - minX
    return (graphWidth * diff / possibleDiff);
  }

  getSvgY(y) {
    const { graphHeight, maxY } = this.state
    return graphHeight - (y / maxY * graphHeight);
  }

  makePaths() {
    const { colors } = this.state
    const states = Object.keys(DATA)
    return states.map((state, i) => {
      const pathData = this.rawToCoordinates(DATA[state])
      return this.makePath(pathData, colors[i])
    })
  }

  makePath(data, color) {
    const { yLabelWidth } = this.state
    let pathD = "M " + (this.getSvgX(data[0].x) + yLabelWidth) + " " + this.getSvgY(data[0].y) + " "
    pathD += data.map((point, i) => {
      return "L " + (this.getSvgX(point.x) + yLabelWidth) + " " + this.getSvgY(point.y) + " "
    })
    return (
      <path key={cuid()} className="graph_path" d={pathD} style={{stroke: color}} />
    )
  }


  render() {
    const { graphHeight, graphWidth, yLabelWidth, xLabelHeight } = this.state
    const { tickSize, fontSize, maxY, minY, maxX, minX } = this.state
    return (
      <div>
        <svg
          viewBox={`0 0 ${graphWidth + (yLabelWidth * 4)} ${graphHeight + xLabelHeight}`}>

          {this.makePaths()}

          <Axes
            xRoot = {this.getSvgX(minX) + yLabelWidth}
            yRoot = {this.getSvgY(minY)}
            yTop = {this.getSvgY(maxY)}
            xRight = {this.getSvgX(maxX) + yLabelWidth} />

          <XAxisLabels
            tickSize = { tickSize }
            fontSize = { fontSize }
            graphHeight = { graphHeight }
            graphWidth = { graphWidth }
            yLabelWidth = { yLabelWidth }
            xLabelHeight = { xLabelHeight }
            numTicks = { 18 }
          />

          <YAxisLabels
            tickSize = { tickSize }
            fontSize = { fontSize }
            graphHeight = { graphHeight }
            yLabelWidth = { yLabelWidth }
            maxY = { maxY }
          />

        </svg>
      </div>
    )
  }
}
