/*
 * @flow
 */

import type {ModuleID, ExtendedModule} from '../../types/Stats';

import BlacklistTableBody from './BlacklistTableBody';
import Button from '../Bootstrap/Button';
import ExternalModuleLink from './ExternalModuleLink';
import OffsetPageAnchor from '../OffsetPageAnchor';
import * as React from 'react';
import Unit from '../Unit';
import {
  RequiredByPanelContainer,
  RequirementsPanelContainer,
} from './ModulePanelContainers';

type Props = {
  blacklistedModulesIds: Array<ModuleID>,
  removedModules: Array<ExtendedModule>,
  onIncludeModule: (moduleID: ModuleID) => void,
};

export default function BlasklistTable(props: Props) {
  const blacklistedModulesList = props.blacklistedModulesIds.map(
    (id) => props.removedModules.filter((module) => String(module.id) === String(id)),
  );
  const removedModules = props.removedModules.filter(
    (module) => !props.blacklistedModulesIds.includes(String(module.id)),
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
        {blacklistedModulesList.map((modules) =>
          modules.map((eModule) => (
            <tr key={eModule.id} {...OffsetPageAnchor(String(eModule.id))}>
              <td className="vert-align">
                <ExternalModuleLink
                  prefix={process.env.REACT_APP_EXTERNAL_URL_PREFIX}
                  module={eModule}
                />
              </td>
              <td className="vert-align">
                {eModule.name}
              </td>
              <td className="vert-align">
                <Unit bytes={eModule.size} />
              </td>
              <td className="vert-align">
                <RequiredByPanelContainer eModule={eModule} />
              </td>
              <td className="vert-align">
                <RequirementsPanelContainer eModule={eModule} />
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
