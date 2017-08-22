/*
 * @flow
 */

import type { RawStats } from '../types/Stats';
import type { Dispatch, State } from '../reducer';
import type { DispatchProps, StateProps } from './stats/SelectedChunk';

import { connect } from 'react-redux';
import SelectedChunk from './stats/SelectedChunk';
import {
  PickedChunk,
  IncludedModule,
} from '../actions';

type Props = {
  json: RawStats,
};

const mapStateToProps = (state: State, ownProps: Props): StateProps => {
  if (state.calculatedFullModuleData) {
    return {
      selectedChunkId: state.selectedChunkId,
      blacklistedModuleIds: state.blacklistedModuleIds,
      moduleData: state.calculatedFullModuleData.moduleData,
      extendedModules: state.calculatedFullModuleData.extendedModules,
      chunksByParent: state.calculatedFullModuleData.chunksByParent,
      parentChunks: state.calculatedFullModuleData.parentChunks,
    };
  } else {
    return {
      selectedChunkId: state.selectedChunkId,
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
