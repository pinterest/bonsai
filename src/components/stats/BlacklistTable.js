/*
 * @flow
 */

import type {ModuleID, ExtendedModule} from '../../types/Stats';

import BlacklistTableBody from './BlacklistTableBody';
import Button from '../Bootstrap/Button';
import Panel from '../Bootstrap/Panel';
import ExternalModuleLink from './ExternalModuleLink';
import OffsetPageAnchor from '../OffsetPageAnchor';
import * as React from 'react';
import Unit from '../Unit';
import {
  RequiredByPanelContainer,
  RequirementsPanelContainer,
} from './ModulePanelContainers';

export type StateProps = {
  blacklistedModuleIds: Array<ModuleID>,
  moduleData: ?{
    included: Array<ExtendedModule>,
    removed: Array<ExtendedModule>,
  },
};

export type DispatchProps = {
  onIncludeModule: (moduleID: ModuleID) => void,
};

export type Props = StateProps & DispatchProps;

export default function BlasklistTable(props: Props) {
  if (!props.moduleData || props.moduleData.removed.length === 0) {
    return null;
  }

  const removed = props.moduleData.removed;

  const blacklistedModulesList = props.blacklistedModuleIds.map(
    (id) => removed.filter((module) => String(module.id) === String(id)),
  );
  const removedModules = removed.filter(
    (module) => !props.blacklistedModuleIds.includes(String(module.id)),
  );

  const sum = removed.reduce(
    (sum, module) => sum + module.size,
    0,
  );

  return (
    <Panel
      type='danger'
      heading={`${removed.length} Modules Ignored`}>
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
            <td>{removed.length}</td>
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
    </Panel>
  );
}
