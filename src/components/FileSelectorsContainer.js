/*
 * @flow
 */

import type { Dispatch, State } from '../reducer';
import type { DispatchProps, StateProps } from './FileSelectors';

import FileSelectors from './FileSelectors';
import {connect} from 'react-redux';
import {
  PickedFile,
  PickedChunk,
} from '../actions';

const mapStateToProps = (state: State): StateProps => {
  return {
    dataPaths: state.dataPaths,
    filename: state.selectedFilename,

    selectedChunkId: state.selectedChunkId,
    chunksByParent: state.calculatedFullModuleData
      ? state.calculatedFullModuleData.chunksByParent
      : [],
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onPickedFile: PickedFile(dispatch),
    onSelectChunkId: PickedChunk(dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileSelectors);
