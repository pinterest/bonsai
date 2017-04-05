/*
 * @flow
 */

import type {Reason, Chunk, Module, ExtendedModule} from '../../types/Stats';

import ClickToShow from '../ClickToShow';
import React from 'react';

type Props = {
  extendedModulesById: {[key: number]: ExtendedModule},
};

function joinWithBR(nodes, label, index) {
  return nodes.concat(label, <br key={index} />);
}

function chunkLabel(chunk: Chunk): React$Element<any> {
  return (
    <span key={chunk.id}>
      {chunk.identifier} ({chunk.id})
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

function moduleChunks(eModule: ExtendedModule): React$Element<any> {
  return (
    <div>
      {eModule.chunks.map(chunkLabel).reduce(joinWithBR, [])}
    </div>
  );
}

function moduleReasons(eModule: ExtendedModule): React$Element<any> {
  return (
    <div>
      {eModule.reasons.map(reasonLabel).reduce(joinWithBR, [])}
    </div>
  );
}

function moduleImports(eModule: ExtendedModule): React$Element<any> {
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
              <ClickToShow extra={eModule.chunks.join(', ')}>
                {eModule.chunks.length}
              </ClickToShow>
            </td>
            <td>{eModule.name}</td>
            <td>{eModule.cumulativeSize.toFixed(0)}</td>
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
