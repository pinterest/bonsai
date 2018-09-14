/*
 * @flow
 */

import type { Child } from '../../stats/getEntryHierarchy';

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
