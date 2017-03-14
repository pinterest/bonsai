/*
 * @flow
 */

import type {RawStats} from './types';

import React from 'react';
import EntryGraph from './EntryGraph';

type Props = {
  stats: RawStats,
};

export default function(props: Props) {
  return (
    <div>
      <EntryGraph stats={props.stats} />


    </div>
  );
}
