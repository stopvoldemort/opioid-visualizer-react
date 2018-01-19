import React, { Component } from 'react'
import '../style/Header.css'


export default class Header extends Component {
  render() {
    return (
      <div className="container-fluid header">
        <div className="container">
          <h1 className="display-4">Visualizing the Opioid Epidemic</h1>
          <h2 className="lead">Tracking the toll of drug overdoses across America.</h2>
        </div>
      </div>
    )
  }
}
