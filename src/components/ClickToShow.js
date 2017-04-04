/*
 * @flow
 */

import React, { Component } from 'react';

import './css/ClickToShow.css';

type Props = {
  children?: React$Element<any>,
  extra: React$Element<any>,
  onRight: boolean,
};
type State = {
  show: boolean,
};

export default class ClickToShow extends Component<void, Props, State> {
  state: State = {
    show: false,
  };

  render() {
    const panelClass = this.props.onRight
      ? 'ClickToShow-Panel ClickToShow-Panel--right'
      : 'ClickToShow-Panel ClickToShow-Panel--left';

    return (
      <a href="#" onClick={this.onClick} className="ClickToShow">
        {this.props.children}
        {this.state.show ?
          <div className={panelClass}>
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
