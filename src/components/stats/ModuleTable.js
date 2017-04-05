/*
 * @flow
 */

import type {Reason, Module, ExtendedModule} from '../../types/Stats';

import ClickToShow from '../ClickToShow';
import React from 'react';
import Unit from '../Unit';

type Props = {
  extendedModulesById: {[key: number]: ExtendedModule},
};

function joinWithBR(nodes, label, index) {
  return nodes.concat(label, <br key={index} />);
}

function chunkLabel(chunkId: number): React$Element<any> {
  return (
    <span key={chunkId}>
      {chunkId}
    </span>
  );
}

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

function moduleChunks(eModule: ExtendedModule): ?React$Element<any> {
  if (!eModule.chunks.length) {
    return null;
  }
  return (
    <div>
      {eModule.chunks.map(chunkLabel).reduce(joinWithBR, [])}
    </div>
  );
}

function moduleReasons(eModule: ExtendedModule): ?React$Element<any> {
  if (!eModule.reasons.length) {
    return null;
  }
  return (
    <div>
      {eModule.reasons.map(reasonLabel).reduce(joinWithBR, [])}
    </div>
  );
}

function moduleImports(eModule: ExtendedModule): ?React$Element<any> {
  if (!eModule.requirements.length) {
    return null;
  }
  return (
    <div>
      {eModule.requirements.map(moduleLabel).reduce(joinWithBR, [])}
    </div>
  );
}

export default function ModuleList(props: Props) {
  // $FlowFixMe: Flow thinks the return of `values()` is `Array<mixed>`
  const extendedModules: Array<ExtendedModule> = Object.values(props.extendedModulesById);

  return (
    <table cellPadding="0" cellSpacing="0">
      <thead>
        <tr>
          <th>Chunks</th>
          <th>Module Name</th>
          <th>Cumulative Size</th>
          <th>Size</th>
          <th>Reasons</th>
          <th>Imports</th>
        </tr>
      </thead>
      <tbody>
        {extendedModules.map((eModule: ExtendedModule) =>
          <tr key={eModule.identifier}>
            <td>
              <ClickToShow extra={moduleChunks(eModule)}>
                <span>{eModule.chunks.length}</span>
              </ClickToShow>
            </td>
            <td>{eModule.name}</td>
            <td><Unit bytes={eModule.cumulativeSize} /></td>
            <td><Unit bytes={eModule.size} /></td>
            <td>
              <ClickToShow onRight={true} extra={moduleReasons(eModule)}>
                <span>{eModule.reasons.length}</span>
              </ClickToShow>
            </td>
            <td>
              <ClickToShow onRight={true} extra={moduleImports(eModule)}>
                <span>{eModule.requirements.length}</span>
              </ClickToShow>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
