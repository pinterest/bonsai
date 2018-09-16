/*
 * @flow
 */

import * as React from 'react';

type PanelType = 'default' | 'light' | 'dark' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger';

type Props = {
  heading?: React.Node,
  children: React.Node,
  type?: PanelType,
  className?: string,
};

function panelTypeToClass(
  color?: PanelType,
  fallback: PanelType = 'light',
): string {
  return `card border border-${color || fallback}`;
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
      <div className="card-body">
        {child}
      </div>
    );
  });
}

export default function Row(props: Props) {
  const heading = props.heading
    ? <div className={`card-header text-white bg-${props.type || 'light'}`}>
      {props.heading}
    </div>
    : null;

  return (
    <div
      className={`${panelTypeToClass(props.type)} ${props.className || ''}`}>
      {heading}
      {wrapChildren(props.children)}
    </div>
  );
}
