/*
 * @flow
 */

import type { Dispatch, State } from '../../utils/reducer';
import type { Props, DispatchProps, StateProps } from './ChunkDropdown';

import ChunkDropdown from './ChunkDropdown';
import {connect} from 'react-redux';
import {
  PickedChunk,
} from '../../utils/actions';

const mapStateToProps = (state: State): StateProps => {
  return {
    selectedChunkId: state.selectedChunkId,
    chunksByParent: state.calculatedFullModuleData
      ? state.calculatedFullModuleData.chunksByParent
      : [],
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onSelectChunkId: PickedChunk(dispatch),
  };
};

export default connect<Props, {||}, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps
)(ChunkDropdown);
