/*
 * @flow
 */

import type {ModuleID, ExtendedModule} from '../../types/Stats';
import type {Child} from '../../stats/getEntryHeirarchy';

import BlacklistTable from './BlacklistTable';
import ChunkBreadcrumb from './ChunkBreadcrumb';
import ChunkDropdown from './ChunkDropdown';
import ModuleTable from './ModuleTable';
import React from 'react';

type Props = {
  selectedChunkId: ?number,
  blacklistedModuleIds: Array<ModuleID>,

  moduleData: ?{
    included: Array<ExtendedModule>,
    removed: Array<ExtendedModule>,
  },
  extendedModules: Array<ExtendedModule>,
  chunksByParent: Array<Child>,
  parentChunks: ?Array<Child>,

  onSelectChunkId: (chunkId: string | number) => void,
  onRemoveModule: (moduleID: ModuleID) => void,
  onIncludeModule: (moduleID: ModuleID) => void,
};

export default function SelectedChunk(props: Props) {
  const blackList = props.moduleData && props.moduleData.removed.length
    ? <div className="row">
        <div className="col-sm-12">
          <div className="panel panel-danger">
            <div className="panel-heading">
              {props.moduleData.removed.length} Modules Ignored
            </div>
            <BlacklistTable
              blacklistedModulesIds={props.blacklistedModuleIds}
              removedModules={props.moduleData.removed}
              onIncludeModule={props.onIncludeModule}
            />
          </div>
        </div>
      </div>
    : null;

  const moduleTable = props.moduleData
    ? <div className="row">
        <div className="col-sm-12">
          <div className="panel panel-primary">
            <div className="panel-heading">
              {props.moduleData.removed.length === 0
                ? 'All'
                : props.moduleData.included.length} Modules Included
            </div>
            <ModuleTable
              extendedModules={props.extendedModules}
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
            chunksByParent={props.chunksByParent}
            selectedChunkId={props.selectedChunkId}
            onSelectChunkId={props.onSelectChunkId}
          />
        </div>
      </div>
      {props.parentChunks && props.selectedChunkId
        ? <div className="row">
            <div className="col-sm-11 col-sm-push-1">
              <ChunkBreadcrumb
                parentChunks={props.parentChunks}
                selectedChunkId={props.selectedChunkId}
                totalModules={
                  (props.moduleData ? props.moduleData.included.length : 0) +
                  (props.moduleData ? props.moduleData.removed.length : 0)
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
