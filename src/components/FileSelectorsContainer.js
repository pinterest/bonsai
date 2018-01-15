/*
 * @flow
 */

import type { Dispatch, State } from '../utils/reducer';
import type { DispatchProps, StateProps } from './FileSelectors';

import FileSelectors from './FileSelectors';
import {connect} from 'react-redux';
import {
  fetchDataFile,
  PickedChild,
  PickedChunk,
} from '../utils/actions';

const mapStateToProps = (state: State): StateProps => {
  const children = (state.jsonChildren && state.selectedFilename)
    ? state.jsonChildren[state.selectedFilename]
    : null;

  return {
    dataPaths: Object.keys(state.dataPaths),
    filename: state.selectedFilename,
    childrenIndexes: children ? children.map((k, i) => i) : null,
    selectedChildIndex: state.selectedChildIndex,
    selectedChunkId: state.selectedChunkId,
    chunksByParent: state.calculatedFullModuleData
      ? state.calculatedFullModuleData.chunksByParent
      : [],
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onPickedFile: fetchDataFile(dispatch),
    onPickedChild: PickedChild(dispatch),
    onSelectChunkId: PickedChunk(dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileSelectors);
