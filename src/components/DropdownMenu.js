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

  render() {
    return (
      <div className={['btn-group', this.state.isOpen ? 'open' : ''].join(' ')}>
        <button
          type="button"
          className="btn btn-default dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded={this.state.isOpen}
          onClick={() => this.setState({ isOpen: !this.state.isOpen })}>
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
      <ul className="dropdown-menu">
        {this.props.children.map((child) => (
          <li key={child.id}>
            <a
              href="#"
              onClick={this.makeOnClick(child.id)}>
              {child.name}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  makeOnClick(id: ID) {
    return (event: SyntheticEvent) => {
      event.preventDefault();
      this.setState({
        isOpen: false,
      });
      this.props.onClick(id);
    };
  }
}
