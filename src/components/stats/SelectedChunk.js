/*
 * @flow
 */

import type {ChunkID, ModuleID, ExtendedModule} from '../../types/Stats';
import type {Child} from '../../stats/getEntryHeirarchy';
import type { ModeType } from '../../reducer';

import BlacklistTableContainer from './BlacklistTableContainer';
import ChunkBreadcrumb from './ChunkBreadcrumb';
import LoopTableContainer from './LoopTableContainer';
import ModuleDataContainer from './ModuleDataContainer';
import * as React from 'react';

export type StateProps = {
  appMode: ModeType,
  selectedChunkIdA: ?ChunkID,
  selectedChunkIdB: ?ChunkID,
  blacklistedModuleIds: Array<ModuleID>,

  moduleData: ?{
    included: Array<ExtendedModule>,
    removed: Array<ExtendedModule>,
  },
  extendedModules: Array<ExtendedModule>,
  parentChunks: ?Array<Child>,
};

export type DispatchProps = {
  onIncludeModule: (moduleID: ModuleID) => void,
};

type Props = StateProps & DispatchProps;

export default function SelectedChunk(props: Props) {
  return (
    <main className="container-fluid">
      {props.parentChunks && props.selectedChunkIdA !== null && props.selectedChunkIdA !== undefined
        ? <div className="row">
          <div className="col-sm-11 col-sm-push-1">
            <ChunkBreadcrumb
              parentChunks={props.parentChunks}
              selectedChunkId={props.selectedChunkIdA}
              totalModules={
                (props.moduleData ? props.moduleData.included.length : 0) +
                  (props.moduleData ? props.moduleData.removed.length : 0)
              }
            />
          </div>
        </div>
        : null}
      <div className="row">
        <div className="col-sm-12">
          <BlacklistTableContainer />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <LoopTableContainer />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <ModuleDataContainer />
        </div>
      </div>
    </main>
  );
}
