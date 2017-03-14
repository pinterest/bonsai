/*
 * @flow
 */

import type {Module, Reason} from '../types/Stats';

import ClickToShow from './ClickToShow';
import React from 'react';

export type ExtendedModule = Module & {
  children: Array<string>,
};

type Props = {
  extendedModules: Array<ExtendedModule>,
};

function moduleLabel(module: ExtendedModule): string {
  return `${module.identifier} (${module.id})`;
}

function reasonLabel(reason: Reason): string {
  return `${reason.moduleIdentifier} (${reason.moduleId})`;
}

function childLabel(child: string): string {
  return child;
}

function moduleReasons(module: ExtendedModule): React$Element<any> {
  return (
    <div>
      {module.reasons.map(reasonLabel).join(', ')}
    </div>
  );
}

function moduleChildren(module: ExtendedModule): React$Element<any> {
  return (
    <div>
      ({module.children.length})&nbsp;
      {module.children.map(childLabel).join(', ')}
    </div>
  );
}

export default function ModuleList(props: Props) {
  return (
    <table cellPadding="0" cellSpacing="0">
      <thead>
        <tr>
          <th>Chunks</th>
          <th>Module Identifier</th>
          <th>Module Name</th>
          <th>Size</th>
          <th>Reasons</th>
          <th>Children</th>
        </tr>
      </thead>
      <tbody>
        {props.extendedModules.map((module: ExtendedModule) =>
          <tr key={module.identifier}>
            <td>{module.chunks.join(', ')}</td>
            <td>{moduleLabel(module)}</td>
            <td>{module.name}</td>
            <td>{module.size}</td>
            <td>
              <ClickToShow
                extra={moduleReasons(module)}
              >
                {module.reasons.length}
              </ClickToShow>
            </td>
            <td>
              {moduleChildren(module)}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
