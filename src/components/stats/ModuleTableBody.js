/*
 * @flow
 */

import type {ModuleID, ExtendedModule} from '../../types/Stats';
import type {FilterProps, SortProps} from '../../stats/filterModules';

import Button from '../Bootstrap/Button';
import ExternalModuleLink from './ExternalModuleLink';
import filterModules from '../../stats/filterModules';
import formatModuleName from './formatModuleName';
import OffsetPageAnchor from '../OffsetPageAnchor';
import React, {PureComponent} from 'react';
import Unit from '../Unit';
import {getClassName} from '../Bootstrap/GlyphiconNames';
import {
  RequiredByPanel,
  RequirementsPanel,
} from './ModulePanels';

type TBodyProps = {
  extendedModules: Array<ExtendedModule>,
  onRemoveModule: (moduleID: ModuleID) => void,
  filters: FilterProps,
  sort: SortProps,
};

type TRProps = {
  eModule: ExtendedModule,
  onRemoveModule: (moduleID: ModuleID) => void,
};

function ModuleTableRow(props: TRProps) {
  const {eModule} = props;
  return (
    <tr key={eModule.id} {...OffsetPageAnchor(String(eModule.id))}>
      <td className="vert-align">
        <ExternalModuleLink
          prefix={process.env.REACT_APP_EXTERNAL_URL_PREFIX}
          module={eModule}
        />
      </td>
      <td className="vert-align">
        {eModule.loops.length
          ? <span
              className={['pull-right', getClassName('repeat')].join(' ')}
              title="Circular Dependencies Detected"
            />
          : null}
        {formatModuleName(eModule.name)}
      </td>
      <td className="vert-align">
        <Unit bytes={eModule.cumulativeSize} />
      </td>
      <td className="vert-align">
        <Unit bytes={eModule.size} />
      </td>
      <td className="vert-align">
        <RequiredByPanel eModule={eModule} />
      </td>
      <td className="vert-align">
        <RequirementsPanel eModule={eModule} />
      </td>
      <td className="vert-align">
        <Button onClick={() => props.onRemoveModule(eModule.id)}>
          Ignore
        </Button>
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
