/**
 * @flow
 */

import './shims';

import AppContainer from './components/AppContainer';
import handleAction from './reducer';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const store = createStore(
  handleAction,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
