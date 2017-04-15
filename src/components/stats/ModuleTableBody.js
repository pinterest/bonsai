/*
 * @flow
 */

import type {ModuleID, ExtendedModule} from '../../types/Stats';

import OffsetPageAnchor from '../OffsetPageAnchor';
import React from 'react';
import Unit from '../Unit';
import {
  RequiredByPanel,
  RequirementsPanel,
} from './ModulePanels';

import formatModuleName from './formatModuleName';

type TBodyProps = {
  extendedModules: Array<ExtendedModule>,
  onRemoveModule: (moduleID: ModuleID) => void,
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

export default function ModuleTableBody(props: TBodyProps) {
  return (
    <tbody>
      {props.extendedModules.map((eModule: ExtendedModule) =>
        <ModuleTableRow
          eModule={eModule}
          key={eModule.identifier}
          onRemoveModule={props.onRemoveModule}
        />
      )}
    </tbody>
  );
}
