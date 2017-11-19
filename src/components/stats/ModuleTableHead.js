/*
 * @flow
 */

import type {
  FilterableFields,
  FilterProps,
} from '../../stats/filterModules';

import type { SortProps, SortableFields } from '../../stats/sortModules';

import Button from '../Bootstrap/Button';
import Dropdown from '../Bootstrap/Dropdown';
import FilterCumulativeSizeForm from './FilterCumulativeSizeForm';
import FilterDisplay from './FilterDisplay';
import FilterModuleNameForm from './FilterModuleNameForm';
import FilterRequiredByCountForm from './FilterRequiredByCountForm';
import FilterRequirementsCountForm from './FilterRequirementsCountForm';
import * as React from 'react';
import SortLabel from '../SortLabel';

const INFINITY = '\u221E';
const NBSP = '\u00A0';

type Props = {
  filters: FilterProps,
  sort: SortProps,
  onSort: (field: SortableFields) => void,
  onFilter: (changes: {[key: FilterableFields]: string}) => void,
};

export default function ModuleTableHead(props: Props) {
  return (
    <thead>
      <tr>
        <th></th>
        <th>
          <Button color="link" display="block" onClick={() => props.onSort('name')}>
            <div className="text-left">
              <SortLabel
                field="name"
                fieldType='alpha'
                sort={props.sort}>
                Module Name
              </SortLabel>
            </div>
          </Button>
          <Dropdown
            color="link"
            getContent={() => (
              <FilterModuleNameForm
                filters={props.filters}
                onChange={(e) => props.onFilter({moduleName: e.target.value})}
              />
            )}>
            <FilterDisplay
              title="Click to filter by module name"
              onClear={() => props.onFilter({moduleName: ''})}
              isFiltered={!!props.filters.moduleName}>
              {'new RegExp('}
              {props.filters.moduleName
                ? props.filters.moduleName
                : '.*'}
              {')'}
            </FilterDisplay>
          </Dropdown>
        </th>
        <th className="numeric">
          <Button color="link" display="block" onClick={() => props.onSort('cumulativeSize')}>
            <div className="text-right">
              <SortLabel
                field="cumulativeSize"
                fieldType='size'
                sort={props.sort}>
                Weighted
              </SortLabel>
            </div>
          </Button>
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
              title="Click to filter by weighted score"
              onClear={() => {
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
        <th className="numeric">
          <Button color="link" display="block" onClick={() => props.onSort('size')}>
            <div className="text-right">
              <SortLabel
                field="size"
                fieldType='size'
                sort={props.sort}>
                Size
              </SortLabel>
            </div>
          </Button>
        </th>
        <th className="numeric">
          <Button color="link" display="block" onClick={() => props.onSort('requiredByCount')}>
            <div className="text-right">
              <SortLabel
                field="requiredByCount"
                fieldType='size'
                sort={props.sort}>
                Dependants
              </SortLabel>
            </div>
          </Button>
          <Dropdown
            align="right"
            color="link"
            getContent={() => (
              <FilterRequiredByCountForm
                filters={props.filters}
                onChangeMin={(e) => props.onFilter({requiredByCountMin: e.target.value})}
                onChangeMax={(e) => props.onFilter({requiredByCountMax: e.target.value})}
              />
            )}>
            <FilterDisplay
              title="Click to filter by dependants"
              onClear={() => {
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
        <th className="numeric">
          <Button color="link" display="block" onClick={() => props.onSort('requirementsCount')}>
            <div className="text-right">
              <SortLabel
                field="requirementsCount"
                fieldType='size'
                sort={props.sort}>
                Imports
              </SortLabel>
            </div>
          </Button>
          <Dropdown
            align="right"
            color="link"
            getContent={() => (
              <FilterRequirementsCountForm
                filters={props.filters}
                onChangeMin={(e) => props.onFilter({requirementsCountMin: e.target.value})}
                onChangeMax={(e) => props.onFilter({requirementsCountMax: e.target.value})}
              />
            )}>
            <FilterDisplay
              title="Click to filter by requirements"
              onClear={() => {
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
