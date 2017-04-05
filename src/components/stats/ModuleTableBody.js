/*
 * @flow
 */

import type {Reason, Module, ExtendedModule} from '../../types/Stats';

import ShowablePanel from '../ShowablePanel';
import React from 'react';
import Unit from '../Unit';

type Props = {
  extendedModules: Array<ExtendedModule>,
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

export default function ModuleTableBody(props: Props) {
  return (
    <tbody>
      {props.extendedModules.map((eModule: ExtendedModule) =>
        <tr key={eModule.identifier}>
          <td>
            <ShowablePanel
              trigger='click'
              panel={moduleChunks(eModule)}>
              <span>{eModule.chunks.length}</span>
            </ShowablePanel>
          </td>
          <td>{eModule.name}</td>
          <td><Unit bytes={eModule.cumulativeSize} /></td>
          <td><Unit bytes={eModule.size} /></td>
          <td>
            <ShowablePanel
              trigger='click'
              onRight={true}
              panel={moduleReasons(eModule)}>
              <span>{eModule.reasons.length}</span>
            </ShowablePanel>
          </td>
          <td>
            <ShowablePanel
              trigger='click'
              onRight={true}
              panel={moduleImports(eModule)}>
              <span>{eModule.requirements.length}</span>
            </ShowablePanel>
          </td>
        </tr>
      )}
    </tbody>
  );
}
