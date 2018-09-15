/*
 * @flow
 */

import './LoadingSpinner.css';

import * as React from 'react';
import { getClassName } from './Bootstrap/GlyphiconNames';

export default function LoadingSpinner() {
  return (
    <div className="LoadingSpinner-spinner text-center">
      <p>
        <span className={getClassName('refresh')} />
      </p>
      <p>
        <em>Loading</em>
      </p>
    </div>
  );
}
