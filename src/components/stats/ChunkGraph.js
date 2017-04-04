/*
 * @flow
 */

import type {RawStats} from '../../types/Stats';

import './css/ChunkGraph.css';

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
    const joinedNames = chunk.names.join(', ');
    const label = `${joinedNames} (${chunk.id})`;

    const isSelected = props.selectedChunkId === chunk.id;

    return (
      <li key={joinedNames}>
        <a href="#" onClick={(event: Event) => {
          event.preventDefault();
          props.onSelectChunkId(chunk.id);
        }}>
          {isSelected
            ? <strong>{label}</strong>
            : label
          }
        </a>
        <ul>{chunk.children.map(renderChunkGraphNode)}</ul>
      </li>
    );
  }

  return (
    <ul className="ChunkGraph">
      {chunksByParent.children.map(renderChunkGraphNode)}
    </ul>
  );
}
