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
  children?: string | React$Element<any>,
  color?: Color,
  disabled?: boolean,
  size?: Size,
  onClick: (e: MouseEvent) => void,
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
    colorToClass('btn', props.color),
    sizeToClass(props.size),
  ].join(' ');

  return (
    <button
      type="button"
      className={classNames}
      disabled={props.disabled ? 'disabed' : null}
      onClick={props.disabed ? null : props.onClick}>
      {props.children}
    </button>
  );
}

type DropdownToggleProps = ButtonProps & {
  isOpen: boolean,
};

export function DropdownToggleButton(props: DropdownToggleProps) {
  const classNames = [
    'btn',
    colorToClass('btn', props.color),
    'dropdown-toggle',
  ].join(' ');

  return (
    <button
      aria-expanded={props.isOpen}
      aria-haspopup="true"
      className={classNames}
      data-toggle="dropdown"
      disabled={props.disabled ? 'disabed' : null}
      onClick={props.onClick}
      type="button">
      {props.children}
    </button>
  );
}

type CloseProps = {
  disabled?: boolean,
  label?: string,
  onClick: (e: MouseEvent) => void,
};

export function CloseButton(props: CloseProps) {
  return (
    <button
      aria-label={props.label || 'Close'}
      className="close"
      disabled={props.disabled ? 'disabed' : null}
      onClick={props.disabed ? null : props.onClick}
      type="button">
      <span aria-hidden="true">&times;</span>
    </button>
  );
}
