/*
 * @flow
 */

import type {ModuleID, ExtendedModule} from '../../types/Stats';
import type {FilterProps, SortProps} from '../../stats/filterModules';

import filterModules from '../../stats/filterModules';
import OffsetPageAnchor from '../OffsetPageAnchor';
import React, {PureComponent} from 'react';
import Unit from '../Unit';
import {
  RequiredByPanel,
  RequirementsPanel,
} from './ModulePanels';

import formatModuleName from './formatModuleName';

type TBodyProps = {
  extendedModules: Array<ExtendedModule>,
  onRemoveModule: (moduleID: ModuleID) => void,
  filters: FilterProps,
  sort: SortProps,
};

type TRProps = {
  eModule: ExtendedModule,
  onRemoveModule: (moduleID: ModuleID) => void,
}

function ModuleTableRow(props: TRProps) {
  const {eModule} = props;
  return (
    <tr key={eModule.id}>
      <td>
        <OffsetPageAnchor anchor={String(eModule.id)} />
        {formatModuleName(eModule.name)}
      </td>
      <td>
        <Unit bytes={eModule.cumulativeSize} />
      </td>
      <td>
        <Unit bytes={eModule.size} />
      </td>
      <td>
        <RequiredByPanel eModule={eModule} />
      </td>
      <td>
        <RequirementsPanel eModule={eModule} />
      </td>
      <td>
        <a href="#" onClick={() => props.onRemoveModule(eModule.id)}>
          Ignore
        </a>
      </td>
    </tr>
  );
}

export default class ModuleTableBody extends PureComponent<void, TBodyProps, void> {
  render() {
    const extendedModules = filterModules(
      this.props.extendedModules,
      this.props.filters,
      this.props.sort,
    );
    return (
      <tbody>
        {extendedModules.map((eModule: ExtendedModule) =>
          <ModuleTableRow
            eModule={eModule}
            key={eModule.identifier}
            onRemoveModule={this.props.onRemoveModule}
          />
        )}
      </tbody>
    );
  }
}
