/*
 * @flow
 */

import React, { Component } from 'react';

type ID = number;
export type Item = {
  id: ID,
  name: string | React$Element<any> | Array<React$Element<any>>,
  target?: string,
};

type Alignment = 'left' | 'right';

type Props = {
  selectedItem: Item,
  children: Array<Item>,
  onClick: ?(id: ID) => void,
  align: ?Alignment,
};

type State = {
  isOpen: boolean,
};

export default class DropdownMenu extends Component<void, Props, State> {
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
    const isOpenClass = this.state.isOpen
      ? 'open'
      : '';

    return (
      <div
        className={['btn-group', isOpenClass].join(' ')}
        ref={(div) => this._dropDownMenu = div }>
        <button
          type="button"
          className="btn btn-default dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded={this.state.isOpen}
          onClick={this.onButtonClick}>
          {this.props.selectedItem.name}{' '}<span className="caret"></span>
        </button>
        {this.state.isOpen
          ? this.renderChildrenAsOptions()
          : null}
      </div>
    );
  }

  renderChildrenAsOptions() {
    const alignmentClass = this.props.align === 'right'
      ? 'dropdown-menu-right'
      : '';

    return (
      <ul
        className={['dropdown-menu', alignmentClass].join(' ')}
        ref={(ul) => this._flyout = ul }>
        {this.props.children.map((child) => (
          <li key={child.id}>
            <a
              href={child.target || '#'}
              onClick={this.makeOnItemClick(child.id)}>
              {child.name}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  onButtonClick = (event: MouseEvent) => {
    if (this.state.isOpen) {
      this.setState({isOpen: false});
    } else {
      this.setState({isOpen: true});
    }
  };

  onDocumentClick = (event: MouseEvent) => {
    if (this._dropDownMenu && this._dropDownMenu.contains(event.target)) {
      // Ignore clicks coming from inside this component
      return;
    }
    if (this.state.isOpen) {
      this.setState({isOpen: false});
    }
  };

  makeOnItemClick(id: ID) {
    return (event: SyntheticEvent) => {
      this.setState({
        isOpen: false,
      });
      if (this.props.onClick) {
        event.preventDefault();
        this.props.onClick(id);
      }
    };
  }
}
