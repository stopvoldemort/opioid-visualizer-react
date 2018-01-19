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
    minX: 1999,
    maxX: 2016,
    minY: 0,
    maxY: 1,

    yLabelWidth: 50,
    xLabelHeight: 25,
    tickSize: 10,
    xAxisFontSize: 10,
    yAxisFontSize: 10,

    legendRows: 1,
    legendRowHeight: 20,
    legendRowBreak: 4,
    legendFontSize: 10
  }

  componentDidMount = () => {
    const maxY = this.getMaxY()
    const rows = this.calcLegendRows()
    const rowBreak = this.calcLegendRowBreak()

    this.setState({
      maxY: maxY,
      legendRows: rows,
      legendRowBreak: rowBreak
    })
  }

  calcLegendRowBreak = () => {
    const {legendFontSize} = this.state
    return legendFontSize < 15 ? 4 : 3
  }

  calcLegendRows = (rows) => {
    const states = Object.keys(DATA)
    const rowBreak = this.calcLegendRowBreak()
    return Math.floor(states.length / rowBreak) + 1
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
    const { legendRows, legendRowHeight, legendRowBreak, legendFontSize, colors } = this.state
    return (
      <div>
        <svg
          viewBox={`
            ${-(yLabelWidth)}
            ${-(legendRows * legendRowHeight)}
            ${graphWidth + (2 * yLabelWidth)}
            ${graphHeight + xLabelHeight + (legendRows * legendRowHeight)}`}>

          <Legend
            rows = { legendRows }
            rowHeight = { legendRowHeight }
            rowBreak = { legendRowBreak }
            fontSize = { legendFontSize }
            colors = { colors }/>

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
