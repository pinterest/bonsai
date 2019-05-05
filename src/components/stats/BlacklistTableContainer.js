/*
 * @flow
 */

import type { Dispatch } from '../../utils/reducer';
import type { State } from '../../utils/reducer';
import type { Props, StateProps, DispatchProps } from './BlacklistTable';

import BlacklistTable from './BlacklistTable';
import { connect } from 'react-redux';
import { IncludedModule } from '../../utils/actions';

const mapStateToProps = (state: State): StateProps => {
  return {
    blacklistedModuleIds: state.blacklistedModuleIds,
    moduleData: state.calculatedFullModuleData
      ? state.calculatedFullModuleData.moduleData
      : null,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onIncludeModule: IncludedModule(dispatch),
  };
};

export default connect<Props, {||}, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps
)(BlacklistTable);
