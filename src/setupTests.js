/**
 * @flow
 */

import './shims';

import handleAction from './reducer';
import * as React from 'react';
import { addDecorator } from '@storybook/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(handleAction);
const ReduxStoreDecorator = (storyFn) => (
  <Provider store={store}>
    { storyFn() }
  </Provider>
);
addDecorator(ReduxStoreDecorator);
