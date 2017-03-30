/* @flow */
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const rootEl = document.getElementById('root');

if (process.env.NODE_ENV === 'production') {
  ReactDOM.render(
    <App/>,
    rootEl
  )
} else {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    rootEl,
    function() {
      console.timeEnd('react-app');
    }
  );
  
  if (module.hot) {
    module.hot.accept('./App', () => {
      // If you use Webpack 2 in ES modules mode, you can
      // use <App /> here rather than require() a <NextApp />.
      const NextApp = require('./App').default;
      ReactDOM.render(
        <AppContainer>
          <NextApp />
        </AppContainer>,
        rootEl,
        function() {
          console.timeEnd('react-app');
        }
      );
    });
  }
}
