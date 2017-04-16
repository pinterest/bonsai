/*
 * @flow
 */

import type {ExtendedModule} from '../../types/Stats';

import Dropdown from '../Bootstrap/Dropdown';
import formatModuleName from './formatModuleName';
import React from 'react';

export function RequiredByPanel({eModule}: {eModule: ExtendedModule}) {
  return (
    <Dropdown
      align="right"
      getContent={(hideContent: () => void) =>
        eModule.requiredBy.map((reason) => (
          <li key={reason.moduleId}>
            <a href={`#${reason.moduleId}`} onClick={hideContent}>
              {formatModuleName(reason.moduleIdentifier)}
            </a>
          </li>
        ))
      }>
      {eModule.requiredBy.length}
      {' '}
      <span className="caret"></span>
    </Dropdown>
  );
}

export function RequirementsPanel({eModule}: {eModule: ExtendedModule}) {
  return (
    <Dropdown
      align="right"
      getContent={(hideContent: () => void) =>
        eModule.requirements.map((module) => (
          <li key={module.id}>
            <a href={`#${module.id}`} onClick={hideContent}>
              {formatModuleName(module.identifier)}
            </a>
          </li>
        ))
      }>
      {eModule.requirements.length}
      {' '}
      <span className="caret"></span>
    </Dropdown>
  );
}
