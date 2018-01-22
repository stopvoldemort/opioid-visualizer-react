import React, { Component } from 'react'
import { Axes } from './Axes.js'
import { XAxisLabels } from './XAxisLabels.js'
import { YAxisLabels } from './YAxisLabels.js'
import { Legend } from './Legend.js'
import { DATA } from '../../assets/data.js'
import cuid from 'cuid'
import '../../style/Graph.css'



export default class Graph extends Component {

  constructor(props) {
    super(props)
    this.state = {

      colors: this.props.colors || ['blue', 'red', 'green', 'blue', 'brown', 'black'],
      graphHeight: this.props.graphHeight || 200,
      graphWidth: this.props.graphWidth || 400,
      minX: this.props.minX || 1999,
      maxX: this.props.maxX || 2016,
      minY: this.props.minY || -1,
      maxY: 1,

      yLabelWidth: this.props.yLabelWidth || 50,
      xLabelHeight: this.props.xLabelHeight || 25,
      tickSize: this.props.tickSize || 10,
      xAxisFontSize: this.props.xAxisFontSize || 10,
      yAxisFontSize: this.props.yAxisFontSize || 10,

      legendRows: this.props.legendRows || 1,
      legendRowHeight: this.props.legendRowHeight || 20,
      legendRowBreak: this.props.legendRowBreak || 4,
      legendFontSize: this.props.legendFontSize || 10

    }
  }

  componentDidMount = () => {
    const maxY = this.props.maxY || this.getMaxY()
    const minY = this.props.maxY || this.getMinY()
    const rows = this.calcLegendRows()
    const rowBreak = this.calcLegendRowBreak()
    this.setState({
      maxY: maxY,
      minY: minY,
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

  getMinY() {
    let min = 0
    const states = Object.keys(DATA)
    states.forEach(state => {
      DATA[state].forEach(year => {
        min = Math.min(min, year.deaths)
      })
    })
    return min
  }

  rawToCoordinates = (data) => (data.map(el => ({ x: el.year, y: el.deaths} )))

  getSvgX(x) {
    const { graphWidth, minX, maxX } = this.state
    return (graphWidth * (x - minX) / (maxX - minX))
  }

  getSvgY(y) {
    const { graphHeight, maxY, minY } = this.state
    return graphHeight - ( (y - minY) / (maxY - minY) * graphHeight);
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
            xOrigin = { minX < 0 ? this.getSvgX(0) : this.getSvgX(minX) }
            yOrigin = { minY < 0 ? this.getSvgY(0) : this.getSvgY(minY) }
            xMin = {this.getSvgX(minX)}
            xMax = {this.getSvgX(maxX)}
            yMin = {this.getSvgY(minY)}
            yMax = {this.getSvgY(maxY)}
          />

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
            yOrigin = { minY < 0 ? this.getSvgY(0) : this.getSvgY(minY) }
            maxY = { maxY }
            minY = { minY }
          />

        </svg>
      </div>
    )
  }
}
