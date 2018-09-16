/*
 * @flow
 */

import type { Dispatch, State } from '../utils/reducer';
import type { DispatchProps, StateProps } from './App';

import App from './App';
import {connect} from 'react-redux';
import {
  SetAppMode,
  PickDataPath,
  DroppedDataFile,
} from '../utils/actions';

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
    mode: state.mode,
    appState: getAppState(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onSetAppMode: SetAppMode(dispatch),
    onPickedFile: PickDataPath(dispatch),
    onDroppedFile: DroppedDataFile(dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
