/*
 * @flow
 */

import React, { Component } from 'react';

import './css/ClickToShow.css';

type Props = {
  children?: React$Element<any>,
  extra: ?React$Element<any>,
  onRight?: boolean,
};
type State = {
  show: boolean,
};

export default class ClickToShow extends Component<void, Props, State> {
  state: State = {
    show: false,
  };

  render() {
    if (!this.props.extra) {
      return React.Children.only(this.props.children);
    }

    const panelClass = [
      'ClickToShow-Panel',
      this.props.onRight
        ? 'ClickToShow-Panel--right'
        : 'ClickToShow-Panel--left',
    ].join(' ');

    return (
      <div className="ClickToShow">
        <a href="#" onClick={this.onClick}>
          {this.props.children}
        </a>
        {this.state.show
          ? <div className={panelClass}>{this.props.extra}</div>
          : null}
      </div>
    );
  }

  onClick = (event: SyntheticEvent) => {
    event.preventDefault();
    this.setState({show: !this.state.show});
  };
}
