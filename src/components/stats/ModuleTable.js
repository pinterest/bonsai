/*
 * @flow
 */

import type {FilterProps, SortProps} from '../../stats/filterModules';
import type {ModuleID, ExtendedModule} from '../../types/Stats';

import Button from '../Bootstrap/Button';
import debounce from '../../debounce';
import Dropdown from '../Bootstrap/Dropdown';
import FilterCumulativeSizeForm from './FilterCumulativeSizeForm';
import FilterModuleNameForm from './FilterModuleNameForm';
import FilterRequiredByCountForm from './FilterRequiredByCountForm';
import ModuleTableBody from './ModuleTableBody';
import React, { Component } from 'react';
import SortLabel from '../SortLabel';

const INFINITY = '\u221E';

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

  filterNodes: {
    moduleName?: HTMLInputElement,
    cumulativeSizeMin?: HTMLInputElement,
    cumulativeSizeMax?: HTMLInputElement,
    requiredByCountMin?: HTMLInputElement,
    requiredByCountMax?: HTMLInputElement,
  } = {};

  render() {
    const filters = this.state.filtersValues;

    return (
      <table className="table table-hover" cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th>
              <Dropdown
                color="link"
                split={{
                  primaryOnClick: this.makeOnSortClick(
                    'name',
                    this.state.sort,
                  ),
                  label: 'Filter by Name',
                  glyphicon: 'filter',
                }}
                getContent={() => (
                  <FilterModuleNameForm
                    filters={this.state.filtersValues}
                    onChange={this.makeOnFilter('moduleName')}
                  />
                )}
                style={{display: 'flex'}}>
                <SortLabel
                  field="name"
                  fieldType='alpha'
                  sort={this.state.sort}>
                  Module Name
                </SortLabel>
              </Dropdown>
            </th>
            <th>
              <Dropdown
                color="link"
                split={{
                  primaryOnClick: this.makeOnSortClick(
                    'cumulativeSize',
                    this.state.sort,
                  ),
                  label: 'Filter by Size',
                  glyphicon: 'filter',
                }}
                getContent={() => (
                  <FilterCumulativeSizeForm
                    filters={this.state.filtersValues}
                    onChangeMin={this.makeOnFilter('cumulativeSizeMin')}
                    onChangeMax={this.makeOnFilter('cumulativeSizeMax')}
                  />
                )}
                style={{display: 'flex'}}>
                <SortLabel
                  field="cumulativeSize"
                  fieldType='size'
                  sort={this.state.sort}>
                  Weighted
                </SortLabel>
              </Dropdown>
            </th>
            <th>
              <Button color="link" onClick={this.makeOnSortClick('size', this.state.sort)}>
                <SortLabel
                  field="size"
                  fieldType='size'
                  sort={this.state.sort}>
                  Size
                </SortLabel>
              </Button>
            </th>
            <th>
              <Dropdown
                color="link"
                split={{
                  primaryOnClick: this.makeOnSortClick(
                    'requiredByCount',
                    this.state.sort,
                  ),
                  label: 'Filter by Dependants',
                  glyphicon: 'filter',
                }}
                getContent={() => (
                  <FilterRequiredByCountForm
                    filters={this.state.filtersValues}
                    onChangeMin={this.makeOnFilter('requiredByCountMin')}
                    onChangeMax={this.makeOnFilter('requiredByCountMax')}
                  />
                )}
                style={{display: 'flex'}}>
                <SortLabel
                  field="requiredByCount"
                  fieldType='size'
                  sort={this.state.sort}>
                  Dependants
                </SortLabel>
              </Dropdown>
            </th>
            <th>
              <Button color="link" onClick={() => undefined} disabled={true}>
                Imports
              </Button>
            </th>
            <th></th>
          </tr>
          <tr>
            <td>
              <kbd>
              {'new RegExp('}
              {filters.moduleName
                ? filters.moduleName
                : '.*'}
              {')'}
              </kbd>
            </td>
            <td>
              <kbd>
                {filters.cumulativeSizeMin || 0}
                {' < '}
                {filters.cumulativeSizeMax || INFINITY}
                {' bytes'}
              </kbd>
            </td>
            <td></td>
            <td>
              <kbd>
                {filters.requiredByCountMin || 0}
                {' < '}
                {filters.requiredByCountMax || INFINITY}
                {' modules'}
              </kbd>
            </td>
            <td colSpan="2"></td>
          </tr>
        </thead>
        <ModuleTableBody
          extendedModules={this.props.extendedModules}
          onRemoveModule={this.props.onRemoveModule}
          filters={this.state.filtersApplied}
          sort={this.state.sort}
        />
      </table>
    );
  }

  makeOnSortClick(field: string, sort: SortProps) {
    return (e: MouseEvent) => {
      e.preventDefault();

      const isSameField = sort.field === field;
      const invertedDir = sort.direction === 'ASC' ? 'DESC': 'ASC';
      const nextDirection = isSameField ? invertedDir : 'DESC';

      this.setState({
        sort: {
          field: field,
          direction: nextDirection,
        },
      });
    };
  }

  applyFilters = debounce(() => {
    this.setState({
      filtersApplied: this.state.filtersValues,
    });
  }, 100);

  makeOnFilter(field: string) {
    return (event: SyntheticInputEvent) => {
      this.setState({
        filtersValues: {
          ...this.state.filtersValues,
          [field]: event.target.value,
        },
      });
      this.applyFilters();
    };
  }

}
