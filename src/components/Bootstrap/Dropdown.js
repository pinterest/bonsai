/*
 * @flow
 */

import type {Color} from './Color';
import type {GlyphiconName} from './GlyphiconNames';

import Button, {DropdownToggleButton} from './Button';
import {getClassName} from './GlyphiconNames';
import React, { Component } from 'react';

type Alignment = 'left' | 'right';

type Props = {
  align?: Alignment,
  color?: Color,
  disabled?: boolean,
  style?: Object,

  children?: string | React$Element<any>,

  getContent: (
    hideContent: () => void,
  ) => React$Element<any> | Array<React$Element<any>>,

  split?: {
    primaryOnClick: (e: MouseEvent) => void,
    label: string | React$Element<any>,
    glyphicon?: GlyphiconName,
  },
};

type State = {
  isOpen: boolean,
};

export default class Dropdown extends Component<void, Props, State> {
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
        {this.props.split
          ? <Button
              color={this.props.color}
              disabled={this.props.disabled}
              onClick={this.props.split.primaryOnClick}>
              {this.props.children}
            </Button>
          : null}
        <DropdownToggleButton
          color={this.props.color}
          disabled={this.props.disabled}
          isOpen={this.state.isOpen}
          onClick={this.onClickToggle}>
          {this.renderToggleLabel()}
        </DropdownToggleButton>
        {this.state.isOpen
          ? this.renderContent()
          : null}
      </div>
    );
  }

  renderToggleLabel() {
    if (this.props.split) {
      const split = this.props.split;
      return [
        <span key="icon" className={getClassName(split.glyphicon)} aria-hidden="true"></span>,
        <span key="label" className="sr-only">{split.label}</span>,
      ];
    } else {
      return this.props.children;
    }
  }

  renderContent() {
    const classNames = [
      'dropdown-menu',
      this.props.align === 'right' ? 'dropdown-menu-right' : '',
    ].join(' ');

    const content = this.props.getContent(this.onHide);
    if (Array.isArray(content)) {
      return (
        <ul
          className={classNames}
          ref={(ul) => this._flyout = ul }>
          {content}
        </ul>
      );
    } else {
      return (
        <div
          className={classNames}
          ref={(div) => this._flyout = div }>
          {content}
        </div>
      );
    }
  }

  onHide = () => {
    this.setState({isOpen: false});
  };

  onClickToggle = (event: MouseEvent) => {
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
