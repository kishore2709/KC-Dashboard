import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { App } from './components/App';
// import Google from './components/Google';
import * as serviceWorker from './serviceWorker';
import 'assets/css/material-dashboard-react.css?v=1.5.0';

import { store } from './_helpers';

// console.log('refresh');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
