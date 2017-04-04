/*
 * @flow
 */

import type {Chunk} from '../types/Stats';

export type ChunksById = {[key: number]: Chunk};

export default function getChunksById(chunks: Array<Chunk>): ChunksById {
  const chunksById = {};
  chunks.forEach((module) => {
    chunksById[module.id] = module;
  });
  return chunksById;
}
