/*
 * @flow
 */

import type { Dispatch, State } from '../../utils/reducer';
import type { DispatchProps, StateProps } from './ModuleTable';

import ModuleTable from './ModuleTable';
import {connect} from 'react-redux';
import {
  FilteredTable,
  RemovedModule,
  SortedTable,
  ExpandRecords,
  CollapseRecords,
} from '../../utils/actions';

const mapStateToProps = (state: State): StateProps => {
  return {
    filters: state.filters,
    sort: state.sort,
    expandMode: state.expandMode,
    expandedRecords: state.expandedRecords,
    focusedRowID: state.currentlyFocusedElementID,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onFilterChanged: FilteredTable(dispatch),
    onRemoveModule: RemovedModule(dispatch),
    onSortPicked: SortedTable(dispatch),
    onExpandRecords: ExpandRecords(dispatch),
    onCollapseRecords: CollapseRecords(dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModuleTable);
