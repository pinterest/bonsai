/*
 * @flow
 */

import type {Child} from '../../stats/getEntryHeirarchy';
import type {ChunkID} from '../../types/Stats';

import React from 'react';

type Props = {
  parentChunks: Array<Child>,
  selectedChunkId: ChunkID,
  totalModules: number,
};

export default function ChunkBreadcrumb(props: Props) {
  return (
    <ol className="breadcrumb">
      {props.parentChunks.map((chunk) => (
        <li
          key={chunk.id}
          className={props.selectedChunkId === chunk.id ? 'active' : ''}>
          {chunk.name} ({String(chunk.id)})
        </li>
      ))}
      {props.totalModules
        ? <li className="active">
            {props.totalModules} modules
          </li>
        : null}
    </ol>
  )
}
