/*
 * @flow
 */

import type { Dispatch, State } from '../../reducer';
import type { DispatchProps, StateProps } from './ModuleTable';

import ModuleTable from './ModuleTable';
import {connect} from 'react-redux'
import {
  SortedTable,
  FilteredTable,
} from '../../actions';

const mapStateToProps = (state: State): StateProps => {
  return {
    filters: state.filters,
    sort: state.sort,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onSortPicked: SortedTable(dispatch),
    onFilterChanged: FilteredTable(dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModuleTable);
