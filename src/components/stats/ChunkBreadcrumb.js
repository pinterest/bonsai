/*
 * @flow
 */

import type { Child } from '../../stats/getEntryHeirarchy';

import * as React from 'react';

export type Props = {
  parentChunks: Array<Child>,
  totalModules: number,
};

export default function ChunkBreadcrumb(props: Props) {
  return (
    <ol className="breadcrumb">
      {props.parentChunks.map((chunk) => (
        <li key={chunk.id}>
          {chunk.name} ({String(chunk.id)})
        </li>
      ))}
      {props.totalModules
        ? <li className="active">
          {props.totalModules} modules
        </li>
        : null}
    </ol>
  );
}
