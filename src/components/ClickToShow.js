/*
 * @flow
 */

import React, { Component } from 'react';

import './css/ClickToShow.css';

type Props = {
  children?: React$Element<any>,
  extra: React$Element<any>,
};
type State = {
  show: boolean,
};

export default class ClickToShow extends Component<void, Props, State> {
  state: State = {
    show: false,
  };

  render() {
    return (
      <a href="#" onClick={this.onClick} className="ClickToShow">
        {this.props.children}
        {this.state.show ?
          <div className="ClickToShow-Panel">
            {this.props.extra}
          </div>
          : null
        }
      </a>
    );
  }

  onClick = (event: SyntheticEvent) => {
    event.preventDefault();
    this.setState({show: !this.state.show});
  };
}
