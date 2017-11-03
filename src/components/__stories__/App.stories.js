/**
 * @flow
 */

import App from '../App';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

storiesOf('App', module)
  .add('No filename, empty list', () => (
    <App
      appState="empty"
      onPickedFile={action('on picked file')}
      onDroppedFile={action('on dropped file')}
    />
  ))
  .add('Loading up a file', () => (
    <App
      appState="loading"
      onPickedFile={action('on picked file')}
      onDroppedFile={action('on dropped file')}
    />
  ))
  .add('Done loading', () => (
    <App
      appState="loaded"
      onPickedFile={action('on picked file')}
      onDroppedFile={action('on dropped file')}
    />
  ));
