import { configure, addDecorator } from '@storybook/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as React from 'react';
import handleAction from '../src/utils/reducer';

function loadStories() {
  require('../src/components/stories');

  const req = require.context('../src/components', true, /\.stories\.js$/);
  req.keys().forEach(req);
}

const store = createStore(handleAction);
if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../src/utils/reducer', () => {
    const nextRootReducer = require('../src/utils/reducer').default;
    console.log('replacing with', nextRootReducer);
    store.replaceReducer(nextRootReducer);
  });
}

addDecorator((story) => (
  <Provider store={store}>
    {story()}
  </Provider>
));

configure(loadStories, module);
