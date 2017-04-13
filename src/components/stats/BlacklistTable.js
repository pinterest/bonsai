/*
 * @flow
 */

import type {ModuleID, ExtendedModule} from '../../types/Stats';

import BlacklistTableBody from './BlacklistTableBody';
import React from 'react';
import Unit from '../Unit';

type Props = {
  blacklistedModulesIds: Array<ModuleID>,
  removedModules: Array<ExtendedModule>,
  onIncludeModule: (moduleID: ModuleID) => void,
};

export default function ChunkGraph(props: Props) {
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
          <th></th>
        </tr>
      </thead>
      <tbody>
        {blacklistedModulesList.map((modules, i) =>
          modules.map((module, ii) => (
            <tr key={`blacklist-${i}-${ii}`}>
              <td>{module.name}</td>
              <td><Unit bytes={module.size} /></td>
              <td>
                <a href="#" onClick={() => props.onIncludeModule(module.id)}>
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
          <td></td>
        </tr>
        <tr>
          <th>Total Size</th>
          <td><Unit bytes={sum} /></td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
}
