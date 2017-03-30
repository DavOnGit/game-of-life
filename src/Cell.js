import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import Perf from 'react-addons-perf'

import styles from './css/cell.css'

@CSSModules(styles)

export default class extends Component {
  shouldComponentUpdate (prevProps) {
    const {payload} = this.props
    //console.log(!(prevProps.payload === payload));
    return !(prevProps.payload === payload)
  }
  
  render() {
    const {payload, cellSize, row, column} = this.props
    const color = payload ? '#47E318' : '#0F0F0F'
    var style = {
      width: cellSize +'px',
      height: cellSize +'px',
      backgroundColor: color
    }
    return (
      <div  className='cell'
        styleName='cell'
        style={style}
        data-row={row}
        data-col={column}
      >
      </div>
    )
  }
}
