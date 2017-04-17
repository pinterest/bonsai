/*
 * @flow
 */

import type {ExtendedModule} from '../../types/Stats';

import Dropdown from '../Bootstrap/Dropdown';
import formatModuleName from './formatModuleName';
import React from 'react';
import scrollTo from '../../scrollTo';

export function RequiredByPanel({eModule}: {eModule: ExtendedModule}) {
  return (
    <Dropdown
      align="right"
      color="link"
      disabled={eModule.requiredBy.length === 0}
      getContent={(hideContent: () => void) =>
        eModule.requiredBy.map((reason) => (
          <li key={reason.moduleId}>
            <a href="#" onClick={(e) => {
              e.preventDefault();
              hideContent();
              scrollTo(String(reason.moduleId));
            }}>
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
      color="link"
      disabled={eModule.requirements.length === 0}
      getContent={(hideContent: () => void) =>
        eModule.requirements.map((module) => (
          <li key={module.id}>
            <a href="#" onClick={(e) => {
              e.preventDefault();
              hideContent();
              scrollTo(String(module.id));
            }}>
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
