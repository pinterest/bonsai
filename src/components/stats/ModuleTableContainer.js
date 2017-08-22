/*
 * @flow
 */

import type { Dispatch, State } from '../../reducer';
import type { DispatchProps, StateProps, Props } from './ModuleTable';
import type {
  ExtendedModule,
} from '../../types/Stats';

import collapseModulesToRows from '../../stats/collapseModulesToRows';
import filterModules from '../../stats/filterModules';
import ModuleTable from './ModuleTable';
import {connect} from 'react-redux';
import {
  FilteredTable,
  RemovedModule,
  SortedTable,
  ExpandRecords,
  CollapseRecords,
} from '../../actions';

export type OwnProps = {
  extendedModules: Array<ExtendedModule>,
};

const mapStateToProps = (state: State): StateProps => {
  return {
    filters: state.filters,
    sort: state.sort,
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

const mergeProps = (
  stateProps: StateProps,
  dispatchProps: DispatchProps,
  ownProps: OwnProps,
): Props => {
  return {
    ...stateProps,
    ...dispatchProps,
    rows: collapseModulesToRows(
      filterModules(
        ownProps.extendedModules,
        stateProps.filters,
        stateProps.sort,
      )
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ModuleTable);
