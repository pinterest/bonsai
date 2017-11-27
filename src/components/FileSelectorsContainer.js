/*
 * @flow
 */

import type { Dispatch, State } from '../utils/reducer';
import type { DispatchProps, StateProps } from './FileSelectors';

import FileSelectors from './FileSelectors';
import {connect} from 'react-redux';
import {
  fetchDataFile,
  PickedChunk,
} from '../utils/actions';

const mapStateToProps = (state: State): StateProps => {
  return {
    dataPaths: Object.keys(state.dataPaths),
    filename: state.selectedFilename,

    selectedChunkId: state.selectedChunkId,
    chunksByParent: state.calculatedFullModuleData
      ? state.calculatedFullModuleData.chunksByParent
      : [],
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onPickedFile: fetchDataFile(dispatch),
    onSelectChunkId: PickedChunk(dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileSelectors);
