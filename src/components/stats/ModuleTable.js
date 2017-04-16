/*
 * @flow
 */

import type {FilterProps, SortProps} from '../../stats/filterModules';
import type {ModuleID, ExtendedModule} from '../../types/Stats';

import Button from '../Bootstrap/Button';
import debounce from '../../debounce';
import Dropdown from '../Bootstrap/Dropdown';
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
                split={{
                  label: 'Filter by Name',
                  glyphicon: 'filter',
                }}
                getContent={this.renderModuleNameFilter}
                onClick={this.makeOnSortClick('name', this.state.sort)}
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
                split={{
                  label: 'Filter by Size',
                  glyphicon: 'filter',
                }}
                getContent={this.renderCumulativeSizeFilter}
                onClick={this.makeOnSortClick('cumulativeSize', this.state.sort)}
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
              <Button onClick={this.makeOnSortClick('size', this.state.sort)}>
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
                split={{
                  label: 'Filter by Dependants',
                  glyphicon: 'filter',
                }}
                getContent={this.renderRequiredByCountFilter}
                onClick={this.makeOnSortClick('requiredByCount', this.state.sort)}
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
              <button className="btn btn-default" disabled="disabled">
                Imports
              </button>
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

  renderModuleNameFilter = (hideContent: () => void) => {
    const filters = this.state.filtersValues;

    return (
      <div className="col-sm-12">
        <label className="sr-only" htmlFor="filter-moduleName-like">Matches RegExp</label>
        <div className="input-group">
          <div className="input-group-addon"><code>new Regexp(</code></div>
          <input
            className="form-control"
            id="filter-moduleName-like"
            onChange={this.makeOnFilter('moduleName')}
            placeholder=".*"
            type="text"
            value={filters.moduleName || ''}
          />
          <div className="input-group-addon"><code>)</code></div>
        </div>
      </div>
    );
  };

  renderCumulativeSizeFilter = () => {
    const filters = this.state.filtersValues;

    return (
      <div className="col-sm-12">
        <label
          className="sr-only"
          htmlFor="filter-cumulativeSize-min">
          Min (bytes)
        </label>
        <label
          className="sr-only"
          htmlFor="filter-cumulativeSize-max">
          Max (bytes)
        </label>
        <div className="input-group">
          <input
            className="form-control"
            style={{width: '100px'}}
            id="filter-cumulativeSize-min"
            onChange={this.makeOnFilter('cumulativeSizeMin')}
            placeholder="0 bytes"
            type="text"
            value={filters.cumulativeSizeMin}
          />
          <div className="input-group-addon"><code>&lt;</code></div>
          <input
            className="form-control"
            style={{width: '100px'}}
            id="filter-cumulativeSize-max"
            onChange={this.makeOnFilter('cumulativeSizeMax')}
            placeholder={`${INFINITY} bytes`}
            type="text"
            value={filters.cumulativeSizeMax}
           />
        </div>
      </div>
    );
  };

  renderRequiredByCountFilter = () => {
    const filters = this.state.filtersValues;

    return (
      <div className="col-sm-12">
        <label
          className="sr-only"
          htmlFor="filter-requiredByCount-min">
          Min (bytes)
        </label>
        <label
          className="sr-only"
          htmlFor="filter-requiredByCount-max">
          Max (bytes)
        </label>
        <div className="input-group">
          <input
            className="form-control"
            style={{width: '100px'}}
            id="filter-requiredByCount-min"
            onChange={this.makeOnFilter('requiredByCountMin')}
            placeholder="0"
            type="text"
            value={filters.requiredByCountMin}
          />
          <div className="input-group-addon"><code>&lt;</code></div>
          <input
            className="form-control"
            style={{width: '100px'}}
            id="filter-requiredByCount-max"
            onChange={this.makeOnFilter('requiredByCountMax')}
            placeholder={INFINITY}
            type="text"
            value={filters.requiredByCountMax}
           />
        </div>
      </div>
    );
  };

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
