import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import Perf from 'react-addons-perf'

import Row from './Row'
import Header from './Header'
import styles from './css/app.css'
import Profiler from './Profiler';

@CSSModules(styles)

export default class extends Component {
  
  state = {
    counter: 0,
    ssBtn: 'start'
  }
  
  _responsiveCellNumber = (size = 24) => {
    const w = window.innerWidth - 50, h = window.innerHeight - 150
    const minSize = 6, maxSize = w > h ? ~~h/3 : ~~w/3
    const cellSize = size < minSize ? minSize : size > maxSize ? maxSize : size;
    
    let colNum = ~~(w / cellSize)
    let rowNum = ~~(h / cellSize)
    
    this.setState( { cellSize, colNum, rowNum } )
    this._buildRandomArr(rowNum, colNum)
  }
  
  _buildRandomArr = (row = 0 , col = 0) => {
    const r = Array.apply(null, {length: row + 2})
    const c = Array.apply(null, {length: col + 2})
    const cells = r.map( el => c.map( el2 => {
        return (Math.floor(Math.random() * 1.2)) ? 1 : 0
      })
    )
    const list = Array.apply(null, {length: row * col}).fill(1)
    
    this.setState({ cells, list })
  }
  
  _nextState = (arr=[], loop=false) => {
    const lastRow = arr.length - 1, lastCol = arr[0].length - 1
    
    arr[0] = arr[lastRow - 1];   // Copy rows
    arr[lastRow] = arr[1];
    
    for (let i = 1; i < lastRow; i++) {   // Copy columns
      let el = arr[i]
      el[0] = el[lastCol - 1]
      el[lastCol] = el[1]
    }
    
    arr[0][0] = arr[lastRow - 1][lastCol - 1]   // Copy edges
    arr[0][lastCol] = arr[lastRow - 1][1]
    arr[lastRow][0] = arr[1][lastCol - 1]
    arr[lastRow][lastCol] = arr[1][1]
    
    const cells = arr.map( (el,i) => {
      if (i === 0 || i === lastRow) return el
      let row = el.map( (el2,j) => {
        if (j === 0 || j === lastCol) return el2
        const buddys = [
          arr[i-1][j-1],  arr[i-1][j],  arr[i-1][j+1],
          arr[i][j-1],                  arr[i][j+1],
          arr[i+1][j-1],  arr[i+1][j],  arr[i+1][j+1]
        ]
        let sum = buddys.reduce( (a,b) => { return a + b} )
        if( el2 === 0 && sum === 3 ) return 1
        else if ( el2 === 1 && ( sum === 2 || sum === 3 )) return 1
        else return 0
      });
      return row;
    });
    
    this.setState({
      cells,
      counter: this.state.counter + 1
    })
    if (loop) {
      this.frame = window.requestAnimationFrame(() => this._nextState(this.state.cells, true))
    }
  }
  
  _stepSimulation =() => {
    this._nextState(this.state.cells)
  }
  
  _startStopSimulation = () => {
    if(typeof this.frame === 'number') {
      window.cancelAnimationFrame(this.frame)
      this.frame = null
      this.setState({ ssBtn: 'start' })
      return
    }
    this.frame = window.requestAnimationFrame(() => this._nextState(this.state.cells, true))
    this.setState({ ssBtn: 'stop' });
  }
  
  _clearBoard = () => {
    const {cells} = this.state
    const newCells = cells.map(row => row.fill(0))
    this.setState({cells: newCells})
  }
  
  _handleClickCell = (e) => {
    e.stopPropagation()
    let _cells = [...this.state.cells]
    const x = +e.target.getAttribute('data-col') + 1
    const y = +e.target.getAttribute('data-row') + 1
    
    _cells[y][x] = _cells[y][x] ? 0 : 1
    
    this.setState({cells: _cells})
  }
  
  componentWillMount () {             // TODO: make it responsive
    this._responsiveCellNumber(12)
  }
  
    
  render() {
    const {cells, cellSize, colNum, rowNum} = this.state
    const rowLess = cells.slice(1, rowNum + 1)
    const filteredCells = rowLess.map((row) => row.slice(1, colNum + 1))
    
    const _rows = filteredCells.map((el, idx) => (
      <Row cells={el}
        cellSize={cellSize}
        row={idx}
        key={idx}
      />
    ))
      return (
        <div styleName='reactBody'>
          {/* <Profiler/> NOTE: uncomment this in development */}
          <Header
            startStopSim={this._startStopSimulation}
            stepSim={this._stepSimulation}
            clearBoard={this._clearBoard}
            counter={this.state.counter}
            ssBtn={this.state.ssBtn}
          />
          <div styleName='container' onClick={this._handleClickCell}>
            {_rows}
          </div>
            </div>
      )
    }
}
