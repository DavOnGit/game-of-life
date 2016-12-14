/* @flow */
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './css/counter.css';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }

  tick() {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <h2 className={ styles.text }>Counter: {this.state.counter}</h2>
   );
  }
}

export default CSSModules(Counter, styles);
