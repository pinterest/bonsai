import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import App from '../components/App';

storiesOf('App', module)
  .add('Default View', () => (
    <App />
  ));
