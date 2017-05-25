/*
 * @flow
 */

import type {ModuleID, Module, Reason, ExtendedModule, Chunk} from '../types/Stats';

export function defaultModule(fields: {
  id: ModuleID,
}): Module {
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
    ...fields
  };
}
export function defaultExtendedModule(fields: {
  id: ModuleID,
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
    requirementsCount: 0,
    cumulativeSize: 0,
    loops: [],
    ...fields,
  };
}

export function defaultReason(fields: {
  moduleId: ModuleID,
}): Reason {
  return {
    moduleIdentifier: '',
    module: '',
    moduleName: '',
    type: '',
    userRequest: '',
    loc: '',
    ...fields,
  };
}

export function reasonFromModule(module: Module): Reason {
  return defaultReason({
    moduleId: module.id,
    moduleIdentifier: module.identifier,
    module: module.name,
    moduleName: module.name,
  });
}

export function defaultChunk(fields: {
  id: ModuleID,
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
    parents: [],
    origins: [],
    ...fields,
  };
}
