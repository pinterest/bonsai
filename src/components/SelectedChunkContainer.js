/*
 * @flow
 */

import type { State } from '../reducer';
import type { Props } from './stats/SelectedChunk';

import { connect } from 'react-redux';
import SelectedChunk from './stats/SelectedChunk';

const mapStateToProps = (state: State): Props => {
  return {
    appMode: state.appMode,
  };
};

export default connect(
  mapStateToProps,
)(SelectedChunk);
