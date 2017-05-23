/*
 * @flow
 */

export type ChunkID = string | number;

export type Asset = {
  name: string,
  size: number,
  chunks: Array<string>,
  chunkNames: Array<string>,
  emitted: boolean,
};

export type EntryPoint = {
  chunks: Array<number>,
  assets: Array<string>,
};

export type Reason = {
  moduleId: number,
  moduleIdentifier: string,
  module: string,
  moduleName: string,
  type: string,
  userRequest: string,
  loc: string,
};

export type Origin = {
  moduleId: number,
  module: string,
  moduleIdentifier: string,
  moduleName: string,
  loc: string,
  name: ?string,
  reasons: Array<Reason>,
};

export type Chunk = {
  id: ChunkID,
  rendered: boolean,
  initial: boolean,
  entry: boolean,
  extraAsync: boolean,
  size: number,
  name: string,
  names: Array<string>,
  files: Array<string>,
  hash: string,
  parents: Array<ChunkID>,
  origins: Array<Origin>
};

export type ModuleID = string | number;

export type Module = {
  id: ModuleID,
  identifier: string,
  name: string,
  index: number,
  index2: number,
  size: number,
  cacheable: boolean,
  built: boolean,
  optional: boolean,
  prefetched: boolean,
  chunks: Array<number>,
  assets: Array<*>,
  issuer: string,
  issuerId: string | number,
  failed: boolean,
  errors: number,
  warnings: number,
  reasons: Array<Reason>,
  usedExports: true | Array<string>,
  providedExports: ?Array<string>,
};

export type RawStats = {
  assets: Array<Asset>,
  entrypoints: {
    [key: string]: EntryPoint,
  },
  chunks: Array<Chunk>,
  modules: Array<Module>,
};

// should be ExtendedModule = Module & { requirements: Array<Module> };
export type ExtendedModule = {
  id: ModuleID,
  identifier: string,
  name: string,
  index: number,
  index2: number,
  size: number,
  cacheable: boolean,
  built: boolean,
  optional: boolean,
  prefetched: boolean,
  chunks: Array<number>,
  assets: Array<*>,
  issuer: string,
  issuerId: string | number,
  failed: boolean,
  errors: number,
  warnings: number,
  reasons: Array<Reason>,
  usedExports: true | Array<string>,
  providedExports: ?Array<string>,

  requiredBy: Array<Reason>,
  requiredByCount: number,
  requirements: Array<Module>,
  cumulativeSize: number,
  loops: Array<Array<ModuleID>>,
};
