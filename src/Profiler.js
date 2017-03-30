import React from 'react'
import Perf from 'react-addons-perf'
import CSSModules from 'react-css-modules'

import styles from './css/profiler.css'

@CSSModules(styles)

class Profiler extends React.Component {
  
  state = { started: false };

  toggle = () => {
    const { started } = this.state;

    started ? Perf.stop() : Perf.start();
    this.setState({ started: !started });
  }

  printWasted = () => {
    const lastMeasurements = Perf.getLastMeasurements();
    Perf.printWasted(lastMeasurements);
  }

  printOperations = () => {
    const lastMeasurements = Perf.getLastMeasurements();
    Perf.printOperations(lastMeasurements);
  }

  render() {
    const { started } = this.state;

    return <div styleName='perf-profiler'>
      <h1>Performance Profiler</h1>
      <button onClick={this.toggle}>{started ? 'Stop' : 'Start'}</button>
      <button onClick={this.printWasted}>Print Wasted</button>
      <button onClick={this.printOperations}>Print Operations</button>
    </div>;
  }
}

export default Profiler;
