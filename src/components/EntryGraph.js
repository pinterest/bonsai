/*
 * @flow
 */

import type {RawStats} from '../types/Stats';

import './css/EntryGraph.css';

import React from 'react';
import getEntryHeirarchy from '../stats/getEntryHeirarchy';

type Props = {
  stats: RawStats,
  onSelectEntry: (chunkId: number) => void,
};

export default function(props: Props) {
  const chunksByParent = getEntryHeirarchy(props.stats);

  function renderEntryGraphNode(chunk) {
    const joinedNames = chunk.names.join(', ');
    return (
      <li key={joinedNames}>
        <a href="#" onClick={(event: Event) => {
          event.preventDefault();
          props.onSelectEntry(chunk.id);
        }}>
          {`${joinedNames} (${chunk.id})`}
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
