/*
 * @flow
 */

import type {ExtendedModule} from '../../types/Stats';

import formatModuleName from './formatModuleName';
import React, { Component } from 'react';
import {getClassName} from '../Bootstrap/GlyphiconNames';
import Button from '../Bootstrap/Button';

type Props = {
  extendedModules: ?Array<ExtendedModule>,
};
type State = {
  expanded: boolean,
};

export default class LoopTable extends Component<void, Props, State> {
  state = {
    expanded: false,
  };

  render() {
    const props = this.props;
    if (!props.extendedModules) {
      return null;
    }

    const loopingModules = props.extendedModules.filter(
      (eModule) => eModule.loops.length
    );

    if (loopingModules.length === 0) {
      return null;
    }

    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <Button
            color="link"
            size="sm"
            onClick={() => this.setState({expanded: !this.state.expanded})}>
            <span className={getClassName(this.state.expanded
              ? 'chevron-down'
              : 'chevron-right')} />
          </Button>
          {loopingModules.length} Modules with circular dependencies
        </div>
        {this.state.expanded
          ? <ul className="list-group">
            {loopingModules.map((eModule) =>
              <li key={eModule.identifier} className="list-group-item">
                {formatModuleName(eModule.name)}
                {eModule.loops.map((loop) =>
                  <ul key={eModule.id} className="list-group">
                    {loop.map((module) => formatModuleName(module.name))}
                  </ul>
                )}
              </li>
            )}
          </ul>
          : null}
      </div>
    );
  }
}
