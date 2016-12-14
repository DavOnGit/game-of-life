import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './css/header.css';

@CSSModules(styles)
export default class extends Component {
  render() {
      return (
        <div styleName='root'>
          <h1 styleName='title'>Hello!</h1>
          <button styleName='btn' onClick={this.props.startStopSim}>{this.props.ssBtn}</button>
          {/* <button styleName='btn' onClick={this.props.stopSim}>Stop</button> */}
          <button styleName='btn' onClick={this.props.stepSim}>step</button>
          {/* <form lpformnum="1">
            <select id="shapes">
            <option>Clear</option>
            <option>Glider</option>
            <option>Small Exploder</option>
            <option>Exploder</option>
            <option>10 Cell Row</option>
            <option>Lightweight spaceship</option>
            <option>Tumbler</option>
            <option>Gosper Glider Gun</option>
            </select>
            <input id="next" type="button" value="Next" />
            <input id="start" type="button" value="Start" />
            <img src="pix/speeddial.svg" alt="" width="20" height="20" />
            <input id="speed" type="range" min="10" max="500" step="49" value="10" title="speed dial" />
            <img src="pix/grid.svg" alt="" width="20" height="20" />
            <input id="size" type="range" min="2" max="11" value="2" title="grid size" />
            <label id="generation">283</label>
          </form> */}
          <input id="cols" type="range" min="10" max="300" title="cell size" />

          

          <div styleName='btn'>{this.props.counter}</div>
        </div>
      )
  }
}
