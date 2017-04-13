/*
 * @flow
 */

import type {ExtendedModule} from '../../types/Stats';

import React, { Component } from 'react';
import Unit from '../Unit';

type Props = {
  removedModules: Array<ExtendedModule>,
};

type State = {
  isOpen: boolean
};

export default class BlacklistTableBody extends Component<void, Props, State> {
  state: State = {
    isOpen: false,
  };

  render() {
    if (this.state.isOpen) {
      return (
        <tbody>
          {this.renderHideRow()}
          {this.props.removedModules.map((module, i) =>
            <tr key={`blacklist-${i}`}>
              <td>{module.name}</td>
              <td><Unit bytes={module.size} /></td>
              <td></td>
            </tr>
          )}
          {this.renderHideRow()}
        </tbody>
      );
    } else {
      return (
        <tbody>
          <tr>
            <td colSpan="3">
              <button
                type="button"
                className="btn btn-default btn-xs"
                onClick={() => this.setState({ isOpen: true })}>
                <span className="glyphicon glyphicon-triangle-right" aria-hidden="true"></span>
                Show {this.props.removedModules.length} more removed modules
              </button>
            </td>
          </tr>
        </tbody>
      );
    }
  }

  renderHideRow() {
    return (
      <tr>
        <td colSpan="3">
          <button
            type="button"
            className="btn btn-default btn-xs"
            onClick={() => this.setState({ isOpen: false })}>
            <span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
            Hide extra modules
          </button>
        </td>
      </tr>
    );
  }
}
