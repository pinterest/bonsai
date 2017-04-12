/*
 * @flow
 */

import type {RawStats} from '../../types/Stats';

import getEntryHeirarchy from '../../stats/getEntryHeirarchy';
import React from 'react';

type Props = {
  stats: RawStats,
  selectedChunkId: ?number,
  onSelectChunkId: (chunkId: number) => void,
};

export default function ChunkGraph(props: Props) {
  const chunksByParent = getEntryHeirarchy(props.stats);

  function renderChunkGraphNode(chunk) {
    if (chunk.ids.length > 1) {
      return (
        <li key={chunk.name} className="list-group-item">
          {chunk.name} ({chunk.id})
          <ul>{chunk.children.map(renderChunkGraphNode)}</ul>
        </li>
      );
    } else {
      const isSelected = props.selectedChunkId === chunk.id;

      return (
        <li key={chunk.name} className="list-group-item">
          <a href="#" onClick={(event: Event) => {
            event.preventDefault();
            props.onSelectChunkId(chunk.id);
          }}>
            {isSelected
              ? <strong>{chunk.name}  ({chunk.id})</strong>
              : `${chunk.name} (${chunk.id})`
            }
          </a>
          <ul>{chunk.children.map(renderChunkGraphNode)}</ul>
        </li>
      );
    }
  }

  return (
    <ul className="list-group">
      {chunksByParent.children.map(renderChunkGraphNode)}
    </ul>
  );
}
