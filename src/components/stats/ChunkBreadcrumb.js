/*
 * @flow
 */

import type { Child } from '../../stats/getEntryHeirarchy';

import Unit from '../Unit';
import * as React from 'react';

export type Props = {
  parentChunks: Array<Child>,
  totalModules: number,
};

export default function ChunkBreadcrumb(props: Props) {
  if (props.parentChunks.length === 0) {
    return null;
  }
  return (
    <ol className="breadcrumb">
      {props.parentChunks.map((chunk) => (
        <li key={chunk.id}>
          {chunk.name} (<Unit bytes={chunk.size} />)
        </li>
      ))}
      {props.totalModules
        ? <li className="active">
          {props.totalModules} modules total
        </li>
        : null}
    </ol>
  );
}
