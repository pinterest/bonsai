/*
 * @flow
 */

import type { Dispatch, State } from '../../reducer';
import type { DispatchProps, StateProps } from './ModuleTable';
import type {
  ExtendedModule,
} from '../../types/Stats';

import ModuleTable from './ModuleTable';
import {connect} from 'react-redux'
import {
  FilteredTable,
  RemovedModule,
  SortedTable,
} from '../../actions';

export type OwnProps = {
  extendedModules: Array<ExtendedModule>,
};

const mapStateToProps = (state: State): StateProps => {
  return {
    filters: state.filters,
    sort: state.sort,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onFilterChanged: FilteredTable(dispatch),
    onRemoveModule: RemovedModule(dispatch),
    onSortPicked: SortedTable(dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModuleTable);
