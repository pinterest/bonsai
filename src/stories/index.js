import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import App from '../components/App';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

storiesOf('App', module)
  .add('Default View', () => (
    <App />
  ));
