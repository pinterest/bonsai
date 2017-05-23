/*
 * @flow
 */

import type {ExtendedModule} from '../../types/Stats';

import Button from '../Bootstrap/Button';
import Dropdown from '../Bootstrap/Dropdown';
import formatModuleName from './formatModuleName';
import React from 'react';
import scrollToAndFocus from '../../scrollToAndFocus';

export function RequiredByPanel({eModule}: {eModule: ExtendedModule}) {
  return (
    <Dropdown
      align="right"
      color="link"
      disabled={eModule.requiredBy.length === 0}
      getContent={(hideContent: () => void) =>
        eModule.requiredBy.map((reason) => (
          <li key={reason.moduleId}>
            <Button
              color="link"
              display="block"
              onClick={(e) => {
              e.preventDefault();
              hideContent();
              scrollToAndFocus(String(reason.moduleId));
            }}>
              <div className="text-left">
                {formatModuleName(reason.moduleIdentifier)}
              </div>
            </Button>
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
            <Button
              color="link"
              display="block"
              onClick={(e) => {
              e.preventDefault();
              hideContent();
              scrollToAndFocus(String(module.id));
            }}>
              <div className="text-left">
                {formatModuleName(module.identifier)}
              </div>
            </Button>
          </li>
        ))
      }>
      {eModule.requirements.length}
      {' '}
      <span className="caret"></span>
    </Dropdown>
  );
}
