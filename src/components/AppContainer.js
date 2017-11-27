/*
 * @flow
 */

import type { Dispatch, State } from '../reducer';
import type { DispatchProps, StateProps } from './App';

import App from './App';
import {connect} from 'react-redux';
import {
  PickDataPath,
  DroppedDataFile,
} from '../actions';

function getAppState(state: State): * {
  if (!state.selectedFilename || !state.dataPaths[state.selectedFilename]) {
    return 'empty';
  }
  switch (state.dataPaths[state.selectedFilename]) {
    case 'unknown': // fall through
    case 'loading':
      return 'loading';
    case 'ready':
      return 'loaded';
    case 'error': // fall through
    default:
      return 'empty';
  }
}

const mapStateToProps = (state: State): StateProps => {
  return {
    appState: getAppState(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onPickedFile: PickDataPath(dispatch),
    onDroppedFile: DroppedDataFile(dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
