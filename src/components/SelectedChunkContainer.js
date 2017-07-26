/*
 * @flow
 */

import type { RawStats } from '../types/Stats';
import type { Dispatch, State } from '../reducer';
import type { DispatchProps, StateProps } from './stats/SelectedChunk';

import { connect } from 'react-redux'
import fullModuleData from '../stats/fullModuleData';
import SelectedChunk from './stats/SelectedChunk';
import {
  PickedChunk,
  RemovedModule,
  IncludedModule,
} from '../actions';

type Props = {
  json: RawStats,
};

const mapStateToProps = (state: State, ownProps: Props): StateProps => {
  const {
    moduleData,
    extendedModules,
    chunksByParent,
    parentChunks,
  } = fullModuleData(
    ownProps.json,
    state.selectedChunkId,
    state.blacklistedModuleIds,
  );

  return {
    selectedChunkId: state.selectedChunkId,
    blacklistedModuleIds: state.blacklistedModuleIds,
    moduleData: moduleData,
    extendedModules: extendedModules,
    chunksByParent: chunksByParent,
    parentChunks: parentChunks,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onSelectChunkId: PickedChunk(dispatch),
    onRemoveModule: RemovedModule(dispatch),
    onIncludeModule: IncludedModule(dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedChunk);
