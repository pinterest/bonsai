/*
 * @flow
 */

import type { Dispatch, State } from '../reducer';
import type { DispatchProps, StateProps } from './FileSelectors';

import FileSelectors from './FileSelectors';
import {connect} from 'react-redux';
import {
  ChangedMode,
  PickedFile,
  PickedChunk,
} from '../actions';

const mapStateToProps = (state: State): StateProps => {
  return {
    dataPaths: state.dataPaths,
    appMode: state.appMode,
    fileA: state.selectedFilenameA,
    fileB: state.selectedFilenameB,

    selectedChunkIdA: state.selectedChunkIdA,
    selectedChunkIdB: state.selectedChunkIdB,
    chunksByParent: state.calculatedFullModuleData
      ? state.calculatedFullModuleData.chunksByParent
      : [],
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onChangedMode: ChangedMode(dispatch),
    onPickedFile: PickedFile(dispatch),
    onSelectChunkId: PickedChunk(dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileSelectors);
