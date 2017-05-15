/*
 * @flow
 */

import type {ModuleID, RawStats} from '../../types/Stats';

import BlacklistTable from './BlacklistTable';
import ChunkBreadcrumb from './ChunkBreadcrumb';
import ChunkDropdown from './ChunkDropdown';
import fullModuleData from '../../stats/fullModuleData';
import ModuleTable from './ModuleTable';
import React from 'react';

type Props = {
  json: RawStats,
  selectedChunkId: ?number,
  blacklistedModuleIds: Array<ModuleID>,
  onSelectChunkId: (chunkId: string | number) => void,
  onRemoveModule: (moduleID: ModuleID) => void,
  onIncludeModule: (moduleID: ModuleID) => void,
};

export default function SelectedChunk(props: Props) {
  const {
    moduleData,
    extendedModules,
    chunksByParent,
    parentChunks,
  } = fullModuleData(
    props.json,
    props.selectedChunkId,
    props.blacklistedModuleIds,
  );

  const blackList = moduleData && moduleData.removed.length
    ? <div className="row">
        <div className="col-sm-12">
          <div className="panel panel-danger">
            <div className="panel-heading">
              {moduleData.removed.length} Modules Ignored
            </div>
            <BlacklistTable
              blacklistedModulesIds={props.blacklistedModuleIds}
              removedModules={moduleData.removed}
              onIncludeModule={props.onIncludeModule}
            />
          </div>
        </div>
      </div>
    : null;

  const moduleTable = moduleData
    ? <div className="row">
        <div className="col-sm-12">
          <div className="panel panel-primary">
            <div className="panel-heading">
              {moduleData.removed.length === 0
                ? 'All'
                : moduleData.included.length} Modules Included
            </div>
            <ModuleTable
              extendedModules={extendedModules}
              onRemoveModule={props.onRemoveModule}
            />
          </div>
        </div>
      </div>
    : null;

  return (
    <main className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <ChunkDropdown
            chunksByParent={chunksByParent}
            selectedChunkId={props.selectedChunkId}
            onSelectChunkId={props.onSelectChunkId}
          />
        </div>
      </div>
      {parentChunks && props.selectedChunkId
        ? <div className="row">
            <div className="col-sm-11 col-sm-push-1">
              <ChunkBreadcrumb
                parentChunks={parentChunks}
                selectedChunkId={props.selectedChunkId}
                totalModules={
                  (moduleData ? moduleData.included.length : 0) +
                  (moduleData ? moduleData.removed.length : 0)
                }
              />
            </div>
          </div>
        : null}
      {blackList}
      {moduleTable}
    </main>
  );
}
