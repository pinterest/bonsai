/**
 * @flow
 */

import './shims';

import AppContainer from './components/AppContainer';
import React from 'react';
import ReactDOM from 'react-dom';
import invariant from 'invariant';
import registerServiceWorker from './registerServiceWorker';

import handleAction from './reducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import UrlStateEncoder from './UrlStateEncoder';

import { PickedFile } from './actions';
import { fetchApiListEndpoint, fetchApiFileEndpoint } from './fetchJSON';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const store = createStore(
  handleAction,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

UrlStateEncoder.factory(store);

if (process.env.REACT_APP_STATS_URL) {
  PickedFile(store.dispatch)(process.env.REACT_APP_STATS_URL);
  invariant(process.env.REACT_APP_STATS_URL, 'for flow');
  fetchApiFileEndpoint(
    store.dispatch,
    process.env.REACT_APP_STATS_URL,
  );
}

if (process.env.REACT_APP_API_LIST_ENDPOINT) {
  fetchApiListEndpoint(
    store.dispatch,
    process.env.REACT_APP_API_LIST_ENDPOINT,
  );
} else {
  // eslint-disable-next-line no-console
  console.info('Env var \'REACT_APP_API_LIST_ENDPOINT\' was empty. Skipping fetch.');
}

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
