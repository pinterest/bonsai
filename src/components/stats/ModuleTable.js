/*
 * @flow
 */

import type {Reason, Module, ExtendedModule} from '../../types/Stats';

import ClickToShow from '../ClickToShow';
import React from 'react';

type Props = {
  extendedModulesById: {[key: number]: ExtendedModule},
};

function moduleLabel(module: Module | ExtendedModule): React$Element<any> {
  return (
    <span key={module.identifier}>
      {module.identifier} ({module.id})
    </span>
  );
}

function reasonLabel(reason: Reason): React$Element<any> {
  return (
    <span key={reason.moduleId}>
      {reason.moduleIdentifier} ({reason.moduleId})
    </span>
  );
}

function moduleReasons(eModule: ExtendedModule): React$Element<any> {
  return (
    <div>
      {eModule.reasons.map(reasonLabel).reduce(
        (nodes, label) => nodes.concat(label, <br/>),
        [],
      )}
    </div>
  );
}

function moduleImports(eModule: ExtendedModule): React$Element<any> {
  return (
    <div>
      {eModule.requirements.map(moduleLabel).reduce(
        (nodes, label) => nodes.concat(label, <br />),
        [],
      )}
    </div>
  );
}

export default function ModuleList(props: Props) {
  // $FlowFixMe: Flow things that this is incompatible with mixed :(
  const extendedModules: Array<ExtendedModule> = Object.values(props.extendedModulesById);

  return (
    <table cellPadding="0" cellSpacing="0">
      <thead>
        <tr>
          <th>Chunks</th>
          <th>Module Identifier</th>
          <th>Module Name</th>
          <th>Size</th>
          <th>Reasons</th>
          <th>Imports</th>
        </tr>
      </thead>
      <tbody>
        {extendedModules.map((eModule: ExtendedModule) =>
          <tr key={eModule.identifier}>
            <td>{eModule.chunks.join(', ')}</td>
            <td>{moduleLabel(eModule)}</td>
            <td>{eModule.name}</td>
            <td>{eModule.size}</td>
            <td>
              <ClickToShow onRight={true} extra={moduleReasons(eModule)}>
                {eModule.reasons.length}
              </ClickToShow>
            </td>
            <td>
              <ClickToShow onRight={true} extra={moduleImports(eModule)}>
                {eModule.requirements.length}
              </ClickToShow>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
