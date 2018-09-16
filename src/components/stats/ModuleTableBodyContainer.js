/*
 * @flow
 */

import type { Dispatch, State } from '../../utils/reducer';
import type { DispatchProps, StateProps } from './ModuleTableBody';
import type { ExtendedModule } from '../../types/Stats';
import type { FilterProps } from '../../stats/filterModules';
import type { RowRepresentation } from '../../types/Stats';
import type { SortProps } from '../../stats/sortModules';

import { connect } from 'react-redux';
import ModuleTableBody from './ModuleTableBody';
import {
  RemovedModule,
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
  return {
    rows: getRows(
      (state.calculatedFullModuleData || {}).extendedModules,
      state.filters,
      state.sort,
    ),
    expandMode: state.expandMode,
    expandedRecords: state.expandedRecords,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onRemoveModule: RemovedModule(dispatch),
    onExpandRecords: ExpandRecords(dispatch),
    onCollapseRecords: CollapseRecords(dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModuleTableBody);
