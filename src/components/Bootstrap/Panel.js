/*
 * @flow
 */

import * as React from 'react';

type PanelType = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger';

type Props = {
  heading?: React.Node,
  children: React.Node,
  type?: PanelType,
};

function panelTypeToClass(
  color?: PanelType,
  fallback: PanelType = 'default',
): string {
  return `panel panel-${color || fallback}`;
}

function wrapChildren(children: React.Node): any{
  return React.Children.map(children, (child) => {
    if (
      typeof child === 'object' &&
      typeof child.props === 'object'
    ) {
      const className = child.props
        ? String(child.props.className)
        : '';
      if (
        className.includes('panel-body') ||
        className.includes('table') ||
        className.includes('list-group')
      ) {
        return child;
      }
    }

    return (
      <div className="panel-body">
        {child}
      </div>
    );
  });
}

export default function Row(props: Props) {
  const heading = props.heading
    ? <div className="panel-heading">
      {props.heading}
    </div>
    : null;

  return (
    <div
      className={panelTypeToClass(props.type)}>
      {heading}
      {wrapChildren(props.children)}
    </div>
  );
}
