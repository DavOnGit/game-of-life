import React, { Component } from 'react';
import Grid from './Grid'
import Header from './Header'
import CSSModules from 'react-css-modules';
import styles from './css/app.css';

@CSSModules(styles)
export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cells: [],
      cellSize: 0,
      counter: 0,
      ssBtn: 'start'
    }
  }
  
  componentWillMount() {
    this._responsiveCellNumber(12)
  }
  
  _responsiveCellNumber(size = 12){
    const w = window.innerWidth - 50, h = window.innerHeight - 150
    const minSize = 6, maxSize = w > h ? h/3 : w/3
    const cellSize = size < minSize ? minSize : size > maxSize ? maxSize : size;
    
    let colNum = ~~(w / cellSize)
    let rowNum = ~~(h / cellSize)
    
    this.setState( { cellSize } )
    this._buildRandomArr(rowNum, colNum)
    //console.log(`${colNum} ${rowNum}`)
  }
  
  _buildRandomArr(row = 0 , col = 0){
    const r = Array.apply(null, Array(row + 2))
    const c = Array.apply(null, Array(col + 2))
    const cells = r.map( el => {
      return c.map( el2 => {
        return (Math.floor(Math.random() * 1.2)) ? 1 : 0
      })
    })
    this.setState( { cells } )
  }
  
  _nextState(array=[], loop=false){
    let arr = array, cells = [], buddys = []
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
    
    console.log('arr:')
    console.log(arr)
    
    cells = arr.map( (el,i) => {
      if (i === 0 || i === lastRow) return el;
      let row = el.map( (el2,j) => {
        if (j === 0 || j === lastCol) return el2;
        let buddys = [
          arr[i-1][j-1],  arr[i-1][j],  arr[i-1][j+1],
          arr[i][j-1],                  arr[i][j+1],
          arr[i+1][j-1],  arr[i+1][j],  arr[i+1][j+1]
        ]
        let sum = buddys.reduce( (a,b) => { return a + b} )
        if( el2 === 0 && sum === 3 ) return 1
        else if ( el2 === 1 && ( sum === 2 || sum === 3 )) return 1
        else return 0
        //return acc2.concat(sum);
      });
      return row;
    });
    
    this.setState({
      cells: cells,
      counter: this.state.counter + 1
    })
    console.log(cells)
    
    if (loop) {
      this.props.timer = window.setTimeout( () => {
        this._nextState(this.state.cells, true)
      }, 1)
    }
  }
  
  _stepSimulation(){
    console.log('step btn is starting simulation!');
    this._nextState(this.state.cells)
  }
  
  _startStopSimulation(){
    if(typeof this.props.timer === 'number') {
      window.clearTimeout(this.props.timer)
      this.props.timer = null
      this.setState({ ssBtn: 'start' })
      return
    }
    this._nextState(this.state.cells, true)
    this.setState({ ssBtn: 'stop' });
  }
  
  _stopSimulation() {
    if(typeof this.props.timer === 'number') return window.clearTimeout(this.props.timer)
  }
  
  render() {
    console.log('render:')
    console.log(this)
      return (
        <div styleName='reactBody'>
          <Header
            startStopSim={this._startStopSimulation.bind(this)}
            // stopSim={this._stopSimulation.bind(this)}
            stepSim={this._stepSimulation.bind(this)}
            counter={this.state.counter}
            ssBtn={this.state.ssBtn}
          />
          <Grid cells={this.state.cells} cellSize={this.state.cellSize}/>
        </div>
      )
    }
}
