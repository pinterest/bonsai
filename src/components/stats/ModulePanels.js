/*
 * @flow
 */

import formatModuleName from './formatModuleName';
import React from 'react';
import ShowablePanel from '../ShowablePanel';

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

export function RequiredByPanel({eModule}: {eModule: ExtendedModule}) {
  return (
    <ShowablePanel
      trigger='click'
      onRight={true}
      panel={moduleDependencies(eModule)}>
      <span>{eModule.requiredBy.length}</span>
    </ShowablePanel>
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

export function RequirementsPanel ({eModule}: {eModule: ExtendedModule}) {
  return (
    <ShowablePanel
      trigger='click'
      onRight={true}
      panel={moduleImports(eModule)}>
      <span>{eModule.requirements.length}</span>
    </ShowablePanel>
  );
}
