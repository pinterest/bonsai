/*
 * @flow
 */

import type {Child} from '../../stats/getEntryHeirarchy';

import React from 'react';

type Props = {
  parentChunks: Array<Child>,
  selectedChunkId: number,
  totalModules: number,
};

export default function ChunkBreadcrumb(props: Props) {
  return (
    <ol className="breadcrumb">
      {props.parentChunks.map((chunk) => (
        <li
          key={chunk.id}
          className={props.selectedChunkId === chunk.id ? 'active' : ''}>
          {chunk.names.join(', ')} ({String(chunk.id)})
        </li>
      ))}
      {props.totalModules
        ? <li className="active">
            showing {props.totalModules} modules
          </li>
        : null}
    </ol>
  )
}
