/*
 * @flow
 */

import React, { Component } from 'react';

type ID = number;
export type Item = {
  id: ID,
  name: string | React$Element<any> | Array<React$Element<any>>,
};

type Props = {
  selectedItem: Item,
  children: Array<Item>,
  onClick: (id: ID) => void,
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
    return (
      <div
        className={['btn-group', this.state.isOpen ? 'open' : ''].join(' ')}
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
    return (
      <ul
        className="dropdown-menu"
        ref={(ul) => this._flyout = ul }>
        {this.props.children.map((child) => (
          <li key={child.id}>
            <a
              href="#"
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
      event.preventDefault();
      this.setState({
        isOpen: false,
      });
      this.props.onClick(id);
    };
  }
}
