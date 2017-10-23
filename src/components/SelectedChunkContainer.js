/*
 * @flow
 */

import type { Dispatch, State } from '../reducer';
import type { DispatchProps, StateProps } from './stats/SelectedChunk';

import { connect } from 'react-redux';
import SelectedChunk from './stats/SelectedChunk';
import {
  PickedChunk,
  IncludedModule,
} from '../actions';

const mapStateToProps = (state: State): StateProps => {
  if (state.calculatedFullModuleData) {
    return {
      selectedChunkId: state.selectedChunkIdA,
      blacklistedModuleIds: state.blacklistedModuleIds,
      moduleData: state.calculatedFullModuleData.moduleData,
      extendedModules: state.calculatedFullModuleData.extendedModules,
      chunksByParent: state.calculatedFullModuleData.chunksByParent,
      parentChunks: state.calculatedFullModuleData.parentChunks,
    };
  } else {
    return {
      selectedChunkId: state.selectedChunkIdA,
      blacklistedModuleIds: state.blacklistedModuleIds,
      moduleData: null,
      extendedModules: [],
      chunksByParent: [],
      parentChunks: null,
    };
  }
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onSelectChunkId: PickedChunk(dispatch),
    onIncludeModule: IncludedModule(dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedChunk);
