import React, { Component } from 'react'
import { Axes } from './Axes.js'
import { XAxisLabels } from './XAxisLabels.js'
import { YAxisLabels } from './YAxisLabels.js'
import { Legend } from './Legend.js'
import { DATA } from '../../assets/data.js'
import cuid from 'cuid'
import '../../style/Graph.css'



export default class Graph extends Component {

  state = {
    colors: ['blue', 'red', 'green', 'blue', 'brown', 'black'],
    graphHeight: 200,
    graphWidth: 400,
    yLabelWidth: 50,
    xLabelHeight: 25,
    tickSize: 10,
    xAxisFontSize: 10,
    yAxisFontSize: 10,
    minX: 1999,
    maxX: 2016,
    minY: 0,
    maxY: 1,
    legendRows: 1,
    legendRowHeight: 20
  }

  componentDidMount = () => {
    const maxY = this.getMaxY()
    const rows = this.calcLegendRows()

    this.setState({
      maxY: maxY,
      legendRows: rows
    })
  }

  calcLegendRows = (rows) => {
    const states = Object.keys(DATA)
    return Math.floor(states.length / 4) + 1
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
    let pathD = "M " + (this.getSvgX(data[0].x)) + " " + this.getSvgY(data[0].y) + " "
    pathD += data.map((point, i) => {
      return "L " + (this.getSvgX(point.x)) + " " + this.getSvgY(point.y) + " "
    })
    return (
      <path key={cuid()} className="graph_path" d={pathD} style={{stroke: color}} />
    )
  }


  render() {
    const { graphHeight, graphWidth, yLabelWidth, xLabelHeight } = this.state
    const { tickSize, xAxisFontSize, yAxisFontSize, maxY, minY, maxX, minX } = this.state
    const { legendRows, legendRowHeight } = this.state
    return (
      <div>
        <svg
          viewBox={`${-(yLabelWidth)} ${-xLabelHeight} ${graphWidth + 2*yLabelWidth} ${graphHeight + 2*xLabelHeight}`}>

          <Legend
            rows = { legendRows }
            rowHeight = { legendRowHeight }/>

          {this.makePaths()}

          <Axes
            xRoot = {this.getSvgX(minX)}
            yRoot = {this.getSvgY(minY)}
            yTop = {this.getSvgY(maxY)}
            xRight = {this.getSvgX(maxX)} />

          <XAxisLabels
            tickSize = { tickSize }
            fontSize = { xAxisFontSize }
            graphHeight = { graphHeight }
            graphWidth = { graphWidth }
            yLabelWidth = { yLabelWidth }
            xLabelHeight = { xLabelHeight }
            numTicks = { 18 }
          />

          <YAxisLabels
            tickSize = { tickSize }
            fontSize = { yAxisFontSize }
            graphHeight = { graphHeight }
            yLabelWidth = { yLabelWidth }
            maxY = { maxY }
          />

        </svg>
      </div>
    )
  }
}
