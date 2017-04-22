/*
 * @flow
 */

import type {
  FilterableFields,
  FilterProps,
  SortProps,
} from '../../stats/filterModules';

import Button from '../Bootstrap/Button';
import Dropdown from '../Bootstrap/Dropdown';
import FilterCumulativeSizeForm from './FilterCumulativeSizeForm';
import FilterModuleNameForm from './FilterModuleNameForm';
import FilterRequiredByCountForm from './FilterRequiredByCountForm';
import React from 'react';
import SortLabel from '../SortLabel';

const INFINITY = '\u221E';

type Props = {
  filters: FilterProps,
  sort: SortProps,
  onSort: (field: string) => void,
  onFilter: (field: FilterableFields, value: string) => void,
};

export default function ModuleTableHead(props: Props) {
  return (
    <thead>
      <tr>
        <th>
          <Dropdown
            color="link"
            split={{
              primaryOnClick: () => props.onSort('name'),
              label: 'Filter by Name',
              glyphicon: 'filter',
            }}
            getContent={() => (
              <FilterModuleNameForm
                filters={props.filters}
                onChange={(e) => props.onFilter('moduleName', e.target.value)}
              />
            )}
            style={{display: 'flex'}}>
            <SortLabel
              field="name"
              fieldType='alpha'
              sort={props.sort}>
              Module Name
            </SortLabel>
          </Dropdown>
        </th>
        <th>
          <Dropdown
            color="link"
            split={{
              primaryOnClick: () => props.onSort('cumulativeSize'),
              label: 'Filter by Size',
              glyphicon: 'filter',
            }}
            getContent={() => (
              <FilterCumulativeSizeForm
                filters={props.filters}
                onChangeMin={(e) => props.onFilter('cumulativeSizeMin', e.target.value)}
                onChangeMax={(e) => props.onFilter('cumulativeSizeMax', e.target.value)}
              />
            )}
            style={{display: 'flex'}}>
            <SortLabel
              field="cumulativeSize"
              fieldType='size'
              sort={props.sort}>
              Weighted
            </SortLabel>
          </Dropdown>
        </th>
        <th>
          <Button color="link" onClick={() => props.onSort('size')}>
            <SortLabel
              field="size"
              fieldType='size'
              sort={props.sort}>
              Size
            </SortLabel>
          </Button>
        </th>
        <th>
          <Dropdown
            color="link"
            split={{
              primaryOnClick: () => props.onSort('requiredByCount'),
              label: 'Filter by Dependants',
              glyphicon: 'filter',
            }}
            getContent={() => (
              <FilterRequiredByCountForm
                filters={props.filters}
                onChangeMin={(e) => props.onFilter('requiredByCountMin', e.target.value)}
                onChangeMax={(e) => props.onFilter('requiredByCountMax', e.target.value)}
              />
            )}
            style={{display: 'flex'}}>
            <SortLabel
              field="requiredByCount"
              fieldType='size'
              sort={props.sort}>
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
          {props.filters.moduleName
            ? props.filters.moduleName
            : '.*'}
          {')'}
          </kbd>
        </td>
        <td>
          <kbd>
            {props.filters.cumulativeSizeMin || 0}
            {' < '}
            {props.filters.cumulativeSizeMax || INFINITY}
            {' bytes'}
          </kbd>
        </td>
        <td></td>
        <td>
          <kbd>
            {props.filters.requiredByCountMin || 0}
            {' < '}
            {props.filters.requiredByCountMax || INFINITY}
            {' modules'}
          </kbd>
        </td>
        <td colSpan="2"></td>
      </tr>
    </thead>
  );
}
