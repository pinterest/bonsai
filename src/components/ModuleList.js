/*
 * @flow
 */

import type {Module} from '../types/Stats';

import React from 'react';

type Props = {
  modules: Array<Module>,
};

export default function(props: Props) {
  return (
    <ul>
      {props.modules.map((module) =>
        <li key={module}>{module}</li>
      )}
    </ul>
  );
}
