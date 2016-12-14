import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './css/grid.css';

@CSSModules(styles)
export default class extends Component {
  
  _drawGrid(){
    let { cells, cellSize } = this.props
    let lastRow = cells.length - 1, lastCol = cells[0].length - 1
    
    return cells.map( (d,i) => {
      if(i === 0 || i === lastRow) return
      return <div styleName='row' style={{height: cellSize +'px'}} key={i}>
        {
          d.map( (data,j) => {
            if(j === 0 || j === lastCol) return
              let color = data > 0 ? '#47E318' : '#0F0F0F'
                return <div styleName='cell' data-cell={data} style={{width: cellSize +'px', backgroundColor: color}} key={ `${i},${j}` }></div>
          })
        }
      </div>
    })
  }
  
  // componentDidMount(){
  //   this.getCoordinates()
  // }
  // getCoordinates(){console.log(this._targetDiv);
  //   let dropMen = this._targetDiv;
  //   let specs = dropMen.getBoundingClientRect();console.log(specs)
  // }
  
  render() {
      return (
        <div styleName='container' ref={ (div) => {this._targetDiv = div}}>
          { this._drawGrid() }
        </div>
      )
    }
}
