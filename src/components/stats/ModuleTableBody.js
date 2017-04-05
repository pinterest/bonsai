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

function formatModuleName(name: string) {
  const names = name.indexOf('multi ') === 0
    ? name.split(' ')
    : [name];

  return (
    <span>
      {names.map((name, i) => {
        const bits = name.split('!');
        const niceName = bits.pop();
        bits.push('');
        return [
          <span key={'a' + i} style={{color: '#aaa'}}> {bits.join('!')}</span>,
          <span key={'b' + i}>{niceName}</span>,
        ];
      })}
    </span>
  );
}

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
      {formatModuleName(module.identifier)} ({module.id})
    </span>
  );
}

function reasonLabel(reason: Reason): React$Element<any> {
  return (
    <span key={reason.moduleId}>
      {formatModuleName(reason.moduleIdentifier)} ({reason.moduleId})
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

function moduleDependencies(eModule: ExtendedModule): ?React$Element<any> {
  if (!eModule.requiredBy.length) {
    return null;
  }
  return (
    <div>
      {eModule.requiredBy.map(reasonLabel).reduce(joinWithBR, [])}
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

function ModuleTableRow(props: {eModule: ExtendedModule}) {
  const {eModule} = props;
  return (
    <tr>
      <td>
        <ShowablePanel
          trigger='click'
          panel={moduleChunks(eModule)}>
          <span>{eModule.chunks.length}</span>
        </ShowablePanel>
      </td>
      <td>{formatModuleName(eModule.name)} ({eModule.id})</td>
      <td>
        <Unit bytes={eModule.cumulativeSize} />
      </td>
      <td>
        <Unit bytes={eModule.size} />
      </td>
      <td>
        <ShowablePanel
          trigger='click'
          onRight={true}
          panel={moduleDependencies(eModule)}>
          <span>{eModule.requiredBy.length}</span>
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
  );
}

export default function ModuleTableBody(props: Props) {
  return (
    <tbody>
      {props.extendedModules.map((eModule: ExtendedModule) =>
        <ModuleTableRow key={eModule.identifier} eModule={eModule} />
      )}
    </tbody>
  );
}
