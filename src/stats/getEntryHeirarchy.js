/*
 * @flow
 */

import type {ChunkID, RawStats} from '../types/Stats';

import getEntryChunks from './getEntryChunks';

const localeChunkName = /(.*?)locale-[a-z]{2}(_[0-9A-Z]{2,3})?-(index|lite)(.*)/;

export type Child = {
  id: ChunkID,
  ids: Array<ChunkID>,
  name: string,
  names: Array<string>,
  children: Array<Child>,
};

function squashLocaleChunks(name: string) {
  const match = name.match(localeChunkName);
  if (match) {
    return `${match[1]}local-.*-${match[3]}${match[4]}`;
  }
  return name;
}

function getChildrenForChunk(stats, parentChunk): Array<Child> {
  // collect chunks with the same name here
  const collectedChunksByName = {};

  getEntryChunks(stats).filter(
    (chunk) => chunk.parents.includes(parentChunk.id)
  ).forEach((chunk) => {
    const name = chunk.names.map(squashLocaleChunks).join(', ');

    if (!collectedChunksByName[name]) {
      collectedChunksByName[name] = {
        id: chunk.id,
        ids: [chunk.id],
        name: name,
        names: chunk.names,
        children: getChildrenForChunk(stats, chunk),
      };
    } else {
      collectedChunksByName[name].ids.push(chunk.id);
    }
  });

  // $FlowFixMe: flow thinks `values` returns `Array<mixed>`
  const children: Array<Child> = Object.values(collectedChunksByName);
  return children;
}

export const ROOT_ID = Number.MIN_SAFE_INTEGER;

export default function getEntryHeirarchy(
  stats: RawStats,
): Child {
  return {
    id: ROOT_ID,
    ids: [],
    name: '',
    names: [],
    children: getEntryChunks(stats)
      .filter((chunk) => chunk.parents.length === 0)
      .map((chunk) => ({
        id: chunk.id,
        ids: [chunk.id],
        name: chunk.names.map(squashLocaleChunks).join(', '),
        names: chunk.names,
        children: getChildrenForChunk(stats, chunk),
      })),
  };
}
