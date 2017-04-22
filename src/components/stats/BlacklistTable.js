/*
 * @flow
 */

import type {ModuleID, ExtendedModule} from '../../types/Stats';

import BlacklistTableBody from './BlacklistTableBody';
import Button from '../Bootstrap/Button';
import ExternalModuleLink from './ExternalModuleLink';
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
          <th></th>
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
              <td className="vert-align">
                <ExternalModuleLink
                  prefix={process.env.REACT_APP_FILE_URL_PREFIX}
                  module={eModule}
                />
              </td>
              <td className="vert-align">
                <OffsetPageAnchor anchor={String(eModule.id)} />
                {eModule.name}
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
                <Button
                  color="danger"
                  onClick={() => props.onIncludeModule(eModule.id)}>
                  Restore
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
      <BlacklistTableBody removedModules={removedModules} />
      <tfoot>
        <tr>
          <th></th>
          <th>Removed Modules</th>
          <td>{props.removedModules.length}</td>
          <td colSpan="3"></td>
        </tr>
        <tr>
          <th></th>
          <th>Total Size</th>
          <td><Unit bytes={sum} /></td>
          <td colSpan="3"></td>
        </tr>
      </tfoot>
    </table>
  );
}
