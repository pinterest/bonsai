/*
 * @flow
 */

import type {RawStats} from '../types/Stats';
import type {Dispatch, State} from '../reducer';

import App from './App';
import { connect } from 'react-redux'

const mapStateToProps = (state: State) => {
  if (state.selectedFilename) {
    if (state.json[state.selectedFilename]) {
      return {
        dataPaths: state.dataPaths,
        filename: state.selectedFilename,
        loading: false,
        json: state.json[state.selectedFilename],
      };
    } else {
      return {
        dataPaths: state.dataPaths,
        filename: state.selectedFilename,
        loading: true,
        json: null,
      };
    }
  } else {
    return {
      dataPaths: state.dataPaths,
      filename: null,
      loading: false,
      json: null,
    };
  }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onInitDataPaths(paths: Array<string>) {
      dispatch({
        type: 'initDataPaths',
        paths,
      });
    },

    onPickedFile(filename: ?string) {
      dispatch({
        type: 'pickedFile',
        filename: filename,
      });
    },

    onLoadingFailed() {
      dispatch({
        type: 'loadingFailed',
      });
    },

    onLoaded(filename: string, stats: RawStats) {
      dispatch({
        type: 'loadingFinished',
        filename,
        stats,
      });
      dispatch({
        type: 'pickedFile',
        filename,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
