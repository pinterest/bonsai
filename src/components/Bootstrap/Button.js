/*
 * @flow
 */

import type {Color} from './Color';

import React from 'react';
import {colorToClass} from './Color';

type Size =
  | 'lg'
  | 'sm'
  | 'xs'
  | 'block'

type ButtonProps = {
  children?: string | React$Element<any> | Array<React$Element<any>>,
  color?: Color,
  size?: Size,
  onClick: ?(e: MouseEvent) => void,
};

function sizeToClass(size: ?Size) {
  if (!size) {
    return null;
  }
  return `btn-${size}`;
}


export default function Button(props: ButtonProps) {
  const classNames = [
    'btn',
    colorToClass('btn', props.color, 'default'),
    sizeToClass(props.size),
  ].join(' ');

  return (
    <button
      type="button"
      className={classNames}
      disabled={props.onClick ? null : 'disabed'}
      onClick={props.onClick}>
      {props.children}
    </button>
  );
}

type LinkProps = {
  children?: string | React$Element<any> | Array<React$Element<any>>,
  color?: Color,
  size?: Size,
  href: ?string,
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
      role="button">
      {props.children}
    </a>
  );
}

type DropdownToggleProps = ButtonProps & {
  isOpen: boolean,
};

export function DropdownToggleButton(props: DropdownToggleProps) {
  const classNames = [
    'btn',
    colorToClass('btn', props.color, 'default'),
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
