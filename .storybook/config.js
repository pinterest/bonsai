import { configure, addDecorator } from '@storybook/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as React from 'react';
import handleAction from '../src/reducer';

function loadStories() {
  require('../src/components/stories');

  const req = require.context('../src/components', true, /\.stories\.js$/);
  req.keys().forEach(req);
}

addDecorator(story => (
  <Provider store={createStore(handleAction)}>
    {story()}
  </Provider>
));

configure(loadStories, module);
