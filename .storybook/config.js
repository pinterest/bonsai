import { configure, addDecorator } from '@storybook/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as React from 'react';
import handleAction from '../src/utils/reducer';
import requireContext from 'require-context.macro';

function loadStories() {
  require('../src/components/stories');

  const req = requireContext('../src/components', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
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
