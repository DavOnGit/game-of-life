/* @flow */
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './css/layout.css';

function Layout({ children }) {
    return (
        <div className={ styles.root }>
          <h1 className={ styles.text }>Hello, world!</h1>
            {children}
        </div>
  )
}

export default CSSModules(Layout, styles);
