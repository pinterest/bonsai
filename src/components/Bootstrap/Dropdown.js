/*
 * @flow
 */

import type {Color} from './Color';
import type {GlyphiconName} from './GlyphiconNames';

import Button, {DropdownToggleButton} from './Button';
import {getClassName} from './GlyphiconNames';
import * as React from 'react';

type Alignment = 'left' | 'right';

type Size =
  | 'lg'
  | 'sm'
  | 'xs'
  | 'block';

type Props = {
  align?: Alignment,
  color?: Color,
  size?: Size,
  disabled?: boolean,
  scrollable?: boolean,
  style?: Object,

  children?: React.Node,

  getContent: (
    hideContent: () => void,
  ) => React.Node,
  defaultIsOpen?: boolean,

  split?: {
    primaryOnClick: (e: MouseEvent) => void,
    label: React.Node,
    glyphicon?: GlyphiconName,
  },
};

type State = {
  isOpen: boolean,
};

function sizeToClass(size: ?Size) {
  if (!size) {
    return null;
  }
  return `btn-${size}`;
}

export default class Dropdown extends React.Component<Props, State> {
  state: State;
  _dropDownMenu: ?Node = null;
  _flyout: ?Node = null;

  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: props.defaultIsOpen || false,
    };
  }

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
        className={[
          'btn-group',
          isOpenClass,
          sizeToClass(this.props.size),
        ].filter(_ => _).join(' ')}
        ref={(div) => this._dropDownMenu = div }
        style={this.props.style}>
        {this.props.split
          ? <Button
            color={this.props.color}
            size={this.props.size}
            onClick={this.props.disabled
              ? null
              : this.props.split.primaryOnClick}>
            {this.props.children}
          </Button>
          : null}
        <DropdownToggleButton
          color={this.props.color}
          size={this.props.size}
          isOpen={this.state.isOpen}
          onClick={this.props.disabled
            ? null
            : this.onClickToggle}>
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
    ].filter(_ => _).join(' ');

    const clientHeight = document &&
      document.documentElement &&
      document.documentElement.clientHeight;
    const style = (this.props.scrollable && clientHeight)
      ? {maxHeight: clientHeight, overflow: 'scroll'}
      : null;

    const content = this.props.getContent(this.onHide);
    if (Array.isArray(content)) {
      return (
        <ul
          className={classNames}
          style={style}
          ref={(ul) => this._flyout = ul }>
          {content}
        </ul>
      );
    } else {
      return (
        <div
          className={classNames}
          style={style}
          ref={(div) => this._flyout = div }>
          {content}
        </div>
      );
    }
  }

  onHide = () => {
    this.setState({isOpen: false});
  };

  onClickToggle = () => {
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
