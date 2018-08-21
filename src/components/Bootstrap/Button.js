/*
 * @flow
 */

import type {Color} from './Color';

import * as React from 'react';
import {colorToClass} from './Color';

type Size =
  | 'lg'
  | 'sm'
  | 'xs'
  | 'block';

type Display = 'block' | 'inline';

type ButtonProps = {
  children?: React.Node,
  color?: Color,
  size?: Size,
  onClick: ?(e: MouseEvent) => void,
  display?: Display,
  style?: Object,
};

function sizeToClass(size: ?Size) {
  if (!size) {
    return null;
  }
  return `btn-${size}`;
}

function displayToClass(display: ?Display) {
  if (!display || display === 'inline') {
    return null;
  }
  return `btn-${display}`;
}

export default function Button(props: ButtonProps) {
  const classNames = [
    'btn',
    colorToClass('btn', props.color, 'default'),
    displayToClass(props.display),
    sizeToClass(props.size),
  ].join(' ');

  return (
    <button
      type="button"
      className={classNames}
      disabled={props.onClick ? null : 'disabed'}
      onClick={props.onClick}
      style={props.style ? props.style : null}>
      {props.children}
    </button>
  );
}

type LinkProps = {
  children?: React.Node,
  color?: Color,
  href: ?string,
  newtab?: boolean,
  size?: Size,
};

export function Link(props: LinkProps) {
  const classNames = [
    'btn',
    colorToClass('btn', props.color, 'link'),
    sizeToClass(props.size),
  ].join(' ');

  return (
    <a
      className={classNames}
      href={props.href || '#'}
      disabled={props.href ? null : 'disabled'}
      target={props.newtab ? '_blank' : null}
      role="button">
      {props.children}
    </a>
  );
}

type DropdownToggleProps = ButtonProps & {
  isOpen: boolean,
  size?: Size,
};

export function DropdownToggleButton(props: DropdownToggleProps) {
  const classNames = [
    'btn',
    colorToClass('btn', props.color, 'default'),
    sizeToClass(props.size),
    'dropdown-toggle',
  ].join(' ');

  return (
    <button
      aria-expanded={props.isOpen}
      aria-haspopup="true"
      className={classNames}
      data-toggle="dropdown"
      disabled={props.onClick ? null : 'disabed'}
      onClick={props.onClick}
      type="button">
      {props.children}
    </button>
  );
}

type CloseProps = {
  label?: string,
  onClick: ?(e: MouseEvent) => void,
};

export function CloseButton(props: CloseProps) {
  return (
    <button
      aria-label={props.label || 'Close'}
      className="close"
      disabled={props.onClick ? null : 'disabed'}
      onClick={props.onClick}
      type="button">
      <span aria-hidden="true">&times;</span>
    </button>
  );
}
