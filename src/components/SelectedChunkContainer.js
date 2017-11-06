/*
 * @flow
 */

import type { Dispatch, State } from '../reducer';
import type { DispatchProps, StateProps } from './stats/SelectedChunk';

import { connect } from 'react-redux';
import SelectedChunk from './stats/SelectedChunk';
import {
  IncludedModule,
} from '../actions';

const mapStateToProps = (state: State): StateProps => {
  if (state.calculatedFullModuleData) {
    return {
      appMode: state.appMode,
      selectedChunkIdA: state.selectedChunkIdA,
      selectedChunkIdB: state.selectedChunkIdB,
      blacklistedModuleIds: state.blacklistedModuleIds,
      moduleData: state.calculatedFullModuleData.moduleData,
      extendedModules: state.calculatedFullModuleData.extendedModules,
      parentChunks: state.calculatedFullModuleData.parentChunks,
    };
  } else {
    return {
      appMode: state.appMode,
      selectedChunkIdA: state.selectedChunkIdA,
      selectedChunkIdB: state.selectedChunkIdB,
      blacklistedModuleIds: state.blacklistedModuleIds,
      moduleData: null,
      extendedModules: [],
      parentChunks: null,
    };
  }
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onIncludeModule: IncludedModule(dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedChunk);
