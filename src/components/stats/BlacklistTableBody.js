/*
 * @flow
 */

import type {ExtendedModule} from '../../types/Stats';

import Button from '../Bootstrap/Button';
import ExternalModuleLink from './ExternalModuleLink';
import OffsetPageAnchor from '../OffsetPageAnchor';
import React, { Component } from 'react';
import Unit from '../Unit';
import Octicon, { TriangleRight, TriangleDown } from '@github/octicons-react';

type Props = {
  removedModules: Array<ExtendedModule>,
};

type State = {
  isOpen: boolean
};

export default class BlacklistTableBody extends Component<Props, State> {
  state: State = {
    isOpen: false,
  };

  render() {
    if (this.state.isOpen) {
      return (
        <tbody>
          {this.renderHideRow()}
          {this.props.removedModules.map((eModule, i) =>
            <tr key={`blacklist-${i}`} {...OffsetPageAnchor(String(eModule.id))}>
              <td className="vert-align">
                <ExternalModuleLink
                  prefix={process.env.REACT_APP_EXTERNAL_URL_PREFIX}
                  module={eModule}
                />
              </td>
              <td className="vert-align">
                {eModule.name}
              </td>
              <Unit
                elem='td'
                className="vert-align numeric"
                bytes={eModule.size} />
              <td colSpan="3"></td>
            </tr>
          )}
          {this.renderHideRow()}
        </tbody>
      );
    } else if (this.props.removedModules.length > 0) {
      return (
        <tbody>
          <tr>
            <td colSpan="6">
              <Button
                size="xs"
                onClick={() => this.setState({ isOpen: true })}>
                <Octicon icon={TriangleRight} />
                &nbsp;Show {this.props.removedModules.length} more removed modules
              </Button>
            </td>
          </tr>
        </tbody>
      );
    } else {
      return null;
    }
  }

  renderHideRow() {
    return (
      <tr>
        <td colSpan="6">
          <Button
            size="xs"
            onClick={() => this.setState({ isOpen: false })}>
            <Octicon icon={TriangleDown} />
            &nbsp;Hide extra modules
          </Button>
        </td>
      </tr>
    );
  }
}
