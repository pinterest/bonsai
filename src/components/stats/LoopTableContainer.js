/*
 * @flow
 */

import type { State } from '../../reducer';
import type { Props } from './LoopTable';

import { connect } from 'react-redux';
import LoopTable from './LoopTable';

const mapStateToProps = (state: State): Props => {
  return {
    extendedModules: state.calculatedFullModuleData
      ? state.calculatedFullModuleData.extendedModules
      : [],
  };
};

export default connect(
  mapStateToProps,
)(LoopTable);
