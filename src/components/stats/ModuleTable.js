/*
 * @flow
 */

import type {Reason, ExtendedModule} from '../../types/Stats';

import ClickToShow from '../ClickToShow';
import React from 'react';

type Props = {
  extendedModulesById: {[key: number]: ExtendedModule},
};

function moduleLabel(module: ExtendedModule): React$Element<any> {
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

function moduleReasons(module: ExtendedModule): React$Element<any> {
  return (
    <div>
      {module.reasons.map(reasonLabel).reduce(
        (nodes, label) => nodes.concat(label, <br/>), []
      )}
    </div>
  );
}

function moduleImports(module: ExtendedModule): React$Element<any> {
  return (
    <div>
      {module.imports.map(moduleLabel).reduce(
        (nodes, label) => nodes.concat(label, <br />), []
      )}
    </div>
  );
}

export default function ModuleList(props: Props) {
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
        {Object.values(props.extendedModulesById).map((module: ExtendedModule) =>
          <tr key={module.identifier}>
            <td>{module.chunks.join(', ')}</td>
            <td>{moduleLabel(module)}</td>
            <td>{module.name}</td>
            <td>{module.size}</td>
            <td>
              <ClickToShow onRight={true} extra={moduleReasons(module)}>
                {module.reasons.length}
              </ClickToShow>
            </td>
            <td>
              <ClickToShow onRight={true} extra={moduleImports(module)}>
                {module.imports.length}
              </ClickToShow>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
