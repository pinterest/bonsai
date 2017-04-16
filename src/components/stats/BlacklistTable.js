/*
 * @flow
 */

import type {ModuleID, ExtendedModule} from '../../types/Stats';

import BlacklistTableBody from './BlacklistTableBody';
import OffsetPageAnchor from '../OffsetPageAnchor';
import React from 'react';
import Unit from '../Unit';
import {
  RequiredByPanel,
  RequirementsPanel,
} from './ModulePanels';

type Props = {
  blacklistedModulesIds: Array<ModuleID>,
  removedModules: Array<ExtendedModule>,
  onIncludeModule: (moduleID: ModuleID) => void,
};

export default function BlasklistTable(props: Props) {
  const blacklistedModulesList = props.blacklistedModulesIds.map(
    (id) => props.removedModules.filter((module) => module.id === id),
  );
  const removedModules = props.removedModules.filter(
    (module) => !props.blacklistedModulesIds.includes(module.id),
  );

  const sum = props.removedModules.reduce(
    (sum, module) => sum + module.size,
    0,
  );

  return (
    <table className="table table-hover" cellPadding="0" cellSpacing="0">
      <thead>
        <tr>
          <th>Name</th>
          <th>Size</th>
          <th>Dependants</th>
          <th>Imports</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {blacklistedModulesList.map((modules, i) =>
          modules.map((eModule, ii) => (
            <tr key={eModule.id}>
              <td>
                <OffsetPageAnchor anchor={String(eModule.id)} />
                {eModule.name}
              </td>
              <td><Unit bytes={eModule.size} /></td>
              <td>
                <RequiredByPanel eModule={eModule} />
              </td>
              <td>
                <RequirementsPanel eModule={eModule} />
              </td>
              <td>
                <a href="#" onClick={() => props.onIncludeModule(eModule.id)}>
                  Restore
                </a>
              </td>
            </tr>
          ))
        )}
      </tbody>
      <BlacklistTableBody removedModules={removedModules} />
      <tfoot>
        <tr>
          <th>Removed Modules</th>
          <td>{props.removedModules.length}</td>
          <td colSpan="3"></td>
        </tr>
        <tr>
          <th>Total Size</th>
          <td><Unit bytes={sum} /></td>
          <td colSpan="3"></td>
        </tr>
      </tfoot>
    </table>
  );
}
