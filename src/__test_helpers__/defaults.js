/*
 * @flow
 */

import type {ModuleID, ExtendedModule, Chunk} from '../types/Stats';

export function defaultExtendedModule(fields: {
  id: ModuleID
}): ExtendedModule {
  return {
    identifier: '',
    name: '',
    index: 0,
    index2: 0,
    size: 0,
    cacheable: false,
    built: false,
    optional: false,
    prefetched: false,
    chunks: [],
    assets: [],
    issuer: '',
    issuerId: '',
    failed: false,
    errors: 0,
    warnings: 0,
    reasons: [],
    usedExports: true,
    providedExports: null,

    requiredBy: [],
    requiredByCount: 0,
    requirements: [],
    cumulativeSize: 0,
    loops: [],
    ...fields,
  };
}

export function defaultChunk(fields: {
  id: ModuleID
}): Chunk {
  return {
    rendered: false,
    initial: false,
    entry: false,
    extraAsync: false,
    size: 0,
    name: '',
    names: [],
    files: [],
    hash: '',
    parents: [fields.id],
    origins: [],
    ...fields,
  };
}
