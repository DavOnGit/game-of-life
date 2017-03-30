import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import Perf from 'react-addons-perf'

import Cell from './Cell'
import styles from './css/row.css'

@CSSModules(styles)

export default class extends Component {
  
  shouldComponentUpdate (prevProps) {
    const {cells} = this.props
    return !(prevProps.cells === cells)
  }
  
  render() {
    const { cells, cellSize, row } = this.props
    
    const _cell = cells.map((el, idx) => (
      <Cell
        payload={el}
        cellSize={cellSize}
        row={row}
        column={idx}
        key={idx}
      />
    ))
      return (
        <div styleName='row' data-row={row}>
          {_cell}
        </div>
      )
    }
}
