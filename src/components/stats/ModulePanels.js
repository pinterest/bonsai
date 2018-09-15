/*
 * @flow
 */

import type {ExtendedModule} from '../../types/Stats';

import Button from '../Bootstrap/Button';
import Dropdown from '../Bootstrap/Dropdown';
import formatModuleName from './formatModuleName';
import * as React from 'react';

export type OwnProps = {
  eModule: ExtendedModule,
};

export type DispatchProps = {
  onFocusChanged: (elementID: string) => void,
};

export type Props = OwnProps & DispatchProps;

export function RequiredByPanel(props: Props) {
  return (
    <Dropdown
      align="right"
      color="link"
      size="sm"
      scrollable={true}
      disabled={props.eModule.requiredBy.length === 0}
      getContent={(hideContent: () => void) =>
        props.eModule.requiredBy.map((reason) => (
          <li key={reason.moduleId}>
            <Button
              color="link"
              display="block"
              onClick={(e) => {
                e.preventDefault();
                hideContent();
                props.onFocusChanged(String(reason.moduleId));
              }}>
              <div className="text-left">
                {formatModuleName(reason.moduleName)}
              </div>
            </Button>
          </li>
        ))
      }>
      {props.eModule.requiredBy.length}
      {' '}
      <span className="caret"></span>
    </Dropdown>
  );
}

export function RequirementsPanel(props: Props) {
  return (
    <Dropdown
      align="right"
      color="link"
      size="sm"
      scrollable={true}
      disabled={props.eModule.requirements.length === 0}
      getContent={(hideContent: () => void) =>
        props.eModule.requirements.map((module) => (
          <li key={module.id}>
            <Button
              color="link"
              display="block"
              onClick={(e) => {
                e.preventDefault();
                hideContent();
                props.onFocusChanged(String(module.id));
              }}>
              <div className="text-left">
                {formatModuleName(module.name)}
              </div>
            </Button>
          </li>
        ))
      }>
      {props.eModule.requirements.length}
      {' '}
      <span className="caret"></span>
    </Dropdown>
  );
}
