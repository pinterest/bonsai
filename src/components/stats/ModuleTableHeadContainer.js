/*
 * @flow
 */

import type { Dispatch, State } from '../../utils/reducer';
import type { DispatchProps, StateProps } from './ModuleTableHead';

import { connect } from 'react-redux';
import ModuleTableHead from './ModuleTableHead';
import {
  FilteredTable,
  SortedTable,
} from '../../utils/actions';

const mapStateToProps = (state: State): StateProps => {
  return {
    filters: state.filters,
    sort: state.sort,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onFilter: FilteredTable(dispatch),
    onSort: SortedTable(dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModuleTableHead);
