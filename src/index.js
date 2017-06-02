/**
 * @flow
 */

import './shims';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
