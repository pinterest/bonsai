/*
 * @flow
 */

import type {
  FilterableFields,
  FilterProps,
  SortProps,
} from '../../stats/filterModules';
import type {
  ExtendedModule,
  ModuleID,
} from '../../types/Stats';

import debounce from '../../debounce';
import ModuleTableBody from './ModuleTableBody';
import ModuleTableHead from './ModuleTableHead';
import React, { Component } from 'react';

type Props = {
  extendedModules: Array<ExtendedModule>,
  onRemoveModule: (moduleID: ModuleID) => void,
};

type State = {
  filtersValues: FilterProps,
  filtersApplied: FilterProps,
  sort: SortProps,
};

export default class ModuleTable extends Component<void, Props, State> {
  state = {
    filtersValues: {
      moduleName: '',
      cumulativeSizeMin: '',
      cumulativeSizeMax: '',
      requiredByCountMin: '',
      requiredByCountMax: '',
    },
    filtersApplied: {
      moduleName: '',
      cumulativeSizeMin: '',
      cumulativeSizeMax: '',
      requiredByCountMin: '',
      requiredByCountMax: '',
    },
    sort: {
      field: 'cumulativeSize',
      direction: 'DESC',
    },
  };

  render() {
    return (
      <table className="table table-hover" cellPadding="0" cellSpacing="0">
        <ModuleTableHead
          filters={this.state.filtersValues}
          sort={this.state.sort}
          onSort={this.onSortPicked}
          onFilter={this.onFilterChanged}
        />
        <ModuleTableBody
          extendedModules={this.props.extendedModules}
          onRemoveModule={this.props.onRemoveModule}
          filters={this.state.filtersApplied}
          sort={this.state.sort}
        />
      </table>
    );
  }

  onSortPicked = (field: string) => {
    const isSameField = this.state.sort.field === field;
    const invertedDir = this.state.sort.direction === 'ASC' ? 'DESC': 'ASC';
    const nextDirection = isSameField ? invertedDir : 'DESC';

    this.setState({
      sort: {
        field: field,
        direction: nextDirection,
      },
    });
  };

  onFilterChanged = (field: FilterableFields, value: string) => {
    this.setState({
      filtersValues: {
        ...this.state.filtersValues,
        [field]: value,
      },
    });
    this.applyFilters();
  };

  applyFilters = debounce(() => {
    this.setState({
      filtersApplied: this.state.filtersValues,
    });
  }, 100);
}
