/**
 * @flow
 */

import './shims';

import AppContainer from './components/AppContainer';
import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import handleAction from './reducer';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import {
  InitDataPaths,
  PickedFile,
} from './actions';
import {fetchApiListEndpoint} from './fetchJSON';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const store = createStore(
  handleAction,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

if (process.env.REACT_APP_STATS_URL) {
  PickedFile(store.dispatch)(process.env.REACT_APP_STATS_URL);
}

fetchApiListEndpoint(
  process.env.REACT_APP_API_LIST_ENDPOINT,
  (paths: Array<string>) => {
    InitDataPaths(store.dispatch)(paths);
  },
);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
