/*
 * @flow
 */

import type { State } from '../../reducer';
import type { ChunkID, ModuleID, ExtendedModule } from '../../types/Stats';
import type { Child } from '../../stats/getEntryHeirarchy';

import { connect } from 'react-redux';
import ChunkBreadcrumb from './ChunkBreadcrumb';
import * as React from 'react';

export type StateProps = {
  selectedChunkId: ?ChunkID,
  blacklistedModuleIds: Array<ModuleID>,

  moduleData: ?{
    included: Array<ExtendedModule>,
    removed: Array<ExtendedModule>,
  },
  extendedModules: Array<ExtendedModule>,
  parentChunks: ?Array<Child>,
};

function ChunkBreadcrumbContainer(props: StateProps) {
  return (
    props.parentChunks && props.selectedChunkId !== null && props.selectedChunkId !== undefined
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
      : null
  );
}

const mapStateToProps = (state: State): StateProps => {
  if (state.calculatedFullModuleData) {
    return {
      selectedChunkId: state.selectedChunkIdA,
      blacklistedModuleIds: state.blacklistedModuleIds,
      moduleData: state.calculatedFullModuleData.moduleData,
      extendedModules: state.calculatedFullModuleData.extendedModules,
      parentChunks: state.calculatedFullModuleData.parentChunks,
    };
  } else {
    return {
      selectedChunkId: state.selectedChunkIdA,
      blacklistedModuleIds: state.blacklistedModuleIds,
      moduleData: null,
      extendedModules: [],
      parentChunks: null,
    };
  }
};

export default connect(
  mapStateToProps,
)(ChunkBreadcrumbContainer);
