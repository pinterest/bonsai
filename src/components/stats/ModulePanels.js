/*
 * @flow
 */

import DropdownMenu from '../DropdownMenu';
import formatModuleName from './formatModuleName';
import React from 'react';

export function RequiredByPanel({eModule}: {eModule: ExtendedModule}) {
  return (
    <DropdownMenu
      align="right"
      selectedItem={{
        id: 0,
        name: eModule.requiredBy.length,
      }}
      children={eModule.requiredBy.map((reason) => ({
        id: module.id,
        name: formatModuleName(reason.moduleIdentifier),
        target: `#${reason.moduleId}`,
      }))}
    />
  );
}

export function RequirementsPanel({eModule}: {eModule: ExtendedModule}) {
  return (
    <DropdownMenu
      align="right"
      selectedItem={{
        id: 0,
        name: eModule.requirements.length,
      }}
      children={eModule.requirements.map((module) => ({
        id: module.id,
        name: formatModuleName(module.identifier),
        target: `#${module.id}`,
      }))}
    />
  );
}
