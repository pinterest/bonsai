/*
 * @flow
 */

import type {RawStats} from '../types/Stats';

import './css/EntryGraph.css';

import getEntryHeirarchy from '../stats/getEntryHeirarchy';
import React from 'react';

type Props = {
  stats: RawStats,
  selectedChunkId: ?number,
  onSelectChunkId: (chunkId: number) => void,
};

export default function(props: Props) {
  const chunksByParent = getEntryHeirarchy(props.stats);

  function renderEntryGraphNode(chunk) {
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
        <ul>{chunk.children.map(renderEntryGraphNode)}</ul>
      </li>
    );
  }

  return (
    <ul className="EntryGraph">
      {chunksByParent.children.map(renderEntryGraphNode)}
    </ul>
  );
}
