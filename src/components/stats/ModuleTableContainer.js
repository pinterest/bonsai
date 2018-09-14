/*
 * @flow
 */

import type { Dispatch, State } from '../../utils/reducer';
import type { DispatchProps, StateProps } from './ModuleTable';
import type { RowRepresentation } from '../../types/Stats';

import type { FilterProps } from '../../stats/filterModules';
import type { SortProps } from '../../stats/sortModules';
import type { ExtendedModule } from '../../types/Stats';

import ModuleTable from './ModuleTable';
import {connect} from 'react-redux';
import {
  FilteredTable,
  RemovedModule,
  SortedTable,
  ExpandRecords,
  CollapseRecords,
} from '../../utils/actions';

import collapseModulesToRows from '../../stats/collapseModulesToRows';
import filterModules from '../../stats/filterModules';
import sortModules from '../../stats/sortModules';

function getRows(
  extendedModules: Array<ExtendedModule>,
  filters: FilterProps,
  sort: SortProps,
): Array<RowRepresentation> {
  const rows = collapseModulesToRows(
    sortModules(
      filterModules(
        extendedModules,
        filters,
      ),
      sort,
    ),
  );
  rows.forEach((row) => {
    row.records = sortModules(row.records, sort);
  });
  return rows;
}

const mapStateToProps = (state: State): StateProps => {
  const props = {
    extendedModules: (state.calculatedFullModuleData || {}).extendedModules,
    filters: state.filters,
    sort: state.sort,
    expandMode: state.expandMode,
    expandedRecords: state.expandedRecords,
    focusedRowID: state.currentlyFocusedElementID,
  };
  return {
    rows: getRows(
      props.extendedModules,
      props.filters,
      props.sort,
    ),
    ...props
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
