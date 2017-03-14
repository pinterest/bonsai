/*
 * @flow
 */

import type {RawStats} from '../types/Stats';

import getModulesByChunk from '../stats/getModulesByChunk';
import getModulesById from '../stats/getModulesById';
import getParentChunkIds from '../stats/getParentChunkIds';
import ModuleList from './ModuleList';
import React from 'react';

type Props = {
  stats: RawStats,
  selectedChunkId: number,
};

function list(items) {
  if (!items) {
    return null;
  }
  return (
    <ul>
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  )
}

export default function(props: Props) {
  const parentChunkIds = getParentChunkIds(
      props.stats,
      props.selectedChunkId
    );
    if (!parentChunkIds) {
      return null;
    }

    const modulesByChunk = getModulesByChunk(props.stats);

    const modules = parentChunkIds.reduce((modules, chunkId) => {
      return modules.concat(modulesByChunk[chunkId].modules);
    }, []);


    const modulesById = getModulesById(modules);

    const extendedModules = modules.map((module) => {
      return {
        ...module,
        children: [],
      };
    });

    console.log('extended modules', extendedModules);

    return (
      <div>
        <strong>{props.selectedChunkId}</strong>
        {list(parentChunkIds)}
        <ModuleList extendedModules={extendedModules} />
      </div>
    );
}
