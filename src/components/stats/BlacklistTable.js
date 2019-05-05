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

export type StateProps = {|
  blacklistedModuleIds: Array<ModuleID>,
  moduleData: ?{
    included: Array<ExtendedModule>,
    removed: Array<ExtendedModule>,
  },
|};

export type DispatchProps = {|
  onIncludeModule: (moduleID: ModuleID) => void,
|};

export type Props = {|
  ...$Exact<StateProps>,
  ...$Exact<DispatchProps>,
|};

export default function BlasklistTable(props: Props) {
  if (!props.moduleData || props.moduleData.removed.length === 0) {
    return null;
  }

  const removed = props.moduleData.removed;

  const blacklistedModuleIdStrings = props.blacklistedModuleIds.map(String);
  const blacklistedModulesList = blacklistedModuleIdStrings.map(
    (id) => removed.filter((module) => String(module.id) === id),
  );
  const removedModules = removed.filter(
    (module) => !blacklistedModuleIdStrings.includes(String(module.id)),
  );

  const sum = removed.reduce(
    (sum, module) => sum + module.size,
    0,
  );

  return (
    <Panel
      className="my-3"
      type='danger'
      heading={`${removed.length} Modules Ignored`}>
      <table className="table table-sm table-hover" cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th className="text-right">Size</th>
            <th className="text-right">Dependants</th>
            <th className="text-right">Imports</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {blacklistedModulesList.map((modules) =>
            modules.map((eModule) => (
              <tr key={eModule.id} {...OffsetPageAnchor(String(eModule.id))}>
                <td className="align-middle">
                  <ExternalModuleLink
                    prefix={process.env.REACT_APP_EXTERNAL_URL_PREFIX}
                    module={eModule}
                  />
                </td>
                <td className="align-middle">
                  {eModule.name}
                </td>
                <Unit
                  elem='td'
                  className="align-middle text-right"
                  bytes={eModule.size} />
                <td className="align-middle text-right">
                  <RequiredByPanelContainer eModule={eModule} />
                </td>
                <td className="align-middle text-right">
                  <RequirementsPanelContainer eModule={eModule} />
                </td>
                <td className="align-middle">
                  <Button
                    color="danger"
                    size="sm"
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
            <th className="text-right">Removed Modules</th>
            <td className="text-right">{removed.length}</td>
            <td colSpan="3"></td>
          </tr>
          <tr>
            <th></th>
            <th className="text-right">Total Size</th>
            <Unit
              elem='td'
              className='text-right'
              bytes={sum} />
            <td colSpan="3"></td>
          </tr>
        </tfoot>
      </table>
    </Panel>
  );
}
