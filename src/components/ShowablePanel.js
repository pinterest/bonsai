/*
 * @flow
 */

import React, { Component } from 'react';

import './css/ShowablePanel.css';

type Props = {
  children?: React$Element<any>,
  panel: ?React$Element<any>,
  trigger: 'click' | 'hover',
  onRight?: boolean,
};

type State = {
  show: boolean,
};

export default class ShowablePanel extends Component<void, Props, State> {
  state: State = {
    show: false,
  };

  render() {
    if (!this.props.panel) {
      return React.Children.only(this.props.children);
    }

    const panelClass = [
      'ShowablePanel-Panel',
      this.props.onRight
        ? 'ShowablePanel-Panel--right'
        : 'ShowablePanel-Panel--left',
    ].join(' ');

    const childrenWrapper = this.props.trigger === 'click'
      ? <a href="#" onClick={this.onClick}>{this.props.children}</a>
      : <span>{this.props.children}</span>;

    return (
      <div
        className="ShowablePanel"
        onMouseLeave={this.onMouseOut}
        onMouseEnter={this.onMouseOver}>
        {childrenWrapper}
        {this.state.show
          ? <div className={panelClass}>{this.props.panel}</div>
          : null}
      </div>
    );
  }

  onMouseOver = (event: SyntheticEvent) => {
    if (this.props.trigger === 'hover') {
      this.setState({show: true});
    }
  };

  onMouseOut = (event: SyntheticEvent) => {
    if (this.props.trigger === 'hover') {
      this.setState({show: false});
    }
  };

  onClick = (event: SyntheticEvent) => {
    event.preventDefault();
    if (this.props.trigger === 'click') {
      this.setState({show: !this.state.show});
    }
  };
}
