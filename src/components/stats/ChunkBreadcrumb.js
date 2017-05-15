/*
 * @flow
 */

import type {RawStats} from '../../types/Stats';

import getParentChunks from '../../stats/getParentChunks';
import React from 'react';

type Props = {
  stats: RawStats,
  selectedChunkId: number,
  totalModules: number,
};

export default function ChunkBreadcrumb(props: Props) {
  const parentChunks = getParentChunks(
    props.stats,
    props.selectedChunkId,
  );

  if (!parentChunks) {
    return null;
  }

  return (
    <ol className="breadcrumb">
      {parentChunks.map((chunk) => (
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
