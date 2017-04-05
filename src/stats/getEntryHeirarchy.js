/*
 * @flow
 */

import type {RawStats} from '../types/Stats';

import getEntryChunks from './getEntryChunks';

const localeChunkName = /(.*?)locale-[a-z]{2}(_[0-9A-Z]{2,3})?-(index|lite)(.*)/;

type Child = {
  id: number,
  ids: Array<number>,
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
  ).map(
    (chunk) => ({
      id: chunk.id,
      ids: [chunk.id],
      name: chunk.names.map(squashLocaleChunks).join(', '),
      names: chunk.names,
      children: getChildrenForChunk(stats, chunk),
    })
  ).forEach((chunk) => {
    if (!collectedChunksByName[chunk.name]) {
      collectedChunksByName[chunk.name] = chunk;
    } else {
      collectedChunksByName[chunk.name].ids.push(chunk.ids);
    }
  });

  // $FlowFixMe: flow things `values` returns `Array<mixed>`
  const children: Array<Child> = Object.values(collectedChunksByName);
  return children;
}

export default function getEntryHeirarchy(stats: RawStats): {id: null, children: Array<Child>} {
  return {
    id: null,
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
