/**
 * @flow
 */

import './shims';

import AppContainer from './components/AppContainer';
import * as React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './utils/registerServiceWorker';

import handleAction from './utils/reducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import UrlStateEncoder from './utils/UrlStateEncoder';

import { fetchDataFile, fetchApiList } from './utils/actions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const store = createStore(
  handleAction,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

UrlStateEncoder.factory(store);

const onHasStatsUrl = fetchDataFile(store.dispatch);
const onHasListEndpoint = fetchApiList(store.dispatch);

if (process.env.REACT_APP_STATS_URL) {
  onHasStatsUrl(process.env.REACT_APP_STATS_URL);
} else {
  // eslint-disable-next-line no-console
  console.info('Env var \'REACT_APP_STATS_URL\' was empty. Skipping fetch.');
}

if (process.env.REACT_APP_API_LIST_ENDPOINT) {
  onHasListEndpoint(process.env.REACT_APP_API_LIST_ENDPOINT);
} else {
  // eslint-disable-next-line no-console
  console.info('Env var \'REACT_APP_API_LIST_ENDPOINT\' was empty. Skipping fetch.');
}

const root = document.getElementById('root');
if (!root) {
  throw new Error('Missing root node');
}
ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  root,
);

// $FlowFixMe
if (module.hot) {
  // $FlowFixMe
  module.hot.accept('./utils/reducer', () => {
    store.replaceReducer(handleAction);
  });
  // $FlowFixMe
  module.hot.accept('./components/AppContainer', () => {
    const NextApp = require('./components/AppContainer').default;
    ReactDOM.render(
      <Provider store={store}>
        <NextApp />
      </Provider>,
      root
    );
  });
}

registerServiceWorker();
