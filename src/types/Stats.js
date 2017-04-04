/*
 * @flow
 */

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
  id: number,
  rendered: boolean,
  initial: boolean,
  entry: boolean,
  extraAsync: boolean,
  size: number,
  names: Array<string>,
  files: Array<string>,
  hash: string,
  parents: Array<number>,
  origins: Array<Origin>
};

export type Module = {
  id: number,
  identifier: string,
  name: string,
  index: number,
  index2: number,
  size: number,
  cachable: boolean,
  built: boolean,
  optional: boolean,
  prefetched: boolean,
  chunks: Array<number>,
  assets: Array<*>,
  issuer: string,
  issuerId: number,
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


export type ExtendedModule = Module & {
  imports: Array<Module>,
};
