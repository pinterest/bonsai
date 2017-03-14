/*
 * @flow
 */

import type {RawStats} from './types';

import React from 'react';
import getEntryHeirarchy from '../stats/getEntryHeirarchy';

type Props = {
  stats: RawStats,
};

function renderEntryGraphNode(chunk) {
  const joinedNames = chunk.names.join(', ');
  return (
    <li>
      <h5>{`${joinedNames} (${chunk.id})`}</h5>
      <ul>{chunk.children.map(renderEntryGraphNode)}</ul>
    </li>
  );
}

export default function(props: Props) {
  const chunksByParent = getEntryHeirarchy(props.stats);

  return (
    <ul>
      {chunksByParent.children.map(renderEntryGraphNode)}
    </ul>
  );
}



// function renderEntryGraph(processedData) {
//     var root = $('entry-graph');

//     processedData.chunksByParent.children
//         .map(renderEntryGraphNode)
//         .forEach(function(node) {
//             root.appendChild(node);
//         });
// }

// function renderEntryGraphNode(chunk) {
//     var children = chunk.children.map(renderEntryGraphNode);

//     return elem('li', null, [
//         elem('h5', null, [`${chunk.names.join(', ')} (${chunk.id})`]),
//         elem('ul', null, children),
//     ]);
// }
