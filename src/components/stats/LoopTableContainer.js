/*
 * @flow
 */

import type { ExtendedModule } from '../../types/Stats';
import type { State } from '../../reducer';

import { connect } from 'react-redux';
import LoopTable from './LoopTable';

type Props = {
  extendedModules: ?Array<ExtendedModule>,
};

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
