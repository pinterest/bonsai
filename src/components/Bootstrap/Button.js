/*
 * @flow
 */

import type {Color} from './Color';

import React from 'react';
import {colorToClass} from './Color';

type ButtonProps = {
  children?: string | React$Element<any>,
  color?: Color,
  onClick: (e: MouseEvent) => void,
};

export default function Button(props: ButtonProps) {
  const classNames = [
    'btn',
    colorToClass('btn', props.color),
  ].join(' ');

  return (
    <button
      type="button"
      className={classNames}
      onClick={props.onClick}>
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
      type="button"
      className={classNames}
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded={props.isOpen}
      onClick={props.onClick}>
      {props.children}
    </button>
  );
}

type CloseProps = {
  onClick: (e: MouseEvent) => void,
};

export function CloseButton(props: CloseProps) {
  return (
    <button
      aria-label="Close"
      className="close"
      onClick={props.onClick}
      type="button">
      <span aria-hidden="true">&times;</span>
    </button>
  );
}
