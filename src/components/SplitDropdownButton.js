/*
 * @flow
 */

import type {Color} from './Bootstrap';

import {colorToClass} from './Bootstrap';
import React, { Component } from 'react';

type ID = number | string;
export type Item = {
  id: ID,
  name: string | React$Element<any> | Array<React$Element<any>>,
  target?: string,
};

type Alignment = 'left' | 'right';

type Props = {
  children?: React$Element<any>,
  splitLabel: string,
  splitIcon?: string,
  content: React$Element<any>,
  onClick?: (e: SyntheticEvent) => void,
  align?: Alignment,
  color?: Color,
  style?: Object,
};

type State = {
  isOpen: boolean,
};

export default class SplitDropdownButton extends Component<void, Props, State> {
  state: State = {
    isOpen: false,
  };

  _dropDownMenu: ?Node = null;
  _flyout: ?Node = null;

  componentDidMount() {
    document.addEventListener('click', this.onDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick);
  }

  render() {
    const isOpenClass = this.state.isOpen ? 'open': '';

    return (
      <div
        className={['btn-group', isOpenClass].join(' ')}
        ref={(div) => this._dropDownMenu = div }
        style={this.props.style}>
        <button
          type="button"
          className={['btn', colorToClass('btn', this.props.color)].join(' ')}
          onClick={this.props.onClick}>
          {this.props.children}
        </button>
        <button
          type="button"
          className={['btn', 'dropdown-toggle', colorToClass('btn', this.props.color)].join(' ')}
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded={this.state.isOpen}
          onClick={this.onToggleOpen}>
          <span className={this.props.splitIcon || 'caret'} aria-hidden="true"></span>
          <span className="sr-only">{this.props.splitLabel}</span>
        </button>
        {this.state.isOpen
          ? this.renderContent()
          : null}
      </div>
    );
  }

  renderContent() {
    const alignmentClass = this.props.align === 'right'
      ? 'dropdown-menu-right'
      : '';

    return (
      <div
        className={['dropdown-menu', alignmentClass].join(' ')}
        ref={(div) => this._flyout = div }>
        {this.props.content}
      </div>
    );
  }

  onToggleOpen = (event: MouseEvent) => {
    this.setState({isOpen: !this.state.isOpen});
  };

  onDocumentClick = (event: MouseEvent) => {
    if (event.target instanceof HTMLElement) {
      if (this._dropDownMenu && this._dropDownMenu.contains(event.target)) {
        // Ignore clicks coming from inside this component
        return;
      }
      if (this.state.isOpen) {
        this.setState({isOpen: false});
      }
    }
  };
}
