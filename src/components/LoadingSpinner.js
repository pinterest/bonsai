/*
 * @flow
 */

import './LoadingSpinner.css';

import * as React from 'react';
import Octicon, { Sync } from '@github/octicons-react';

export default function LoadingSpinner() {
  return (
    <div className="text-center">
      <p>
        <Octicon
          icon={Sync}
          size='large'
          className="LoadingSpinner-icon" />
      </p>
      <p>
        <em>Loading</em>
      </p>
    </div>
  );
}
