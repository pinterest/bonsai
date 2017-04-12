/*
 * @flow
 */

import type {ModuleID, ExtendedModule} from '../../types/Stats';

import ShowablePanel from '../ShowablePanel';
import React from 'react';
import Unit from '../Unit';

type TBodyProps = {
  extendedModules: Array<ExtendedModule>,
  onRemoveModule: (moduleID: ModuleID) => void,
};

type TRProps = {
  eModule: ExtendedModule,
  onRemoveModule: (moduleID: ModuleID) => void,
}

function formatModuleName(name: string) {
  const names = name.indexOf('multi ') === 0
    ? name.split(' ')
    : [name];

  return names.map((name, i) => {
    const bits = name.split('!');
    const niceName = bits.pop();
    bits.push('');
    return [
      <span key={'a' + i} style={{color: '#aaa'}}> {bits.join('!')}</span>,
      <span key={'b' + i}>{niceName}</span>,
    ];
  }).reduce(joinWithBR, []);
}

function joinWithBR(nodes, label, index) {
  return nodes.concat(label, <br key={index} />);
}

function moduleChunks(eModule: ExtendedModule): ?React$Element<any> {
  if (!eModule.chunks.length) {
    return null;
  }
  return (
    <div>
      {eModule.chunks.map((chunkId) => (
        <span key={chunkId}>
          {chunkId}
        </span>
      )).reduce(joinWithBR, [])}
    </div>
  );
}

function moduleDependencies(eModule: ExtendedModule): ?React$Element<any> {
  if (!eModule.requiredBy.length) {
    return null;
  }
  return (
    <div>
      {eModule.requiredBy.map((reason) => (
        <a href={'#' + reason.moduleId} key={reason.moduleId}>
          {formatModuleName(reason.moduleIdentifier)}
        </a>
      ))}
    </div>
  );
}

function moduleImports(eModule: ExtendedModule): ?React$Element<any> {
  if (!eModule.requirements.length) {
    return null;
  }
  return (
    <div>
      {eModule.requirements.map((module) => (
        <a href={'#' + module.id} key={module.identifier}>
          {formatModuleName(module.identifier)}
        </a>
      ))}
    </div>
  );
}

function ModuleTableRow(props: TRProps) {
  const {eModule} = props;
  return (
    <tr id={eModule.id}>
      <td>{formatModuleName(eModule.name)}</td>
      <td className="number">
        <Unit bytes={eModule.cumulativeSize} />
      </td>
      <td className="number">
        <Unit bytes={eModule.size} />
      </td>
      <td className="number">
        <ShowablePanel
          trigger='click'
          onRight={true}
          panel={moduleDependencies(eModule)}>
          <span>{eModule.requiredBy.length}</span>
        </ShowablePanel>
      </td>
      <td className="number">
        <ShowablePanel
          trigger='click'
          onRight={true}
          panel={moduleImports(eModule)}>
          <span>{eModule.requirements.length}</span>
        </ShowablePanel>
      </td>
      <td className="number">
        <ShowablePanel
          trigger='click'
          onRight={true}
          panel={moduleChunks(eModule)}>
          <span>{eModule.chunks.length}</span>
        </ShowablePanel>
      </td>
      <td>
        <a href="#" onClick={() => props.onRemoveModule(eModule.id)}>
          Remove
        </a>
      </td>
    </tr>
  );
}

export default function ModuleTableBody(props: TBodyProps) {
  return (
    <tbody>
      {props.extendedModules.map((eModule: ExtendedModule) =>
        <ModuleTableRow
          eModule={eModule}
          key={eModule.identifier}
          onRemoveModule={props.onRemoveModule}
        />
      )}
    </tbody>
  );
}
