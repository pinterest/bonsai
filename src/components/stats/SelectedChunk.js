/*
 * @flow
 */

import type {ChunkID, ModuleID, ExtendedModule} from '../../types/Stats';
import type {Child} from '../../stats/getEntryHeirarchy';

import BlacklistTable from './BlacklistTable';
import ChunkBreadcrumb from './ChunkBreadcrumb';
import ChunkDropdown from './ChunkDropdown';
import LoopTable from './LoopTable';
import ModuleTableContainer from './ModuleTableContainer';
import React from 'react';

export type StateProps = {
  selectedChunkId: ?ChunkID,
  blacklistedModuleIds: Array<ModuleID>,

  moduleData: ?{
    included: Array<ExtendedModule>,
    removed: Array<ExtendedModule>,
  },
  extendedModules: Array<ExtendedModule>,
  chunksByParent: Array<Child>,
  parentChunks: ?Array<Child>,
};

export type DispatchProps = {
  onSelectChunkId: (chunkId: ChunkID) => void,
  onIncludeModule: (moduleID: ModuleID) => void,
};

type Props = StateProps & DispatchProps;

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

  const loopList = props.extendedModules
    ? <div className="row">
        <div className="col-sm-12">
          <LoopTable extendedModules={props.extendedModules} />
        </div>
      </div>
    : null

  const moduleTable = props.moduleData
    ? <div className="row">
        <div className="col-sm-12">
          <div className="panel panel-primary">
            <div className="panel-heading">
              {props.moduleData.removed.length === 0
                ? 'All'
                : props.moduleData.included.length} Modules Included
            </div>
            <ModuleTableContainer
              extendedModules={props.extendedModules}
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
      {props.parentChunks && props.selectedChunkId !== null && props.selectedChunkId !== undefined
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
      {loopList}
      {moduleTable}
    </main>
  );
}
