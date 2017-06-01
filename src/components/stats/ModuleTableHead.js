/*
 * @flow
 */

import type {
  FilterableFields,
  FilterProps,
  SortProps,
} from '../../stats/filterModules';

import Button, { CloseButton } from '../Bootstrap/Button';
import Dropdown from '../Bootstrap/Dropdown';
import FilterCumulativeSizeForm from './FilterCumulativeSizeForm';
import FilterModuleNameForm from './FilterModuleNameForm';
import FilterRequiredByCountForm from './FilterRequiredByCountForm';
import FilterRequirementsCountForm from './FilterRequirementsCountForm';
import React from 'react';
import SortLabel from '../SortLabel';

const INFINITY = '\u221E';
const NBSP = '\u00A0';

type Props = {
  filters: FilterProps,
  sort: SortProps,
  onSort: (field: string) => void,
  onFilter: (changes: {[key: FilterableFields]: string}) => void,
};

function FilterDisplay(props) {
  return (
    <span>
      <kbd>
        {props.children}
      </kbd>
      {props.isFiltered ?
        <span style={{position: 'absolute', right: '-5px'}}>
          <CloseButton label="Clear" onClick={props.onClick} />
        </span>
        : null}
    </span>
  );
}

export default function ModuleTableHead(props: Props) {
  return (
    <thead>
      <tr>
        <th></th>
        <th>
          <Button color="link" display="block" onClick={() => props.onSort('name')}>
            <SortLabel
              field="name"
              fieldType='alpha'
              sort={props.sort}>
              Module Name
            </SortLabel>
          </Button>
        </th>
        <th>
          <Button color="link" display="block" onClick={() => props.onSort('cumulativeSize')}>
            <SortLabel
              field="cumulativeSize"
              fieldType='size'
              sort={props.sort}>
              Weighted
            </SortLabel>
          </Button>
        </th>
        <th>
          <Button color="link" display="block" onClick={() => props.onSort('size')}>
            <SortLabel
              field="size"
              fieldType='size'
              sort={props.sort}>
              Size
            </SortLabel>
          </Button>
        </th>
        <th>
          <Button color="link" display="block" onClick={() => props.onSort('requiredByCount')}>
            <SortLabel
              field="requiredByCount"
              fieldType='size'
              sort={props.sort}>
              Dependants
            </SortLabel>
          </Button>
        </th>
        <th>
          <Button color="link" display="block" onClick={() => props.onSort('requirementsCount')}>
            <SortLabel
              field="requirementsCount"
              fieldType='size'
              sort={props.sort}>
              Imports
            </SortLabel>
          </Button>
        </th>
        <th></th>
      </tr>
      <tr>
        <th></th>
        <th>
          <Dropdown
            color="link"
            getContent={() => (
              <FilterModuleNameForm
                filters={props.filters}
                onChange={(e) => props.onFilter({moduleName: e.target.value})}
              />
            )}>
            <FilterDisplay
              onClick={() => props.onFilter({moduleName: ''})}
              isFiltered={!!props.filters.moduleName}>
              {'new RegExp('}
              {props.filters.moduleName
                ? props.filters.moduleName
                : '.*'}
              {')'}
            </FilterDisplay>
          </Dropdown>
        </th>
        <th>
          <Dropdown
            color="link"
            getContent={() => (
              <FilterCumulativeSizeForm
                filters={props.filters}
                onChangeMin={(e) => props.onFilter({cumulativeSizeMin: e.target.value})}
                onChangeMax={(e) => props.onFilter({cumulativeSizeMax: e.target.value})}
              />
            )}>
            <FilterDisplay
              onClick={() => {
                props.onFilter({
                  cumulativeSizeMin: '',
                  cumulativeSizeMax: '',
                });
              }}
              isFiltered={!!(props.filters.cumulativeSizeMin || props.filters.cumulativeSizeMax)}>
              {props.filters.cumulativeSizeMin || 0}
              {NBSP + '<' + NBSP}
              {props.filters.cumulativeSizeMax || INFINITY}
            </FilterDisplay>
          </Dropdown>
        </th>
        <th></th>
        <th>
          <Dropdown
            color="link"
            getContent={() => (
              <FilterRequiredByCountForm
                filters={props.filters}
                onChangeMin={(e) => props.onFilter({requiredByCountMin: e.target.value})}
                onChangeMax={(e) => props.onFilter({requiredByCountMax: e.target.value})}
              />
            )}>
            <FilterDisplay
              onClick={() => {
                props.onFilter({
                  requiredByCountMin: '',
                  requiredByCountMax: '',
                });
              }}
              isFiltered={!!(props.filters.requiredByCountMin || props.filters.requiredByCountMax)}>
              {props.filters.requiredByCountMin || 0}
              {NBSP + '<' + NBSP}
              {props.filters.requiredByCountMax || INFINITY}
            </FilterDisplay>
          </Dropdown>
        </th>
        <th>
          <Dropdown
            color="link"
            getContent={() => (
              <FilterRequirementsCountForm
                filters={props.filters}
                onChangeMin={(e) => props.onFilter({requirementsCountMin: e.target.value})}
                onChangeMax={(e) => props.onFilter({requirementsCountMax: e.target.value})}
              />
            )}>
            <FilterDisplay
              onClick={() => {
                props.onFilter({
                  requirementsCountMin: '',
                  requirementsCountMax: '',
                });
              }}
              isFiltered={!!(props.filters.requirementsCountMin || props.filters.requirementsCountMax)}>
              {props.filters.requirementsCountMin || 0}
              {NBSP + '<' + NBSP}
              {props.filters.requirementsCountMax || INFINITY}
            </FilterDisplay>
          </Dropdown>
        </th>
        <th></th>
      </tr>
    </thead>
  );
}
